<template>
  <div>
    <!-- water: grouped by conventional / heavyMetal / special + extras -->
    <template v-if="field === 'water'">
      <pollutant-group label="常规污染物" :items="pollutants.conventional || []"
                       :value="groupVal('conventional')" @input="setGroup('conventional', $event)" />
      <pollutant-group label="重金属污染物" :items="pollutants.heavyMetal || []"
                       :value="groupVal('heavyMetal')" @input="setGroup('heavyMetal', $event)" />
      <pollutant-group label="特殊污染物" :items="pollutants.special || []"
                       :value="groupVal('special')" @input="setGroup('special', $event)" />
      <standalone-input v-if="pollutants.specialOther" label="其他特殊污染物"
                        :value="val.specialOther || ''" @input="setKey('specialOther', $event)" />
      <standalone-input v-if="pollutants.newPollutant" label="新污染物（若有请填写）"
                        :value="val.newPollutant || ''" @input="setKey('newPollutant', $event)" />
      <standalone-input v-if="pollutants.unconventional" label="非常规污染物（若有请填写）"
                        :value="val.unconventional || ''" @input="setKey('unconventional', $event)" />
      <standalone-input v-if="pollutants.other" label="其他"
                        :value="val.other || ''" @input="setKey('other', $event)" />
    </template>

    <!-- air -->
    <template v-else-if="field === 'air'">
      <pollutant-group label="常规污染物" :items="pollutants.conventional || []"
                       :value="groupVal('conventional')" @input="setGroup('conventional', $event)" />
      <pollutant-group label="非常规污染物" :items="pollutants.unconventional || []"
                       :value="groupVal('unconventional')" @input="setGroup('unconventional', $event)" />
      <standalone-input v-if="pollutants.other" label="其他"
                        :value="val.other || ''" @input="setKey('other', $event)" />
    </template>

    <!-- solid -->
    <template v-else-if="field === 'solid'">
      <div class="space-y-2">
        <label v-for="item in (pollutants.types || [])" :key="item.value"
               class="flex items-center gap-2 py-1">
          <input type="checkbox" class="w-4 h-4 text-primary rounded"
                 :checked="(val.types || []).includes(item.value)"
                 @change="toggleTypes(item.value)">
          <span class="text-sm text-on-surface">{{ item.label }}</span>
        </label>
        <standalone-input v-if="pollutants.other" label="其他"
                          :value="val.other || ''" @input="setKey('other', $event)" />
      </div>
    </template>

    <!-- eco -->
    <template v-else-if="field === 'eco'">
      <template v-if="pollutants.pollutionControl">
        <p class="text-xs font-medium text-on-surface-variant mb-1">污染治理</p>
        <pollutant-group label="常规污染物" :items="pollutants.pollutionControl.conventional || []"
                         :value="groupVal('pc_conventional')" @input="setGroup('pc_conventional', $event)" />
        <pollutant-group label="重金属污染物" :items="pollutants.pollutionControl.heavyMetal || []"
                         :value="groupVal('pc_heavyMetal')" @input="setGroup('pc_heavyMetal', $event)" />
        <pollutant-group label="特殊污染物" :items="pollutants.pollutionControl.special || []"
                         :value="groupVal('pc_special')" @input="setGroup('pc_special', $event)" />
        <standalone-input v-if="pollutants.pollutionControl.newPollutant" label="新污染物"
                          :value="val.pc_newPollutant || ''" @input="setKey('pc_newPollutant', $event)" />
        <standalone-input v-if="pollutants.pollutionControl.other" label="其他"
                          :value="val.pc_other || ''" @input="setKey('pc_other', $event)" />
      </template>
      <template v-if="pollutants.restoration">
        <p class="text-xs font-medium text-on-surface-variant mb-1 mt-3">修复效果</p>
        <div class="space-y-2">
          <label v-for="item in pollutants.restoration" :key="item.value"
                 class="flex items-start gap-2 py-1">
            <input type="checkbox" class="mt-0.5 w-4 h-4 text-primary rounded"
                   :checked="(val.restoration_checked || []).includes(item.value)"
                   @change="toggleList('restoration_checked', item.value)">
            <span class="text-sm text-on-surface">{{ item.label }}</span>
            <input v-if="item.hasInput && (val.restoration_checked || []).includes(item.value)"
                   type="text" class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
                   :placeholder="item.placeholder || '请填写'"
                   :value="(val.restoration_inputs || {})[item.value] || ''"
                   @input="setNestedInput('restoration_inputs', item.value, $event.target.value)">
          </label>
        </div>
      </template>
      <template v-if="pollutants.resourceProtection">
        <p class="text-xs font-medium text-on-surface-variant mb-1 mt-3">资源保护</p>
        <div class="space-y-2">
          <label v-for="item in pollutants.resourceProtection" :key="item.value"
                 class="flex items-center gap-2 py-1">
            <input type="checkbox" class="w-4 h-4 text-primary rounded"
                   :checked="(val.resourceProtection || []).includes(item.value)"
                   @change="toggleList('resourceProtection', item.value)">
            <span class="text-sm text-on-surface">{{ item.label }}</span>
          </label>
        </div>
      </template>
      <template v-if="pollutants.disasterPrevention">
        <p class="text-xs font-medium text-on-surface-variant mb-1 mt-3">防灾减灾</p>
        <div class="space-y-2">
          <label v-for="item in pollutants.disasterPrevention" :key="item.value"
                 class="flex items-center gap-2 py-1">
            <input type="checkbox" class="w-4 h-4 text-primary rounded"
                   :checked="(val.disasterPrevention || []).includes(item.value)"
                   @change="toggleList('disasterPrevention', item.value)">
            <span class="text-sm text-on-surface">{{ item.label }}</span>
          </label>
        </div>
      </template>
      <template v-if="pollutants.landscape">
        <p class="text-xs font-medium text-on-surface-variant mb-1 mt-3">景观与人居</p>
        <div class="space-y-2">
          <label v-for="item in pollutants.landscape" :key="item.value"
                 class="flex items-center gap-2 py-1">
            <input type="checkbox" class="w-4 h-4 text-primary rounded"
                   :checked="(val.landscape || []).includes(item.value)"
                   @change="toggleList('landscape', item.value)">
            <span class="text-sm text-on-surface">{{ item.label }}</span>
          </label>
        </div>
      </template>
      <standalone-input v-if="pollutants.unconventional" label="非常规（若有请填写）"
                        :value="val.unconventional || ''" @input="setKey('unconventional', $event)" />
      <standalone-input v-if="pollutants.other" label="其他"
                        :value="val.other || ''" @input="setKey('other', $event)" />
    </template>

    <!-- soil -->
    <template v-else-if="field === 'soil'">
      <pollutant-group label="无机类污染物" :items="pollutants.inorganic || []"
                       :value="groupVal('inorganic')" @input="setGroup('inorganic', $event)" />
      <standalone-input v-if="pollutants.inorganicOther" label="其他无机类"
                        :value="val.inorganicOther || ''" @input="setKey('inorganicOther', $event)" />
      <pollutant-group label="重金属污染物" :items="pollutants.heavyMetal || []"
                       :value="groupVal('heavyMetal')" @input="setGroup('heavyMetal', $event)" />
      <standalone-input v-if="pollutants.heavyMetalOther" label="其他重金属"
                        :value="val.heavyMetalOther || ''" @input="setKey('heavyMetalOther', $event)" />
      <pollutant-group label="挥发性有机污染物" :items="pollutants.volatile || []"
                       :value="groupVal('volatile')" @input="setGroup('volatile', $event)" />
      <standalone-input v-if="pollutants.volatileOther" label="其他挥发性"
                        :value="val.volatileOther || ''" @input="setKey('volatileOther', $event)" />
      <pollutant-group label="半挥发性有机污染物" :items="pollutants.semiVolatile || []"
                       :value="groupVal('semiVolatile')" @input="setGroup('semiVolatile', $event)" />
      <standalone-input v-if="pollutants.semiVolatileOther" label="其他半挥发性"
                        :value="val.semiVolatileOther || ''" @input="setKey('semiVolatileOther', $event)" />
      <standalone-input v-if="pollutants.newPollutant" label="新污染物"
                        :value="val.newPollutant || ''" @input="setKey('newPollutant', $event)" />
      <standalone-input v-if="pollutants.other" label="其他"
                        :value="val.other || ''" @input="setKey('other', $event)" />
    </template>

    <!-- energy -->
    <template v-else-if="field === 'energy'">
      <div class="space-y-2">
        <label v-for="item in (pollutants.types || [])" :key="item.value"
               class="flex items-start gap-2 py-1">
          <input type="checkbox" class="mt-0.5 w-4 h-4 text-primary rounded"
                 :checked="(val.types || []).includes(item.value)"
                 @change="toggleList('types', item.value)">
          <span class="text-sm text-on-surface">{{ item.label }}</span>
          <input v-if="item.hasInput && (val.types || []).includes(item.value)"
                 type="text" class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
                 :placeholder="item.placeholder || '请填写'"
                 :value="(val.typeInputs || {})[item.value] || ''"
                 @input="setNestedInput('typeInputs', item.value, $event.target.value)">
        </label>
        <standalone-input v-if="pollutants.other" label="其他"
                          :value="val.other || ''" @input="setKey('other', $event)" />
      </div>
    </template>
  </div>
</template>

<script>
import PollutantGroup from './PollutantGroup.vue'

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
  name: 'PollutantsSection',
  components: { PollutantGroup, StandaloneInput },
  props: {
    field: { type: String, required: true },
    pollutants: { type: Object, default: () => ({}) },
    value: { type: Object, default: () => ({}) }
  },
  computed: {
    val() { return this.value || {} }
  },
  methods: {
    groupVal(key) {
      return this.val[key] || { checked: [], inputs: {} }
    },
    setGroup(key, v) {
      this.$emit('input', { ...this.val, [key]: v })
    },
    setKey(key, v) {
      this.$emit('input', { ...this.val, [key]: v })
    },
    toggleTypes(v) {
      const arr = [...(this.val.types || [])]
      const idx = arr.indexOf(v)
      if (idx >= 0) arr.splice(idx, 1)
      else arr.push(v)
      this.$emit('input', { ...this.val, types: arr })
    },
    toggleList(key, v) {
      const arr = [...(this.val[key] || [])]
      const idx = arr.indexOf(v)
      if (idx >= 0) arr.splice(idx, 1)
      else arr.push(v)
      this.$emit('input', { ...this.val, [key]: arr })
    },
    setNestedInput(key, subKey, v) {
      const obj = { ...(this.val[key] || {}), [subKey]: v }
      this.$emit('input', { ...this.val, [key]: obj })
    }
  }
}
</script>
