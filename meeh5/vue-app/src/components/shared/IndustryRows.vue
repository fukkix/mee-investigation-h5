<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-on-surface mb-2">
      应用行业 <span class="text-error">*</span>
    </label>
    <div v-for="(row, idx) in rows" :key="idx" class="flex gap-2 mb-2">
      <input type="text"
             class="flex-1 h-10 px-3 rounded-xl border border-outline bg-surface text-on-surface text-sm"
             placeholder="行业名称"
             :value="row.name"
             @input="updateRow(idx, 'name', $event.target.value)">
      <input type="text"
             class="w-24 h-10 px-3 rounded-xl border border-outline bg-surface text-on-surface text-sm"
             placeholder="占比%"
             :value="row.percent"
             @input="updateRow(idx, 'percent', $event.target.value)">
      <button v-if="idx > 0"
              class="w-10 h-10 rounded-xl border border-error text-error flex items-center justify-center"
              @click="removeRow(idx)">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
    <button class="text-primary text-sm flex items-center gap-1 mt-1"
            @click="addRow">
      <span class="material-symbols-outlined text-sm">add</span> 添加行业
    </button>
  </div>
</template>

<script>
export default {
  name: 'IndustryRows',
  props: {
    value: { type: Array, default: () => [{ name: '', percent: '' }] }
  },
  computed: {
    rows() {
      return this.value.length ? this.value : [{ name: '', percent: '' }]
    }
  },
  methods: {
    updateRow(idx, key, val) {
      const newRows = this.rows.map((r, i) => i === idx ? { ...r, [key]: val } : { ...r })
      this.$emit('input', newRows)
    },
    addRow() {
      this.$emit('input', [...this.rows, { name: '', percent: '' }])
    },
    removeRow(idx) {
      const newRows = this.rows.filter((_, i) => i !== idx)
      this.$emit('input', newRows)
    }
  }
}
</script>
