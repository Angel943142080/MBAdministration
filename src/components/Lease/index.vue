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
          <el-table-column prop="date" label="签约日期" />
          <el-table-column label="合约期限">
            <template #default="scope">
              <div>{{ scope.row.startDate }} 至 {{ scope.row.endDate }}</div>
            </template>
          </el-table-column>
          <el-table-column label="电子合约" fixed="right">
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.img"
                fit="fit"
              />
            </template>
          </el-table-column>
          <el-table-column label="结算" fixed="right">
            <template #default="scope">
              <div v-show="scope.row.type === 0">已结清</div>
              <div v-show="scope.row.type === 1">未结清</div>
              <div></div>
            </template>
          </el-table-column>
          <el-table-column prop="rent" label="房租" width="100" fixed="right" />
          <el-table-column prop="duputy" label="签约代表" fixed="right" />
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
          date: '2012-05-15 13:23:52',
          startDate: '2012-05-15',
          endDate: '2012-05-15',
          img:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          type: 0,
          rent: 1280,
          duputy: '小不点',
        },
        {
          date: '2012-05-15 13:23:52',
          startDate: '2012-05-15',
          endDate: '2012-05-15',
          img:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          type: 0,
          rent: 1280,
          duputy: '小不点',
        },
        {
          date: '2012-05-15 13:23:52',
          startDate: '2012-05-15',
          endDate: '2012-05-15',
          img:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          type: 0,
          rent: 1280,
          duputy: '小不点',
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
      context.emit('updateSwitch', 1) //关闭开关
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
