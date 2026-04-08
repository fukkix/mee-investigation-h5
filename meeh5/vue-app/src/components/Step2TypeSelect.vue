<template>
  <div>
    <h2 class="text-lg font-medium text-on-surface mb-4">
      <span class="material-symbols-outlined align-middle mr-1 text-primary">category</span>
      选择类型
    </h2>

    <!-- 体现形式 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">
        体现形式 <span class="text-error">*</span>
      </label>
      <div class="space-y-2">
        <label v-for="opt in formTypeOptions" :key="opt.value"
               class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors"
               :class="formData.formType === opt.value ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface'">
          <input type="radio" name="formType"
                 :value="opt.value"
                 :checked="formData.formType === opt.value"
                 class="w-5 h-5 text-primary"
                 @change="onFormTypeChange(opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- 所属领域（工艺类/材料类） -->
    <div v-if="formData.formType === 'process' || formData.formType === 'material'" class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">
        所属领域 <span class="text-error">*</span>
      </label>
      <div class="grid grid-cols-2 gap-2">
        <label v-for="opt in fieldOptions" :key="opt.value"
               class="flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors text-sm"
               :class="formData.fieldName === opt.value ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface'">
          <input type="radio" name="fieldName"
                 :value="opt.value"
                 :checked="formData.fieldName === opt.value"
                 class="w-4 h-4 text-primary"
                 @change="$emit('update', { fieldName: opt.value })">
          <span>{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- 设备类型（设备类） -->
    <div v-if="formData.formType === 'equipment'" class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">
        设备类型 <span class="text-error">*</span>
      </label>
      <div class="space-y-2">
        <label v-for="opt in equipmentTypeOptions" :key="opt.value"
               class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors"
               :class="formData.equipmentType === opt.value ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface'">
          <input type="radio" name="equipmentType"
                 :value="opt.value"
                 :checked="formData.equipmentType === opt.value"
                 class="w-5 h-5 text-primary"
                 @change="onEquipmentTypeChange(opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- 设备领域（设备类选定类型后） -->
    <div v-if="formData.formType === 'equipment' && formData.equipmentType" class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">
        设备领域 <span class="text-error">*</span>
      </label>
      <div class="grid grid-cols-2 gap-2">
        <label v-for="f in currentEquipmentFields" :key="f"
               class="flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors text-sm"
               :class="formData.equipmentField === f ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface'">
          <input type="radio" name="equipmentField"
                 :value="f"
                 :checked="formData.equipmentField === f"
                 class="w-4 h-4 text-primary"
                 @change="$emit('update', { equipmentField: f })">
          <span>{{ equipmentFieldLabel(f) }}</span>
        </label>
      </div>
    </div>

    <!-- 对象名称 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-1">
        对象名称 <span class="text-error">*</span>
      </label>
      <input type="text"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             :placeholder="objectNamePlaceholder"
             :value="formData.objectName"
             @input="$emit('update', { objectName: $event.target.value })">
    </div>
  </div>
</template>

<script>
import { equipmentConfig, fieldOptions } from '../config'

export default {
  name: 'Step2TypeSelect',
  props: {
    formData: { type: Object, required: true }
  },
  data() {
    return {
      formTypeOptions: [
        { value: 'process', label: '工艺类' },
        { value: 'material', label: '材料类' },
        { value: 'equipment', label: '设备类' }
      ],
      equipmentTypeOptions: [
        { value: 'treatment', label: '治理设备' },
        { value: 'monitoring', label: '检（监）测设备' }
      ],
      fieldOptions
    }
  },
  computed: {
    currentEquipmentFields() {
      if (!this.formData.equipmentType) return []
      return equipmentConfig[this.formData.equipmentType]?.fields || []
    },
    objectNamePlaceholder() {
      const map = { process: '请输入工艺名称', material: '请输入材料名称', equipment: '请输入设备名称' }
      return map[this.formData.formType] || '请输入对象名称'
    }
  },
  methods: {
    onFormTypeChange(val) {
      this.$emit('update', {
        formType: val,
        fieldName: '',
        equipmentType: '',
        equipmentField: '',
        dynamicData: {}
      })
    },
    onEquipmentTypeChange(val) {
      this.$emit('update', {
        equipmentType: val,
        equipmentField: '',
        dynamicData: {}
      })
    },
    equipmentFieldLabel(f) {
      const map = {
        water: '水处理', air: '大气污染治理', solid: '固废处理与综合利用',
        water_eco: '水生态修复', soil: '土壤修复', energy: '节能与碳减排', other: '其他'
      }
      return map[f] || f
    }
  }
}
</script>
