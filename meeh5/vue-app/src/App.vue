<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Top App Bar -->
    <header class="bg-primary text-on-primary px-4 py-3 flex items-center gap-3 shadow-md sticky top-0 z-50">
      <span class="material-symbols-outlined">assignment</span>
      <h1 class="text-lg font-medium">环保技术信息填报</h1>
    </header>

    <main class="flex-1 px-4 py-4 pb-24 max-w-2xl mx-auto w-full">
      <!-- 说明卡片 -->
      <div class="bg-secondary-container text-on-secondary-container rounded-xl p-4 mb-4 text-sm leading-relaxed">
        <p class="font-medium mb-1">📋 填报须知</p>
        <p>请如实填写技术相关信息，带 <span class="text-error font-medium">*</span> 的为必填项。提交后信息将用于技术评估。</p>
      </div>

      <!-- 多次提交提示 -->
      <div class="bg-tertiary-container text-on-tertiary-container rounded-xl p-4 mb-4 text-sm leading-relaxed">
        <p class="font-medium mb-1">📝 温馨提示</p>
        <p>如您有多项技术需填报，请在完成本次填报后再次进入问卷，逐项提交即可。</p>
      </div>

      <!-- 填报时间提示 -->
      <div class="bg-surface-variant text-on-surface-variant rounded-xl p-3 mb-6 text-xs text-center">
        填报时间约 5-10 分钟，进度会自动保存为草稿
      </div>

      <!-- Step 进度指示 -->
      <div class="flex items-center justify-center gap-1 mb-6">
        <template v-for="s in totalSteps">
          <div :key="'dot-' + s"
               class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
               :class="s === currentStep ? 'bg-primary text-on-primary scale-110' : s < currentStep ? 'bg-primary/20 text-primary' : 'bg-surface-variant text-on-surface-variant'">
            {{ s }}
          </div>
          <div v-if="s < totalSteps" :key="'line-' + s"
               class="w-8 h-0.5 transition-colors"
               :class="s < currentStep ? 'bg-primary' : 'bg-outline-variant'"></div>
        </template>
      </div>

      <!-- Step 1: 基础信息 -->
      <section v-show="currentStep === 1">
        <step1-basic-info
          :form-data="formData"
          @update="updateFormData" />
      </section>

      <!-- Step 2: 选择类型 -->
      <section v-show="currentStep === 2">
        <step2-type-select
          :form-data="formData"
          @update="updateFormData" />
      </section>

      <!-- Step 3: 详细信息 -->
      <section v-show="currentStep === 3">
        <step3-detail
          :form-data="formData"
          @update="updateFormData" />
      </section>

      <!-- Step 4: 确认提交 -->
      <section v-show="currentStep === 4">
        <step4-confirm
          :form-data="formData" />
      </section>
    </main>

    <!-- 底部导航栏 -->
    <nav class="fixed bottom-0 inset-x-0 bg-surface-container border-t border-outline-variant px-4 py-3 flex gap-3 z-50 max-w-2xl mx-auto">
      <button v-if="currentStep > 1"
              class="flex-1 h-10 rounded-full border border-outline text-on-surface text-sm font-medium"
              @click="handlePrev">
        上一步
      </button>
      <button v-if="currentStep < totalSteps"
              class="flex-1 h-10 rounded-full bg-primary text-on-primary text-sm font-medium"
              @click="handleNext">
        下一步
      </button>
      <button v-if="currentStep === totalSteps"
              class="flex-1 h-10 rounded-full bg-primary text-on-primary text-sm font-medium"
              @click="handleSubmit">
        提交
      </button>
    </nav>
  </div>
</template>

<script>
import Step1BasicInfo from './components/Step1BasicInfo.vue'
import Step2TypeSelect from './components/Step2TypeSelect.vue'
import Step3Detail from './components/Step3Detail.vue'
import Step4Confirm from './components/Step4Confirm.vue'

const DRAFT_KEY = 'survey_draft'

export default {
  name: 'App',
  components: { Step1BasicInfo, Step2TypeSelect, Step3Detail, Step4Confirm },
  data() {
    return {
      currentStep: 1,
      totalSteps: 4,
      formData: {
        // Step 1
        companyName: '',
        creditCode: '',
        legalPerson: '',
        companyAddress: '',
        contactPerson: '',
        contactPhone: '',
        techName: '',
        // Step 2
        formType: '',       // process | material | equipment
        fieldName: '',       // water, air, solid, eco, soil, energy
        objectName: '',
        equipmentType: '',   // treatment | monitoring
        equipmentField: '',  // field within equipment
        // Step 3 — dynamic data collected by child forms
        dynamicData: {},
        // Step 4 is read-only confirmation
      }
    }
  },
  created() {
    this.loadDraft()
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.saveDraft()
      }
    }
  },
  methods: {
    updateFormData(updates) {
      Object.keys(updates).forEach(key => {
        this.$set(this.formData, key, updates[key])
      })
    },
    validateCurrentStep() {
      if (this.currentStep === 1) {
        const required = ['companyName', 'contactPerson', 'contactPhone', 'techName']
        for (const key of required) {
          if (!this.formData[key] || !this.formData[key].trim()) {
            alert('请填写必填项')
            return false
          }
        }
      }
      if (this.currentStep === 2) {
        if (!this.formData.formType) {
          alert('请选择体现形式')
          return false
        }
        if (!this.formData.objectName || !this.formData.objectName.trim()) {
          alert('请填写对象名称')
          return false
        }
        if (this.formData.formType === 'process' || this.formData.formType === 'material') {
          if (!this.formData.fieldName) {
            alert('请选择所属领域')
            return false
          }
        }
        if (this.formData.formType === 'equipment') {
          if (!this.formData.equipmentType) {
            alert('请选择设备类型')
            return false
          }
          if (!this.formData.equipmentField) {
            alert('请选择设备领域')
            return false
          }
        }
      }
      return true
    },
    handleNext() {
      if (!this.validateCurrentStep()) return
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    handlePrev() {
      if (this.currentStep > 1) {
        this.currentStep--
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    handleSubmit() {
      alert('提交成功！（Mock）')
      console.log('提交数据:', JSON.parse(JSON.stringify(this.formData)))
      localStorage.removeItem(DRAFT_KEY)
    },
    saveDraft() {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(this.formData))
      } catch (e) { /* ignore */ }
    },
    loadDraft() {
      try {
        const saved = localStorage.getItem(DRAFT_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          Object.keys(parsed).forEach(key => {
            if (key in this.formData) {
              this.$set(this.formData, key, parsed[key])
            }
          })
        }
      } catch (e) { /* ignore */ }
    }
  }
}
</script>
