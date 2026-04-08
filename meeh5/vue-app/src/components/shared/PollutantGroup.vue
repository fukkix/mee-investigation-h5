<template>
  <div class="mb-4">
    <div class="flex items-center justify-between cursor-pointer p-3 rounded-xl bg-surface-variant"
         @click="expanded = !expanded">
      <span class="text-sm font-medium text-on-surface">{{ label }}</span>
      <span class="material-symbols-outlined text-on-surface-variant transition-transform"
            :class="{ 'rotate-180': expanded }">expand_more</span>
    </div>
    <div v-show="expanded" class="mt-2 pl-2 space-y-2">
      <!-- 普通选项 -->
      <label v-for="item in items" :key="item.v || item.value"
             class="flex items-start gap-2 py-1">
        <input type="checkbox"
               class="mt-0.5 w-4 h-4 text-primary rounded"
               :checked="isChecked(item.v || item.value)"
               @change="toggleItem(item.v || item.value)">
        <span class="text-sm text-on-surface">{{ item.l || item.label }}</span>
        <!-- 带输入框的项 -->
        <input v-if="(item.hasInput || item.ph || item.placeholder) && isChecked(item.v || item.value)"
               type="text"
               class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
               :placeholder="item.ph || item.placeholder || '请填写'"
               :value="getInputValue(item.v || item.value)"
               @input="setInputValue(item.v || item.value, $event.target.value)">
      </label>
      <!-- extras -->
      <template v-if="extras && extras.length">
        <label v-for="ext in extras" :key="ext.v"
               class="flex items-start gap-2 py-1">
          <input type="checkbox"
                 class="mt-0.5 w-4 h-4 text-primary rounded"
                 :checked="isChecked(ext.v)"
                 @change="toggleItem(ext.v)">
          <span class="text-sm text-on-surface">{{ ext.l }}</span>
          <input v-if="ext.ph && isChecked(ext.v)"
                 type="text"
                 class="flex-1 h-8 px-2 text-xs border border-outline rounded-lg bg-surface"
                 :placeholder="ext.ph"
                 :value="getInputValue(ext.v)"
                 @input="setInputValue(ext.v, $event.target.value)">
        </label>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PollutantGroup',
  props: {
    label: { type: String, required: true },
    items: { type: Array, default: () => [] },
    extras: { type: Array, default: () => [] },
    value: { type: Object, default: () => ({}) } // { checked: [], inputs: {} }
  },
  data() {
    return { expanded: false }
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
