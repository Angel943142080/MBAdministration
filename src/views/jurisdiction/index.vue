<!-- 权限管理 > 人员管理页面 -->
<template>
  <div class="box">
    <!-- 表单 -->
    <el-row class="form">
      <el-form style="width: 100%" :inline="true" class="demo-form-inline">
        <el-col :span="5">
          <el-form-item label="所属部门">
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
          <el-form-item label="账号">
            <el-input
              v-model="accountNumber"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="角色名">
            <el-input v-model="roleName" placeholder="请输入角色名"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" class="btnBox">
          <el-form-item>
            <div>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="newlyAdded">新增</el-button>
              <el-button>删除</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <div class="tableBox">
      <el-table
        class="table"
        :data="tabble"
        v-loading="tabLoading"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="accountNumber" label="账号" min-width="200" />
        <el-table-column prop="name" label="姓名" min-width="200" />
        <el-table-column prop="role" label="角色" min-width="200" />
        <el-table-column prop="department" label="所属部门" min-width="200" />
        <el-table-column prop="state" label="状态" min-width="200" />
        <el-table-column label="操作" fixed="right" width="200">
          <template #default>
            <el-button type="text" size="small" @click="setUpRoleClick">
              设置角色
            </el-button>
            <el-button type="text" size="small" @click="setUpNewPasswordClick">
              设置新密码
            </el-button>
            <el-button type="text" size="small" @click="deleteClick">
              删除
            </el-button>
            <el-button type="text" size="small" @click="editClick">
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
      <!-- 新增 -->
      <div v-show="isDialogType === 'newlyAdded'" class="newlyAddedMain">
        <el-row justify="center" style="margin-top: 0px">
          <el-col :span="4">
            <label>账号</label>
          </el-col>
          <el-col :span="15">
            <el-input
              v-show="!joinTime"
              v-model="userAccountNumber"
              placeholder="请设置 6 - 20位数字、字母账号"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <div>{{ userAccountNumber }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>姓名</label>
          </el-col>
          <el-col :span="15">
            <el-input
              v-show="!joinTime"
              v-model="userName"
              placeholder="请输入姓名"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <div>{{ userName }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>性别</label>
          </el-col>
          <el-col :span="15">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-radio-group v-show="!joinTime" v-model="genderRadio">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <div>{{ genderRadio ? '男' : '女' }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>手机号</label>
          </el-col>
          <el-col :span="15">
            <el-input
              v-show="!joinTime"
              v-model="userPhone"
              placeholder="请输入手机号"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <div>{{ userPhone }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>密码</label>
          </el-col>
          <el-col :span="15">
            <el-input
              v-show="!joinTime"
              v-model="userPassword"
              placeholder="请设置6位及以上的数字、字母密码"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <div>{{ userPassword }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>角色选择</label>
          </el-col>
          <el-col :span="15">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-select
              v-show="!joinTime"
              v-model="roleValue"
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              {{ roleValue }}
            </div>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>状态</label>
          </el-col>
          <el-col :span="15">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-radio-group v-show="!joinTime" v-model="stateRadio">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <div>{{ stateRadio ? '启用' : '禁用' }}</div>
            </div>
          </el-col>
        </el-row>
        <!-- 加入日期 -->
        <el-row justify="center" v-show="joinTime">
          <el-col :span="4">
            <label>加入日期</label>
          </el-col>
          <el-col :span="15" style="display: flex; align-items: center">
            2022-02-21
          </el-col>
        </el-row>
      </div>
      <!-- 设置角色 -->
      <div v-show="isDialogType === 'setUpRole'" class="setUpRoleMain">
        <div>
          <label>设置角色</label>
          <el-select v-model="setUpRoleValue" placeholder="角色选择">
            <el-option
              v-for="item in setUpRoleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 设置新密码 -->
      <div
        v-show="isDialogType === 'setUpNewPassword'"
        class="setUpNewPasswordMain"
      >
        <el-row class="ul" justify="center">
          <el-col :span="3"><label>新密码</label></el-col>
          <el-col :span="10">
            <el-input
              v-model="setUpPasswordValue"
              placeholder="请输入新密码"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="ul" justify="center">
          <el-col :span="3"><label>再次输入</label></el-col>
          <el-col :span="10">
            <el-input
              v-model="setUpAgainPasswordValue"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-col>
        </el-row>
        <div class="tip">请设置6位及以上的数字、字母密码</div>
      </div>
      <!-- 删除 -->
      <div v-show="isDialogType === 'deleteRole'" class="deleteRoleMain">
        <div class="deleteTip">
          <svg-icon
            style="font-size:20px;margin:10px 16px 0 0"
            name="checkMark"
          ></svg-icon>
          <span>确认要删除该员工信息吗?</span>
        </div>
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
      accountNumber: '', //账号
      roleName: '', //角色名
    })

    // 表格数据
    const tableData = reactive({
      tabble: [
        {
          accountNumber: '2123456',
          name: 'Tom',
          role: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          state: 'California',
        },
        {
          accountNumber: '2123456',
          name: 'Tom',
          role: '业务员',
          department: 'No. 189, Grove St, Los Angeles',
          state: 'California',
        },
        {
          accountNumber: '2123456',
          name: 'Tom',
          role: '管理员',
          department: 'No. 189, Grove St, Los Angeles',
          state: 'California',
        },
      ],
      currentPage: 1, //当前页码
      tabLoading: false, //tabloading
      pageSize: 10, //一页多少条数据
      total: 1000, //共多少条数据
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
      // 设置角色
      setUpRoleClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.isDialogType = 'setUpRole' //弹窗类型  新增/设置角色/设置新密码/编辑/查看
        btnState.dialogTitle = '设置角色' //弹窗头部标题
        btnState.confirmDisplay = true //显示弹窗的确定、取消按钮
      },
      // 设置新密码
      setUpNewPasswordClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.isDialogType = 'setUpNewPassword' //弹窗类型  新增/设置角色/设置新密码/编辑/查看
        btnState.dialogTitle = '设置新密码' //弹窗头部标题
        btnState.confirmDisplay = true //显示弹窗的确定、取消按钮
      },
      // 编辑
      editClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.isDialogType = 'newlyAdded' //弹窗类型  新增/设置角色/设置新密码/编辑/查看
        btnState.dialogTitle = '编辑' //弹窗头部标题
        btnState.joinTime = false //弹窗true查看状态 false编辑/新增状态
        btnState.confirmDisplay = true //显示弹窗的确定、取消按钮
        // 获取当前用户表单数据
        newlyAddedState.userAccountNumber = '123' //账号
        newlyAddedState.userName = '李四' //姓名
        newlyAddedState.genderRadio = 1 //性别 默认男
        newlyAddedState.userPhone = '126189156' //手机号
        newlyAddedState.userPassword = '123456' //密码
        newlyAddedState.roleValue = 'Option1' //角色筛选框值
        newlyAddedState.roleOptions = [
          {
            value: 'Option1',
            label: '管理员',
          },
          {
            value: 'Option2',
            label: '运营',
          },
        ] //角色option
        newlyAddedState.stateRadio = 1 //状态 默认启用
      },
      //查看
      seeClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.isDialogType = 'newlyAdded' //弹窗类型  新增/设置角色/设置新密码/编辑/查看
        btnState.joinTime = true //查看状态
        btnState.confirmDisplay = false //隐藏确定、取消按钮
        btnState.dialogTitle = '查看' //弹窗头部标题
      },
      //删除
      deleteClick: () => {
        console.log('删除click')
        btnState.dialogVisible = true //显示弹窗
        btnState.isDialogType = 'deleteRole' //弹窗类型  新增/设置角色/设置新密码/编辑/查看
        btnState.confirmDisplay = true //隐藏确定、取消按钮
        btnState.dialogTitle = '' //弹窗头部标题
      },
    })

    // 按钮/弹窗数据源
    const btnState = reactive({
      isDialogType: '', //弹窗类型  新增/设置角色/设置新密码/编辑/查看
      dialogVisible: false, //是否显示弹窗
      joinTime: false, //弹窗true查看状态 false编辑/新增状态
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      setUpRoleValue: '', //设置角色 - 角色值
      setUpRoleOption: [
        {
          value: 'Option1',
          label: '总经办',
        },
        {
          value: 'Option2',
          label: '企划中心',
        },
      ], // 设置角色 - 角色筛选框
      setUpPasswordValue: '', //设置新密码 - 新密码
      setUpAgainPasswordValue: '', //设置新密码 - 再次输入
      // 点击新增人员
      newlyAdded: () => {
        btnState.isDialogType = 'newlyAdded' //新增弹窗
        btnState.dialogVisible = true //显示弹窗
        btnState.confirmDisplay = true //显示弹窗的确定、取消按钮
        btnState.joinTime = false //弹窗true查看状态 false编辑/新增状态
        btnState.dialogTitle = '新增人员' //弹窗头部标题
        // 将表单数据回归初始值
        newlyAddedState.userAccountNumber = '' //账号
        newlyAddedState.userName = '' //姓名
        newlyAddedState.genderRadio = 1 //性别 默认男
        newlyAddedState.userPhone = '' //手机号
        newlyAddedState.userPassword = '' //密码
        newlyAddedState.roleValue = '' //角色筛选框值
        newlyAddedState.roleOptions = [
          {
            value: 'Option1',
            label: '管理员',
          },
          {
            value: 'Option2',
            label: '运营',
          },
        ] //角色option
        newlyAddedState.stateRadio = 1 //状态 默认启用
      },
      // 点击确定
      onConfirm: value => {
        // console.log('父组件打印:', value)
        btnState.dialogVisible = false
        proxy.$message.success('成功')
      },
    })

    //  新增人员数据
    const newlyAddedState = reactive({
      userAccountNumber: '', //账号
      userName: '', //姓名
      genderRadio: 1, //性别 默认男
      userPhone: '', //手机号
      userPassword: '', //密码
      roleValue: '', //角色筛选框值
      roleOptions: [
        {
          value: 'Option1',
          label: '管理员',
        },
        {
          value: 'Option2',
          label: '运营',
        },
      ], //角色option
      stateRadio: 1, //状态 默认启用
    })

    return {
      ...toRefs(form), //表单数据
      ...toRefs(tableData), //表格数据
      ...toRefs(btnState), //按钮数据
      ...toRefs(newlyAddedState), //新增人员数据
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
  // 新增人员
  .newlyAddedMain {
    .el-row {
      margin-top: 35px;
    }
    .el-col:nth-of-type(1) {
      display: flex;
      align-items: center;
    }
  }
  // 设置角色
  .setUpRoleMain {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5vh 0 10vh;
    label {
      margin-right: 16px;
    }
  }
  // 设置新密码
  .setUpNewPasswordMain {
    .ul {
      margin-top: 28px;
      div:nth-of-type(1) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .tip {
      text-align: center;
      font-size: 14px;
      color: #9b9b9b;
      margin-top: 28px;
    }
  }
  // 删除
  .deleteRoleMain {
    margin: 5vh 0 10vh;
    .deleteTip {
      color: #000000;
      text-align: center;
    }
  }
}
</style>
