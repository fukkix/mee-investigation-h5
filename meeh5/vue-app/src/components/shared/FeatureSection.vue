<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-on-surface mb-2">{{ title }}</label>

    <!-- withInput 类型 -->
    <div v-if="withInput && withInput.length" class="space-y-2 mb-2">
      <label v-for="item in withInput" :key="item.value"
             class="flex items-start gap-2 py-1">
        <input type="checkbox"
               class="mt-0.5 w-4 h-4 text-primary rounded"
               :checked="isChecked(item.value)"
               @change="toggleItem(item.value)">
        <span class="text-sm text-on-surface">{{ item.label }}</span>
        <input v-if="isChecked(item.value)"
               type="text"
               class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
               :placeholder="item.placeholder || '请填写'"
               :value="getInputValue(item.value)"
               @input="setInputValue(item.value, $event.target.value)">
      </label>
    </div>

    <!-- simple 类型 -->
    <div v-if="simple && simple.length" class="space-y-2 mb-2">
      <label v-for="item in simple" :key="item.value"
             class="flex items-center gap-2 py-1">
        <input type="checkbox"
               class="w-4 h-4 text-primary rounded"
               :checked="isChecked(item.value)"
               @change="toggleItem(item.value)">
        <span class="text-sm text-on-surface">{{ item.label }}</span>
      </label>
    </div>

    <!-- other -->
    <div v-if="hasOther" class="mt-2">
      <label class="flex items-start gap-2 py-1">
        <input type="checkbox"
               class="mt-0.5 w-4 h-4 text-primary rounded"
               :checked="isChecked('other')"
               @change="toggleItem('other')">
        <span class="text-sm text-on-surface">其他</span>
        <input v-if="isChecked('other')"
               type="text"
               class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
               placeholder="请填写"
               :value="getInputValue('other')"
               @input="setInputValue('other', $event.target.value)">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureSection',
  props: {
    title: { type: String, default: '工艺特点' },
    withInput: { type: Array, default: () => [] },
    simple: { type: Array, default: () => [] },
    hasOther: { type: Boolean, default: false },
    value: { type: Object, default: () => ({}) } // { checked: [], inputs: {} }
  },
  methods: {
    isChecked(v) {
      return (this.value.checked || []).includes(v)
    },
    toggleItem(v) {
      const checked = [...(this.value.checked || [])]
      const idx = checked.indexOf(v)
      if (idx >= 0) checked.splice(idx, 1)
      else checked.push(v)
      this.$emit('input', { ...this.value, checked })
    },
    getInputValue(v) {
      return (this.value.inputs || {})[v] || ''
    },
    setInputValue(v, val) {
      const inputs = { ...(this.value.inputs || {}), [v]: val }
      this.$emit('input', { ...this.value, inputs })
    }
  }
}
</script>
