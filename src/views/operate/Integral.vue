<!-- 运营管理 -- 积分 -->
<template>
  <div class="member">
    <!-- :model="model" :rules="rules" -->
    <el-form class="form" ref="memberForm">
      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item prop="userName">
            <el-date-picker
              v-model="contractTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3.5">
          <el-form-item>
            <el-date-picker
              v-model="registerTime"
              type="date"
              placeholder="请选择注册日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3.5">
          <el-form-item>
            <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="3.5">
          <el-form-item>
            <el-select v-model="region" placeholder="请选择条件">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3.5">
          <el-form-item>
            <el-button type="primary" class="btn" @click="submit">
              新增表单
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="3.5">
          <el-form-item>
            <el-button
              :loading="btnLoading"
              type="primary"
              class="btn"
              @click="submit"
              icon="el-icon-search"
            >
              查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      :data="tableData"
      v-loading="tabLoading"
      style="width: 100%"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      class="tableBox"
    >
      <el-table-column
        type="index"
        label="序号"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="memberName" label="会员名" min-width="200" />
      <el-table-column prop="state" label="状态" min-width="200" />
      <el-table-column prop="registerTime" label="注册日期" min-width="200" />
      <el-table-column prop="contractTime" label="合约日期" min-width="200" />
      <el-table-column prop="integral" label="积分" min-width="200" />
      <el-table-column label="操作" fixed="right" width="200">
        <template #default>
          <el-button type="success" size="small">查看</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="paginations">
      <el-button type="primary" @click="exportExcel">批量导出</el-button>
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="currentPage"
        @current-change="currentChange"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

export default defineComponent({
  name: 'member',
  setup() {
    console.log(XLSX)
    const form = reactive({
      contractTime: [], //合约时间
      registerTime: '', //注册时间
      keyword: '', //关键字
      region: '', //筛选框条件
      btnLoading: false, //搜索按钮是否显示loading
    })

    const tableState = reactive({
      //表格数据
      tableData: [
        {
          memberName: '张三',
          state: '正常',
          registerTime: '2016-05-01',
          contractTime: 'No. 189, Grove St, Los Angeles',
          integral: 'CA 90036',
        },
        {
          memberName: '李四',
          state: '冻结',
          registerTime: 'Los Angeles',
          contractTime: 'No. 189, Grove St, Los Angeles',
          integral: 'CA 90036',
        },
        {
          memberName: '王五',
          state: '正常',
          registerTime: 'Los Angeles',
          contractTime: 'No. 189, Grove St, Los Angeles',
          integral: 'CA 90036',
        },
      ],
      currentPage: 1, //表格页码
      tabLoading: false, //表格loading
      //表格当前页数
      currentChange: () => {
        console.log(tableState.currentPage) //当前页码
        tableState.tabLoading = true
        setTimeout(() => {
          tableState.tabLoading = false
        }, 1000)
      },
      // 点击查询
      submit: () => {
        console.log(form)
      },
      // 导出到excel
      exportExcel: () => {
        // 设置当前日期
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let name = `授权记录${year}-${month}-${day}`
        // console.log(name)
        /* generate workbook object from table */
        //  .table要导出的是哪一个表格
        console.log(XLSX)
        var wb = XLSX.utils.table_to_book(document.querySelector('.tableBox'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array',
        })
        try {
          //  name+'.xlsx'表示导出的excel表格名字
          FileSaver.saveAs(
            new Blob([wbout], { type: 'application/octet-stream' }),
            name + '.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
    })

    return {
      ...toRefs(form), //筛选条件
      ...toRefs(tableState),
    }
  },
})
</script>
<style lang="scss" scoped>
.member {
  padding: 16px;
}
.paginations {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  ::v-deep(.el-icon-arrow-left) {
    display: inline-block;
  }
  ::v-deep(.el-icon-arrow-right) {
    display: inline-block;
  }
  ::v-deep(.el-pager) {
    font-weight: 500;
  }
}
</style>
