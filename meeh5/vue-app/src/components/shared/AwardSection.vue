<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-on-surface mb-2">获奖情况</label>
    <div class="space-y-2">
      <label class="flex items-center gap-2 py-1">
        <input type="radio" :name="'award_' + _uid" value="yes"
               :checked="hasAward === 'yes'"
               class="w-4 h-4 text-primary"
               @change="$emit('update:hasAward', 'yes')">
        <span class="text-sm text-on-surface">有</span>
      </label>
      <label class="flex items-center gap-2 py-1">
        <input type="radio" :name="'award_' + _uid" value="no"
               :checked="hasAward === 'no'"
               class="w-4 h-4 text-primary"
               @change="$emit('update:hasAward', 'no')">
        <span class="text-sm text-on-surface">无</span>
      </label>
    </div>

    <div v-if="hasAward === 'yes'" class="mt-3 p-3 rounded-xl bg-surface-variant space-y-3">
      <div>
        <label class="block text-xs text-on-surface-variant mb-1">奖项级别</label>
        <select class="w-full h-10 px-3 rounded-xl border border-outline bg-surface text-sm"
                :value="awardData.level"
                @change="update('level', $event.target.value)">
          <option value="">请选择</option>
          <option v-for="opt in levelOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs text-on-surface-variant mb-1">奖项等级</label>
        <select class="w-full h-10 px-3 rounded-xl border border-outline bg-surface text-sm"
                :value="awardData.grade"
                @change="update('grade', $event.target.value)">
          <option value="">请选择</option>
          <option v-for="opt in gradeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs text-on-surface-variant mb-1">获奖详情</label>
        <textarea class="w-full h-20 px-3 py-2 rounded-xl border border-outline bg-surface text-sm resize-none"
                  placeholder="请填写获奖详情"
                  :value="awardData.detail"
                  @input="update('detail', $event.target.value)"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { awardLevelOptions, awardGradeOptions } from '../../config'

export default {
  name: 'AwardSection',
  props: {
    hasAward: { type: String, default: '' },
    awardData: { type: Object, default: () => ({ level: '', grade: '', detail: '' }) }
  },
  data() {
    return {
      levelOptions: awardLevelOptions,
      gradeOptions: awardGradeOptions
    }
  },
  methods: {
    update(key, val) {
      this.$emit('update:awardData', { ...this.awardData, [key]: val })
    }
  }
}
</script>
