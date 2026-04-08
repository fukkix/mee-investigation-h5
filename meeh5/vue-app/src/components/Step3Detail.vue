<template>
  <div>
    <h2 class="text-lg font-medium text-on-surface mb-4">
      <span class="material-symbols-outlined align-middle mr-1 text-primary">edit_note</span>
      详细信息
    </h2>

    <process-form
      v-if="formData.formType === 'process' && formData.fieldName"
      :field="formData.fieldName"
      :value="formData.dynamicData"
      @input="onDynamicUpdate" />

    <material-form
      v-if="formData.formType === 'material' && formData.fieldName"
      :field="formData.fieldName"
      :value="formData.dynamicData"
      @input="onDynamicUpdate" />

    <equipment-form
      v-if="formData.formType === 'equipment' && formData.equipmentField"
      :equipment-type="formData.equipmentType"
      :field="formData.equipmentField"
      :value="formData.dynamicData"
      @input="onDynamicUpdate" />

    <div v-if="!hasSelection" class="text-center text-on-surface-variant py-12 text-sm">
      请先在上一步选择类型和领域
    </div>
  </div>
</template>

<script>
import ProcessForm from './ProcessForm.vue'
import MaterialForm from './MaterialForm.vue'
import EquipmentForm from './EquipmentForm.vue'

export default {
  name: 'Step3Detail',
  components: { ProcessForm, MaterialForm, EquipmentForm },
  props: {
    formData: { type: Object, required: true }
  },
  computed: {
    hasSelection() {
      if (this.formData.formType === 'process' || this.formData.formType === 'material') {
        return !!this.formData.fieldName
      }
      if (this.formData.formType === 'equipment') {
        return !!this.formData.equipmentField
      }
      return false
    }
  },
  methods: {
    onDynamicUpdate(data) {
      this.$emit('update', { dynamicData: data })
    }
  }
}
</script>
