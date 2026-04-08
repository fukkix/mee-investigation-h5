<template>
  <div>
    <!-- 应用行业 -->
    <industry-rows :value="data.industries || [{ name: '', percent: '' }]"
                   @input="$emit('set', 'industries', $event)" />

    <!-- 技术来源 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">技术来源</label>
      <div class="space-y-2">
        <label v-for="opt in sourceOptions" :key="opt.value"
               class="flex items-center gap-2 py-1">
          <input type="radio" :name="'eq_source_' + _uid"
                 :value="opt.value"
                 :checked="data.source === opt.value"
                 class="w-4 h-4 text-primary"
                 @change="$emit('set', 'source', opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- 成熟度与案例 -->
    <maturity-case
      :value="data.maturity || ''"
      :case-text="data.caseText || ''"
      @input="$emit('set', 'maturity', $event)"
      @update:caseText="$emit('set', 'caseText', $event)" />

    <!-- 获奖情况 -->
    <award-section
      :has-award="data.hasAward || ''"
      :award-data="data.awardData || {}"
      @update:hasAward="$emit('set', 'hasAward', $event)"
      @update:awardData="$emit('set', 'awardData', $event)" />
  </div>
</template>

<script>
import { sourceOptions } from '../../config'
import IndustryRows from './IndustryRows.vue'
import MaturityCase from './MaturityCase.vue'
import AwardSection from './AwardSection.vue'

export default {
  name: 'EquipmentCommonFields',
  components: { IndustryRows, MaturityCase, AwardSection },
  props: {
    data: { type: Object, default: () => ({}) }
  },
  data() {
    return { sourceOptions }
  }
}
</script>
