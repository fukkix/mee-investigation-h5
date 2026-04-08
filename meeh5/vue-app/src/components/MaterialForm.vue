<template>
  <div>
    <!-- 功能分类 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">功能分类</label>
      <div class="space-y-2">
        <label v-for="cat in config.categories" :key="cat.value"
               class="flex items-center gap-2 py-1">
          <input type="checkbox" class="w-4 h-4 text-primary rounded"
                 :checked="(data.categories || []).includes(cat.value)"
                 @change="toggleArray('categories', cat.value)">
          <span class="text-sm text-on-surface">{{ cat.label }}</span>
        </label>
        <label v-if="config.other" class="flex items-start gap-2 py-1">
          <input type="checkbox" class="mt-0.5 w-4 h-4 text-primary rounded"
                 :checked="(data.categories || []).includes('other')"
                 @change="toggleArray('categories', 'other')">
          <span class="text-sm text-on-surface">其他</span>
          <input v-if="(data.categories || []).includes('other')"
                 type="text" class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
                 placeholder="请填写" :value="data.categoryOther || ''"
                 @input="set('categoryOther', $event.target.value)">
        </label>
      </div>
    </div>

    <!-- 应用行业 -->
    <industry-rows :value="data.industries || [{ name: '', percent: '' }]"
                   @input="set('industries', $event)" />

    <!-- 成熟度与案例 -->
    <maturity-case
      :value="data.maturity || ''"
      :case-text="data.caseText || ''"
      @input="set('maturity', $event)"
      @update:caseText="set('caseText', $event)" />

    <!-- 获奖情况 -->
    <award-section
      :has-award="data.hasAward || ''"
      :award-data="data.awardData || {}"
      @update:hasAward="set('hasAward', $event)"
      @update:awardData="set('awardData', $event)" />
  </div>
</template>

<script>
import { materialConfig } from '../config'
import IndustryRows from './shared/IndustryRows.vue'
import MaturityCase from './shared/MaturityCase.vue'
import AwardSection from './shared/AwardSection.vue'

export default {
  name: 'MaterialForm',
  components: { IndustryRows, MaturityCase, AwardSection },
  props: {
    field: { type: String, required: true },
    value: { type: Object, default: () => ({}) }
  },
  computed: {
    config() {
      return materialConfig[this.field] || {}
    },
    data() {
      return this.value || {}
    }
  },
  methods: {
    set(key, val) {
      this.$emit('input', { ...this.data, [key]: val })
    },
    toggleArray(key, val) {
      const arr = [...(this.data[key] || [])]
      const idx = arr.indexOf(val)
      if (idx >= 0) arr.splice(idx, 1)
      else arr.push(val)
      this.set(key, arr)
    }
  }
}
</script>
