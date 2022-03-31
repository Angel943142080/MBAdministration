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
          <el-table-column prop="order" label="订单号" />
          <el-table-column label="支付项目">
            <template #default="scope">
              <div v-show="scope.row.type === 0">房租</div>
              <div v-show="scope.row.type === 1">维修</div>
              <div v-show="scope.row.type === 2">搬家</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="付款日期" />
          <el-table-column prop="cost" label="支付金额" />
          <el-table-column prop="remarks" label="备注" />
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
          order: '0000123',
          type: 0,
          date: '2012-05-15',
          cost: 2331,
          remarks: '支付3月份房租',
        },
        {
          order: '0000123',
          type: 1,
          date: '2012-05-15',
          cost: 2331,
          remarks: '支付3月份房租',
        },
        {
          order: '0000123',
          type: 2,
          date: '2012-05-15',
          cost: 2331,
          remarks: '支付3月份房租',
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
      context.emit('updateSwitch', 5) //关闭开关
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
