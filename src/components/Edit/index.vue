<template>
  <!-- 富文本组件 -->
  <div ref="editor"></div>
  <div :innerHTML="content.html"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import WangEditor from 'wangeditor'

export default {
  name: 'app',
  props: ['mycontent'],
  setup(props, { attrs, emit }) {
    const editor = ref()
    const content = reactive({
      html: '',
      text: '',
    })

    let instance
    onMounted(() => {
      instance = new WangEditor(editor.value)
      Object.assign(instance.config, {
        onchange() {
          emit('setContent', instance.txt.html()) //监听改变数据
        },
      })
      instance.create()
    })

    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })

    const syncHTML = () => {
      content.html = instance.txt.html()
    }

    return {
      syncHTML,
      editor,
      content,
    }
  },
}
</script>
<style lang="scss" scoped>
::v-deep .w-e-text-container {
  // border-bottom: none !important;
}
</style>
