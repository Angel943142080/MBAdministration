<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'index', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="index" sortable width="180" label="序号">
        <template #default="scoped">
          {{ scoped.row.index }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Date" sortable width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" :formatter="formatter" />
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      formatter: (row, column) => {
        return row.address
      },
      tableData: [
        {
          index: 1,
          date: '2016-05-03',
          name: 'Tom1',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          index: 2,
          date: '2016-05-02',
          name: 'Tom2',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          index: 3,
          date: '2016-05-04',
          name: 'Tom3',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          index: 4,
          date: '2016-05-01',
          name: 'Tom4',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
