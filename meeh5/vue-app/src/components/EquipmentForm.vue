<template>
  <div>
    <!-- 治理设备 -->
    <template v-if="equipmentType === 'treatment' && treatmentConfig">
      <!-- 污染物/处理对象 -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-on-surface mb-2">污染物/处理对象</label>
        <pollutant-group v-for="g in treatmentConfig.pollutantGroups" :key="g.id"
                         :label="g.label" :items="g.items" :extras="g.extras || []"
                         :value="groupVal(g.id)" @input="setGroup(g.id, $event)" />
        <standalone-input v-if="treatmentConfig.nonConventional" label="非常规污染物（若有请填写）"
                          :value="data.nonConventional || ''" @input="set('nonConventional', $event)" />
        <standalone-input v-if="treatmentConfig.nonConventionalOther" label="其他非常规"
                          :value="data.nonConventionalOther || ''" @input="set('nonConventionalOther', $event)" />
      </div>

      <!-- 设备特点 -->
      <div v-if="treatmentConfig.features && treatmentConfig.features.length" class="mb-4">
        <label class="block text-sm font-medium text-on-surface mb-2">设备特点</label>
        <div class="space-y-2">
          <label v-for="feat in treatmentConfig.features" :key="feat.v"
                 class="flex items-start gap-2 py-1">
            <input type="checkbox" class="mt-0.5 w-4 h-4 text-primary rounded"
                   :checked="(data.featuresChecked || []).includes(feat.v)"
                   @change="toggleArray('featuresChecked', feat.v)">
            <span class="text-sm text-on-surface">{{ feat.l }}</span>
            <input v-if="feat.t === 'i' && (data.featuresChecked || []).includes(feat.v)"
                   type="text" class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
                   :placeholder="feat.ph || '请填写'"
                   :value="(data.featuresInputs || {})[feat.v] || ''"
                   @input="setNested('featuresInputs', feat.v, $event.target.value)">
          </label>
        </div>
      </div>

      <!-- 通用字段：行业、来源、成熟度、案例、获奖 -->
      <equipment-common-fields :data="data" @set="set" @toggle-array="toggleArray" />
    </template>

    <!-- 检测设备 -->
    <template v-if="equipmentType === 'monitoring' && monitoringConfig">
      <template v-if="monitoringConfig.type === 'grouped'">
        <div class="mb-4">
          <label class="block text-sm font-medium text-on-surface mb-2">监测指标</label>
          <pollutant-group v-for="g in monitoringConfig.groups" :key="g.id"
                           :label="g.label" :items="g.items" :extras="g.extras || []"
                           :value="groupVal(g.id)" @input="setGroup(g.id, $event)" />
        </div>
      </template>
      <template v-else-if="monitoringConfig.type === 'textarea'">
        <div class="mb-4">
          <label class="block text-sm font-medium text-on-surface mb-2">监测内容</label>
          <textarea class="w-full h-32 px-3 py-2 rounded-xl border border-outline bg-surface text-sm resize-none"
                    placeholder="请详细描述"
                    :value="data.monitoringText || ''"
                    @input="set('monitoringText', $event.target.value)"></textarea>
        </div>
      </template>

      <!-- 通用字段 -->
      <equipment-common-fields :data="data" @set="set" @toggle-array="toggleArray" />
    </template>
  </div>
</template>

<script>
import { equipmentTreatmentConfig } from '../config/equipmentTreatment'
import { equipmentMonitoringConfig } from '../config/equipmentMonitoring'
import PollutantGroup from './shared/PollutantGroup.vue'
import EquipmentCommonFields from './shared/EquipmentCommonFields.vue'

const StandaloneInput = {
  name: 'StandaloneInput',
  props: { label: String, value: String },
  template: `
    <div class="flex items-start gap-2 py-1 mb-2">
      <span class="text-sm text-on-surface-variant whitespace-nowrap">{{ label }}</span>
      <input type="text" class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
             placeholder="请填写" :value="value" @input="$emit('input', $event.target.value)">
    </div>
  `
}

export default {
  name: 'EquipmentForm',
  components: { PollutantGroup, StandaloneInput, EquipmentCommonFields },
  props: {
    equipmentType: { type: String, required: true },
    field: { type: String, required: true },
    value: { type: Object, default: () => ({}) }
  },
  computed: {
    data() { return this.value || {} },
    treatmentConfig() {
      return this.equipmentType === 'treatment' ? equipmentTreatmentConfig[this.field] : null
    },
    monitoringConfig() {
      return this.equipmentType === 'monitoring' ? equipmentMonitoringConfig[this.field] : null
    }
  },
  methods: {
    set(key, val) {
      this.$emit('input', { ...this.data, [key]: val })
    },
    groupVal(id) {
      return (this.data.groups || {})[id] || { checked: [], inputs: {} }
    },
    setGroup(id, v) {
      const groups = { ...(this.data.groups || {}), [id]: v }
      this.set('groups', groups)
    },
    toggleArray(key, val) {
      const arr = [...(this.data[key] || [])]
      const idx = arr.indexOf(val)
      if (idx >= 0) arr.splice(idx, 1)
      else arr.push(val)
      this.set(key, arr)
    },
    setNested(key, subKey, val) {
      const obj = { ...(this.data[key] || {}), [subKey]: val }
      this.set(key, obj)
    }
  }
}
</script>
