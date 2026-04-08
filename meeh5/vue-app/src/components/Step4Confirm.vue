<template>
  <div>
    <h2 class="text-lg font-medium text-on-surface mb-4">
      <span class="material-symbols-outlined align-middle mr-1 text-primary">checklist</span>
      确认提交
    </h2>

    <div class="bg-surface-container rounded-xl p-4 space-y-3 text-sm">
      <div class="flex justify-between border-b border-outline-variant pb-2">
        <span class="text-on-surface-variant">企业名称</span>
        <span class="text-on-surface font-medium">{{ formData.companyName || '—' }}</span>
      </div>
      <div class="flex justify-between border-b border-outline-variant pb-2">
        <span class="text-on-surface-variant">联系人</span>
        <span class="text-on-surface font-medium">{{ formData.contactPerson || '—' }}</span>
      </div>
      <div class="flex justify-between border-b border-outline-variant pb-2">
        <span class="text-on-surface-variant">联系电话</span>
        <span class="text-on-surface font-medium">{{ formData.contactPhone || '—' }}</span>
      </div>
      <div class="flex justify-between border-b border-outline-variant pb-2">
        <span class="text-on-surface-variant">技术名称</span>
        <span class="text-on-surface font-medium">{{ formData.techName || '—' }}</span>
      </div>
      <div class="flex justify-between border-b border-outline-variant pb-2">
        <span class="text-on-surface-variant">体现形式</span>
        <span class="text-on-surface font-medium">{{ formTypeLabel }}</span>
      </div>
      <div class="flex justify-between border-b border-outline-variant pb-2">
        <span class="text-on-surface-variant">对象名称</span>
        <span class="text-on-surface font-medium">{{ formData.objectName || '—' }}</span>
      </div>
    </div>

    <div class="mt-4 bg-tertiary-container text-on-tertiary-container rounded-xl p-3 text-xs text-center">
      请确认以上信息无误后点击提交
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step4Confirm',
  props: {
    formData: { type: Object, required: true }
  },
  computed: {
    formTypeLabel() {
      const map = { process: '工艺类', material: '材料类', equipment: '设备类' }
      return map[this.formData.formType] || '—'
    }
  }
}
</script>
