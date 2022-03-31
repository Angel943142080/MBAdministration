<template>
  <div>
    <div style="width: 800px">
      <el-table :data="tableData" border row-key="id" align="left">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column
          v-for="(item, index) in col"
          :key="`col_${index}`"
          :prop="dropCol[index].prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
      <pre style="text-align: left">
      {{ dropCol }}
    </pre
      >
      <hr />
      <pre style="text-align: left">
      {{ tableData }}
    </pre
      >
    </div>
    <button @click="fb">发布</button>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import Sortable from 'sortablejs'
export default defineComponent({
  setup() {
    onMounted(() => {
      tableState.rowDrop()
      // tableState.columnDrop()
    })
    const tableState = reactive({
      sortable: '',
      col: [
        {
          label: '日期',
          prop: 'date',
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '地址',
          prop: 'address',
        },
      ],
      dropCol: [
        {
          label: '日期',
          prop: 'date',
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '地址',
          prop: 'address',
        },
      ],
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 100 弄',
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 200 弄',
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 300 弄',
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 400 弄',
        },
      ],
      //行拖拽
      rowDrop: () => {
        const tbody = document.querySelector('.el-table__body-wrapper tbody')
        Sortable.create(tbody, {
          animation: 150,
          ghostClass: 'blue-background-class',
          onEnd({ newIndex, oldIndex }) {
            const currRow = tableState.tableData.splice(oldIndex, 1)[0]
            tableState.tableData.splice(newIndex, 0, currRow)
          },
        })
      },
      //列拖拽
      columnDrop: () => {
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
        tableState.sortable = Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          onEnd: evt => {
            const oldItem = tableState.dropCol[evt.oldIndex]
            tableState.dropCol.splice(evt.oldIndex, 1)
            tableState.dropCol.splice(evt.newIndex, 0, oldItem)
          },
        })
      },
      fb: () => {
        console.log(tableState.tableData)
      },
    })

    return {
      ...toRefs(tableState),
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.blue-background-class) {
  color: #fff !important;
  background: #42b983 !important;
}
</style>
