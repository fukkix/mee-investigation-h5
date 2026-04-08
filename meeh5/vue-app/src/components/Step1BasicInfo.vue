<template>
  <div>
    <h2 class="text-lg font-medium text-on-surface mb-4">
      <span class="material-symbols-outlined align-middle mr-1 text-primary">apartment</span>
      基础信息
    </h2>

    <!-- 企业名称（带搜索） -->
    <div class="mb-4 relative">
      <label class="block text-sm font-medium text-on-surface mb-1">
        企业名称 <span class="text-error">*</span>
      </label>
      <input type="text"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             placeholder="请输入企业名称（至少2字搜索）"
             :value="formData.companyName"
             @input="onCompanyInput($event.target.value)">
      <!-- 搜索结果下拉 -->
      <div v-if="companyResults.length > 0"
           class="absolute z-10 w-full mt-1 bg-surface border border-outline-variant rounded-xl shadow-lg max-h-48 overflow-y-auto">
        <div v-for="item in companyResults" :key="item.name"
             class="px-4 py-3 text-sm cursor-pointer hover:bg-surface-variant"
             @click="selectCompany(item)">
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- 统一社会信用代码 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-1">统一社会信用代码</label>
      <input type="text"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             placeholder="自动填充或手动输入"
             :value="formData.creditCode"
             @input="$emit('update', { creditCode: $event.target.value })">
    </div>

    <!-- 法定代表人 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-1">法定代表人</label>
      <input type="text"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             placeholder="自动填充或手动输入"
             :value="formData.legalPerson"
             @input="$emit('update', { legalPerson: $event.target.value })">
    </div>

    <!-- 企业地址 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-1">企业地址</label>
      <input type="text"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             placeholder="自动填充或手动输入"
             :value="formData.companyAddress"
             @input="$emit('update', { companyAddress: $event.target.value })">
    </div>

    <!-- 联系人 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-1">
        联系人 <span class="text-error">*</span>
      </label>
      <input type="text"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             placeholder="请输入联系人姓名"
             :value="formData.contactPerson"
             @input="$emit('update', { contactPerson: $event.target.value })">
    </div>

    <!-- 联系电话 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-1">
        联系电话 <span class="text-error">*</span>
      </label>
      <input type="tel"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             placeholder="请输入联系电话"
             :value="formData.contactPhone"
             @input="$emit('update', { contactPhone: $event.target.value })">
    </div>

    <!-- 技术名称 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-1">
        技术名称 <span class="text-error">*</span>
      </label>
      <input type="text"
             class="w-full h-12 px-4 rounded-xl border border-outline bg-surface text-on-surface text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
             placeholder="请输入技术名称"
             :value="formData.techName"
             @input="$emit('update', { techName: $event.target.value })">
    </div>
  </div>
</template>

<script>
import { fetchCompanyList, fetchCompanyDetail, debounce } from '../services/api'

export default {
  name: 'Step1BasicInfo',
  props: {
    formData: { type: Object, required: true }
  },
  data() {
    return {
      companyResults: []
    }
  },
  created() {
    this.debouncedSearch = debounce(this.searchCompany, 400)
  },
  methods: {
    onCompanyInput(val) {
      this.$emit('update', { companyName: val })
      if (val.length >= 2) {
        this.debouncedSearch(val)
      } else {
        this.companyResults = []
      }
    },
    async searchCompany(keyword) {
      this.companyResults = await fetchCompanyList(keyword)
    },
    async selectCompany(item) {
      this.$emit('update', { companyName: item.name })
      this.companyResults = []
      const detail = await fetchCompanyDetail(item.name)
      if (detail) {
        this.$emit('update', {
          creditCode: detail.creditCode || '',
          legalPerson: detail.legalPerson || '',
          companyAddress: detail.address || ''
        })
      }
    }
  }
}
</script>
