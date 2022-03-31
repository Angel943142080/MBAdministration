<!-- 权限管理 > 部门管理页面 -->
<template>
  <div class="box">
    <!-- 表单 -->
    <el-row class="form">
      <el-form style="width: 100%" :inline="true" class="demo-form-inline">
        <el-col :span="5">
          <el-form-item label="部门名称">
            <el-select v-model="departmentValue" placeholder="请选择部门">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态">
            <el-select v-model="stateValue" placeholder="请选择状态">
              <el-option
                v-for="item in stateOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="联系人">
            <el-input v-model="contacts" placeholder="请输入联系人"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" class="btnBox">
          <el-form-item>
            <div>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="newDepartment">新增</el-button>
              <el-button>删除</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <div class="tableBox">
      <el-table
        v-loading="tabLoading"
        class="table"
        :data="table"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="department" label="部门名称" min-width="200" />
        <el-table-column prop="contacts" label="联系人" min-width="200" />
        <el-table-column prop="phone" label="手机号" min-width="200" />
        <el-table-column prop="founderTime" label="创建时间" min-width="200" />
        <!-- <el-table-column prop="state" label="状态" min-width="200" /> -->
        <el-table-column label="操作" fixed="right" width="200">
          <template #default>
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
            <label>部门名称</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-input
              v-show="!joinTime"
              v-model="departmentName"
              placeholder="请输入部门名称"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{departmentName}} -->
              开发部
            </div>
          </el-col>
        </el-row>
        <!-- 联系人 -->
        <el-row justify="center">
          <el-col :span="4">
            <label>联系人</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-input
              v-show="!joinTime"
              v-model="contacts"
              placeholder="请输入联系人"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{contacts}} -->
              张三
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>手机号</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-input
              v-show="!joinTime"
              v-model="phone"
              placeholder="请输入手机号"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{phone}} -->
              123655465489
            </div>
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
        <!-- 状态 -->
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
      departmentValue: '', //部门值
      departmentOptions: [
        {
          value: 'Option1',
          label: '物业',
        },
        {
          value: 'Option2',
          label: '运营',
        },
        {
          value: 'Option3',
          label: '仓储',
        },
        {
          value: 'Option4',
          label: '客服',
        },
        {
          value: 'Option5',
          label: '开发',
        },
      ], //部门option
      stateValue: '', //状态值
      stateOption: [
        {
          value: 'Option1',
          label: '启用',
        },
        {
          value: 'Option2',
          label: '禁用',
        },
      ], //状态option
      contacts: '', //联系人
    })

    // 表格数据
    const tableData = reactive({
      table: [
        {
          phone: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          contacts: '张三',
          founderTime: '2021.12.21',
          state: 'California',
        },
        {
          phone: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          contacts: '张三',
          founderTime: '2021.12.21',
          state: 'California',
        },
        {
          phone: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          contacts: '张三',
          founderTime: '2021.12.21',
          state: 'California',
        },
      ], //表格数据
      currentPage: 1, //当前页码
      tabLoading: false, //表格loading
      pageSize: 10, //一页多少条数据
      total: 1000, //共多少条数据
      //查看事件
      seeClick: () => {
        console.log('查看click')
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
      // 新增部门
      newDepartment: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '新增部门' //新增部门
        btnState.confirmDisplay = true //显示确定和取消按钮
        btnState.joinTime = false //隐藏加入日期
        // 初始化新增部门数据
        newRuleState.departmentName = '' //所属部门
        newRuleState.contacts = '' //联系人
        newRuleState.phone = '' //手机号
        newRuleState.stateRadio = 1 //状态 默认启用
      },
      // 查看部门
      seeClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '详情' //弹窗头部标题
        btnState.confirmDisplay = false //隐藏确定和取消按钮
        btnState.joinTime = true //显示加入日期
      },
      // 弹窗确定按钮
      onConfirm: () => {
        console.log('弹窗确定')
        btnState.dialogVisible = false //隐藏弹窗
        proxy.$message.success('发布成功')
      },
    })
    //  新增部门数据
    const newRuleState = reactive({
      departmentName: '', //所属部门
      contacts: '', //联系人
      phone: '', //手机号
      stateRadio: 1, //状态 默认启用
    })

    return {
      ...toRefs(form), //表单数据
      ...toRefs(tableData), //表格数据
      ...toRefs(btnState), //新增部门数据
      ...toRefs(newRuleState), //新增部门数据
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

  // 新增部门
  .newlyAddedMain {
    .el-row {
      margin-top: 35px;
    }
    .el-col:nth-of-type(1) {
      display: flex;
      align-items: center;
    }
  }
}
</style>
