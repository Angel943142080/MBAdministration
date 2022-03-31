<template>
  <div>
    <el-dialog
      title="提示"
      v-model="visible"
      :width="width"
      @close="onClose"
      :top="top"
    >
      <template #title>
        <span>{{ title }}</span>
      </template>

      <!-- <slot name="newlyAdded"></slot>
      <slot name="default"></slot> -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer" v-show="confirmDisplay">
          <el-button size="mini" @click="onClose">取 消</el-button>
          <el-button size="mini" type="primary" @click="onConfirm">
            {{ successBtn }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, watch } from 'vue'

export default defineComponent({
  name: 'Dialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    confirmDisplay: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '40%',
    },
    top: {
      type: String,
      default: '15vh',
    },
    successBtn: {
      type: String,
      default: '确 定',
    },
  },
  setup(props, content) {
    const { dialogVisible, title, confirmDisplay } = toRefs(props)
    const state = reactive({
      visible: dialogVisible.value,
      title: title.value,
      confirmDisplay: confirmDisplay.value,
    })
    watch(
      [dialogVisible, title, confirmDisplay],
      ([newDialogVisible, newTitle, newConfirmDisplay]) => {
        // console.log(newDialogVisible, newTitle, newConfirmDisplay)
        state.visible = newDialogVisible
        state.title = newTitle
        state.confirmDisplay = newConfirmDisplay
      },
      { immediate: true }
    )
    const onClose = () => {
      content.emit('update:dialogVisible', false)
    }
    const onConfirm = () => {
      content.emit('on-confirm', '子组件的值')
    }
    return {
      ...toRefs(state),
      onClose,
      onConfirm,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.el-dialog) {
  border-radius: 15px;
}
</style>
