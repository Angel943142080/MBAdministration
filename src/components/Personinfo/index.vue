<template>
  <div>
    <el-dialog
      :title="title"
      v-model="visible"
      :width="width"
      @close="onClose"
      :top="top"
    >
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="2">身份证</el-col>
            <el-col :span="8">
              <div class="item">
                <el-image
                  style="width: 112px; height: 150px"
                  :src="img"
                  fit="fit"
                />
                <div style="margin-top:10px">正面</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="item">
                <el-image
                  style="width: 112px; height: 150px"
                  :src="img"
                  fit="fit"
                />
                <div style="margin-top:10px">反面</div>
              </div>
            </el-col>
          </el-row>
          <el-row align="middle" style="margin-top:50px;">
            <el-col :span="4">姓名</el-col>
            <el-col :span="6">
              <el-input v-model="name" placeholder="请输入信息" />
            </el-col>
          </el-row>
          <el-row align="middle" style="margin-top:10px;">
            <el-col :span="4">出生日期</el-col>
            <el-col :span="6">
              <el-input v-model="born" placeholder="请输入信息" />
            </el-col>
          </el-row>
          <el-row align="middle" style="margin-top:10px;">
            <el-col :span="4">证件号码</el-col>
            <el-col :span="6">
              <el-input v-model="identification" placeholder="请输入信息" />
            </el-col>
          </el-row>
          <el-row align="middle" style="margin-top:10px;">
            <el-col :span="4">日期</el-col>
            <el-col :span="6">
              <el-input v-model="date" placeholder="请输入信息" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="2">护照</el-col>
            <el-col :span="8">
              <div class="item">
                <el-image
                  style="width: 112px; height: 150px"
                  :src="img"
                  fit="fit"
                />
                <div style="margin-top:10px">反面</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onClose">
            完成
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
    id: {
      type: Number,
      default: 0,
    },
    width: {
      type: String,
      default: '60%',
    },
    top: {
      type: String,
      default: '15vh',
    },
  },
  setup(props, context) {
    const { dialogVisible, title } = toRefs(props)
    // 数据
    const state = reactive({
      visible: dialogVisible.value,
      title: title.value,
      img:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      name: '李果',
      born: '李果',
      identification: '51000000000',
      date: '2021-05-01',
    })

    watch(
      [dialogVisible, title],
      ([newDialogVisible, newTitle]) => {
        state.visible = newDialogVisible
        state.title = newTitle
      },
      { immediate: true }
    )

    const onClose = () => {
      state.visible = false
      context.emit('updateSwitch', 3) //关闭开关
    }
    return {
      ...toRefs(state),
      onClose,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.el-dialog) {
  border-radius: 15px;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
