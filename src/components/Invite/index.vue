<template>
  <div>
    <el-dialog
      :title="title"
      v-model="visible"
      :width="width"
      @close="onClose"
      :top="top"
    >
      <!-- 表格数据 -->
      <div style="margin-top: 20px">
        <el-table :data="data" stripe style="width: 100%">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="name" label="会员昵称" />
          <el-table-column prop="date" label="注册日期" />
          <el-table-column prop="integral" label="积分" />
          <el-table-column label="会员">
            <template #default="scope">
              <div v-show="scope.row.type === 0">普通</div>
              <div v-show="scope.row.type === 1">入住</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page">
        <el-pagination layout="prev, pager, next" :total="total" />
      </div>
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
      total: 50,
      data: [
        {
          name: 'Arron',
          date: '2012-05-15',
          integral: '3310',
          type: 0,
        },
        {
          name: 'Lee',
          date: '2012-05-15 13:23:52',
          integral: '2300',
          type: 1,
        },
        {
          name: '吉尔伽美什',
          date: '2012-05-15 13:23:52',
          integral: '4541',
          type: 0,
        },
      ],
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
      context.emit('updateSwitch', 4) //关闭开关
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
.page {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}
</style>
