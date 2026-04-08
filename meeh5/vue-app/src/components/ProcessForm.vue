<template>
  <div>
    <!-- 工艺颗粒度 -->
    <div v-if="config.hasGranularity" class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">工艺颗粒度</label>
      <div class="space-y-2">
        <label v-for="opt in config.granularityOptions" :key="opt.value"
               class="flex items-center gap-2 py-1">
          <input type="radio" :name="'granularity_' + _uid"
                 :value="opt.value"
                 :checked="data.granularity === opt.value"
                 class="w-4 h-4 text-primary"
                 @change="set('granularity', opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- 工艺环节（条件显示） -->
    <div v-if="showStage" class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">工艺环节</label>
      <div class="space-y-2">
        <label v-for="opt in stageOptions" :key="opt.value"
               class="flex items-center gap-2 py-1">
          <input type="checkbox"
                 class="w-4 h-4 text-primary rounded"
                 :checked="(data.stages || []).includes(opt.value)"
                 @change="toggleArray('stages', opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- 工艺分类（固废专用） -->
    <div v-if="config.processClassification" class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">工艺分类</label>
      <div class="space-y-2">
        <label v-for="opt in config.processClassification" :key="opt.value"
               class="flex items-center gap-2 py-1">
          <input type="checkbox"
                 class="w-4 h-4 text-primary rounded"
                 :checked="(data.classification || []).includes(opt.value)"
                 @change="toggleArray('classification', opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
        </label>
        <label v-if="config.processClassificationOther" class="flex items-start gap-2 py-1">
          <input type="checkbox"
                 class="mt-0.5 w-4 h-4 text-primary rounded"
                 :checked="(data.classification || []).includes('other')"
                 @change="toggleArray('classification', 'other')">
          <span class="text-sm text-on-surface">其他</span>
          <input v-if="(data.classification || []).includes('other')"
                 type="text" class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
                 placeholder="请填写" :value="data.classificationOther || ''"
                 @input="set('classificationOther', $event.target.value)">
        </label>
      </div>
    </div>

    <!-- 工艺原理 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">工艺原理</label>
      <div class="space-y-2">
        <label v-for="opt in principleOptions" :key="opt.value"
               class="flex items-start gap-2 py-1">
          <input type="checkbox"
                 class="mt-0.5 w-4 h-4 text-primary rounded"
                 :checked="(data.principles || []).includes(opt.value)"
                 @change="toggleArray('principles', opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
          <input v-if="opt.value === 'other' && (data.principles || []).includes('other')"
                 type="text" class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
                 placeholder="请填写" :value="data.principleOther || ''"
                 @input="set('principleOther', $event.target.value)">
        </label>
      </div>
    </div>

    <!-- 成熟度与案例 -->
    <maturity-case
      :value="data.maturity || ''"
      :case-text="data.caseText || ''"
      @input="set('maturity', $event)"
      @update:caseText="set('caseText', $event)" />

    <!-- 技术来源 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">技术来源</label>
      <div class="space-y-2">
        <label v-for="opt in sourceOptions" :key="opt.value"
               class="flex items-center gap-2 py-1">
          <input type="radio" :name="'source_' + _uid"
                 :value="opt.value"
                 :checked="data.source === opt.value"
                 class="w-4 h-4 text-primary"
                 @change="set('source', opt.value)">
          <span class="text-sm text-on-surface">{{ opt.label }}</span>
        </label>
      </div>
    </div>

    <!-- 应用行业 -->
    <industry-rows :value="data.industries || [{ name: '', percent: '' }]"
                   @input="set('industries', $event)" />

    <!-- 工艺特点 -->
    <feature-section
      v-if="config.features"
      title="工艺特点"
      :with-input="config.features.withInput || []"
      :simple="config.features.simple || []"
      :has-other="!!config.features.other"
      :value="data.features || {}"
      @input="set('features', $event)" />

    <!-- 污染物治理对象 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-on-surface mb-2">污染物治理对象</label>
      <pollutants-section :field="field" :pollutants="config.pollutants"
                          :value="data.pollutants || {}"
                          @input="set('pollutants', $event)" />
    </div>

    <!-- 获奖情况 -->
    <award-section
      :has-award="data.hasAward || ''"
      :award-data="data.awardData || {}"
      @update:hasAward="set('hasAward', $event)"
      @update:awardData="set('awardData', $event)" />
  </div>
</template>

<script>
import { processConfig, principleOptions, sourceOptions } from '../config'
import FeatureSection from './shared/FeatureSection.vue'
import IndustryRows from './shared/IndustryRows.vue'
import MaturityCase from './shared/MaturityCase.vue'
import AwardSection from './shared/AwardSection.vue'
import PollutantsSection from './shared/PollutantsSection.vue'

export default {
  name: 'ProcessForm',
  components: { FeatureSection, IndustryRows, MaturityCase, AwardSection, PollutantsSection },
  props: {
    field: { type: String, required: true },
    value: { type: Object, default: () => ({}) }
  },
  data() {
    return { principleOptions, sourceOptions }
  },
  computed: {
    config() {
      return processConfig[this.field] || {}
    },
    data() {
      return this.value || {}
    },
    stageOptions() {
      return this.config.stageOptions || []
    },
    showStage() {
      if (!this.config.showStageWhen || !this.config.showStageWhen.length) return false
      return this.config.showStageWhen.includes(this.data.granularity)
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
