<!-- 权限管理 > 角色管理页面 -->
<template>
  <div class="box">
    <!-- 表单 -->
    <el-row class="form" :gutter="30">
      <el-form style="width: 100%" :inline="true" class="demo-form-inline">
        <el-col :span="5">
          <el-form-item label="账号">
            <el-input
              v-model="accountNumber"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="姓名">
            <el-input v-model="fullName" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="timeFrame"
              type="datetimerange"
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="截止时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" class="btnBox">
          <el-form-item>
            <div>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
            <!-- <div style="margin-top: 20px">
              <el-button type="primary" @click="newRole">新增</el-button>
              <el-button>删除</el-button>
            </div> -->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <div class="tableBox">
      <el-table
        class="table"
        v-loading="tabLoading"
        :data="table"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="role" label="账号" min-width="200" />
        <el-table-column prop="founder" label="操作时间" min-width="200" />
        <el-table-column prop="department" label="操作人" min-width="200" />
        <el-table-column label="操作" fixed="right" width="200">
          <template #default>
            <el-button type="text" size="small" @click="deleteClick">
              设置权限
            </el-button>
            <el-button type="text" size="small" @click="deleteClick">
              删除
            </el-button>
            <el-button type="text" size="small" @click="deleteClick">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="seeClick">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="paginations">
        <div class="total">共{{ total }}条数据</div>
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <Dialog
      v-model:dialogVisible="dialogVisible"
      :confirmDisplay="confirmDisplay"
      :title="dialogTitle"
      @on-confirm="onConfirm"
    >
      <!-- v-slot:newlyAdded  v-slot:default -->
      <div class="newlyAddedMain">
        <el-row justify="center" style="margin-top: 0px">
          <el-col :span="4">
            <label>角色名称</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-input
              v-show="!joinTime"
              v-model="roleName"
              placeholder="请输入角色名称"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{roleName}} -->
              项目经理
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>所属部门</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-select
              v-show="!joinTime"
              v-model="roleValue"
              placeholder="请选择所属部门"
            >
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{roleValue}} -->
              开发部
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>角色权限</label>
          </el-col>
          <el-col :span="8">
            <div class="setUp">去设置</div>
          </el-col>
        </el-row>
        <!-- 创建人 -->
        <el-row justify="center" v-show="joinTime">
          <el-col :span="4">
            <label>创建人</label>
          </el-col>
          <el-col :span="8" style="display: flex; align-items: center">
            张三
          </el-col>
        </el-row>
        <!-- 创建时间 -->
        <el-row justify="center" v-show="joinTime">
          <el-col :span="4">
            <label>创建时间</label>
          </el-col>
          <el-col :span="8" style="display: flex; align-items: center">
            2022-02-21
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>状态</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-radio-group v-show="!joinTime" v-model="stateRadio">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
            <!-- 查看状态 -->
            <el-radio-group v-show="joinTime" v-model="stateRadio">
              <el-radio :label="stateRadio ? 1 : 0">
                {{ stateRadio ? '启用' : '禁用' }}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    //   表单数据
    const form = reactive({
      accountNumber: '', //账号
      fullName: '', //姓名
      timeFrame: '', //时间范围
    })

    // 表格数据
    const tableData = reactive({
      table: [
        {
          role: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          founder: '张三',
          founderTime: '2021.12.21',
          state: 'California',
        },
        {
          role: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          founder: '张三',
          founderTime: '2021.12.21',
          state: 'California',
        },
        {
          role: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          founder: '张三',
          founderTime: '2021.12.21',
          state: 'California',
        },
      ], //表格数据
      currentPage: 1, //当前页码
      tabLoading: false, //tabloading
      pageSize: 10, //一页多少条数据
      total: 1000, //共多少条数据
      //查看事件
      seeClick: () => {
        console.log('查看click')
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '详情' //弹窗头部标题
        btnState.confirmDisplay = false //隐藏确定和取消按钮
        btnState.joinTime = true //显示加入日期
      },
      //删除事件
      deleteClick: () => {
        console.log('删除click')
      },
      // 修改每页多少条触发
      handleSizeChange: val => {
        console.log(`${val} items per page`)
        tableData.tabLoading = true
        setTimeout(() => {
          tableData.tabLoading = false
        }, 1000)
      },
      // 页码改变时触发
      handleCurrentChange: val => {
        console.log(`current page: ${val}`)
        tableData.tabLoading = true
        setTimeout(() => {
          tableData.tabLoading = false
        }, 1000)
      },
    })
    // 按钮数据源
    const btnState = reactive({
      dialogVisible: false, //是否显示新增弹窗
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      joinTime: false, //是否显示加入日期
      dialogTitle: '', //弹窗头部标题
      // 弹窗确定按钮
      onConfirm: () => {
        console.log('弹窗确定')
        btnState.dialogVisible = false //隐藏弹窗
        proxy.$message.success('发布成功')
      },
    })

    return {
      ...toRefs(form), //表单数据
      ...toRefs(tableData), //表格数据
      ...toRefs(btnState), //按钮数据源
    }
  },
})
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 22px 40px 22px;
  background-color: #f4f7ff;
  min-height: 100%;
  .form {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 35px 22px 12px 20px;
    width: 100%;
    margin: 0px !important;
    .btnBox {
      float: right;
    }
  }
  .tableBox {
    background-color: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    margin-top: 12px;
    padding: 20px 20px 53px;
    height: 100%;
    .table {
      width: 90%;
    }
    .total {
      margin-bottom: 2px;
      font-size: 12px;
      color: #747579;
      margin-right: 30px;
    }
    .paginations {
      margin-top: 50px;
      display: flex;
      justify-content: end;
      align-items: center;
      margin-top: 102px;
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
  }

  // 新增角色
  .newlyAddedMain {
    .el-row {
      margin-top: 35px;
    }
    .el-col:nth-of-type(1) {
      display: flex;
      align-items: center;
    }
    // 去设置
    .setUp {
      color: #ff7c00;
      cursor: pointer;
    }
  }
}
</style>
