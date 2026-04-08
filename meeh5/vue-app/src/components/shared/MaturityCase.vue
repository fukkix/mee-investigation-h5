<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-on-surface mb-2">技术成熟度</label>
    <div class="space-y-2">
      <label v-for="opt in options" :key="opt.value"
             class="flex items-center gap-2 py-1">
        <input type="radio"
               :name="'maturity_' + _uid"
               :value="opt.value"
               :checked="value === opt.value"
               class="w-4 h-4 text-primary"
               @change="$emit('input', opt.value)">
        <span class="text-sm text-on-surface">{{ opt.label }}</span>
      </label>
    </div>

    <!-- 案例简介 (当成熟度满足条件时显示) -->
    <div v-if="showCase" class="mt-3 p-3 rounded-xl bg-surface-variant">
      <label class="block text-sm font-medium text-on-surface mb-1">案例简介</label>
      <textarea class="w-full h-24 px-3 py-2 rounded-xl border border-outline bg-surface text-on-surface text-sm resize-none"
                placeholder="请填写典型应用案例简介"
                :value="caseText"
                @input="$emit('update:caseText', $event.target.value)"></textarea>
    </div>
  </div>
</template>

<script>
import { maturityOptions, CASE_REQUIRED_MATURITY } from '../../config'

export default {
  name: 'MaturityCase',
  props: {
    value: { type: String, default: '' },
    caseText: { type: String, default: '' }
  },
  data() {
    return { options: maturityOptions }
  },
  computed: {
    showCase() {
      return CASE_REQUIRED_MATURITY.includes(this.value)
    }
  }
}
</script>
