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
          <el-table-column prop="date" label="日期" />
          <el-table-column label="积分项目">
            <template #default="scope">
              <div v-show="scope.row.pointType === 0">邀请朋友加入漫柏社区</div>
              <div v-show="scope.row.pointType === 1">办理入住社区</div>
              <div v-show="scope.row.pointType === 2">参加社区活动</div>
            </template>
          </el-table-column>
          <el-table-column prop="point" label="积分">
            <template #default="scope">+{{ scope.row.point }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template #default="scope">
              <div v-show="scope.row.states === 0">
                正常
              </div>
              <div v-show="scope.row.states === 1">
                解冻
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <div v-show="scope.row.states === 0">
                <el-button type="danger">冻结</el-button>
              </div>
              <div v-show="scope.row.states === 1">
                <el-button type="info" plain>解冻</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" fixed="right" />
        </el-table>
      </div>

      <div class="page">
        <el-pagination layout="prev, pager, next" :total="total" />
      </div>
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
      total: 50,
      data: [
        {
          date: '2012-05-15 13:23:52',
          pointType: 0,
          point: '2888',
          states: 0,
          remarks: '用户违规刷单',
        },
        {
          date: '2012-05-15 13:23:52',
          pointType: 1,
          point: '2888',
          states: 1,
          remarks: '用户违规刷单',
        },
        {
          date: '2012-05-15 13:23:52',
          pointType: 2,
          point: '2888',
          states: 0,
          remarks: '用户违规刷单',
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
      context.emit('updateSwitch', 7) //关闭开关
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
