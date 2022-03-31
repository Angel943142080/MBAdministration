<!-- 权限管理 > 功能管理页面 -->
<template>
  <div class="box">
    <!-- 表单 -->
    <el-row class="form">
      <el-form style="width: 100%" :inline="true" class="demo-form-inline">
        <el-col :span="5">
          <el-form-item label="功能名称">
            <el-input
              v-model="funcName"
              placeholder="请输入功能名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="功能编码">
            <el-input
              v-model="funcCode"
              placeholder="请输入功能编码"
            ></el-input>
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

        <el-col :span="4" class="btnBox">
          <el-form-item>
            <div>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="newGongneng">新增</el-button>
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
        v-loading="tabLoading"
        :data="table"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="funcName" label="功能名称" min-width="200" />
        <el-table-column prop="funcCode" label="功能编码" min-width="200" />
        <el-table-column prop="founderTime" label="创建时间" min-width="200" />
        <el-table-column prop="state" label="状态" min-width="200" />
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
            <label>功能名称</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-input
              v-show="!joinTime"
              v-model="gongnengName"
              placeholder="请输入功能名称"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{gongnengName}} -->
              活动管理
            </div>
          </el-col>
        </el-row>
        <!-- 联系人 -->
        <el-row justify="center">
          <el-col :span="4">
            <label>功能编码</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-input
              v-show="!joinTime"
              v-model="gongnengCode"
              placeholder="请输入功能编码"
            ></el-input>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{gongnengCode}} -->
              huodong012
            </div>
          </el-col>
        </el-row>
        <!-- 级别 -->
        <el-row justify="center">
          <el-col :span="4">
            <label>级别</label>
          </el-col>
          <el-col :span="8">
            <!-- joinTime  true 查看状态  false 编辑或者添加状态 -->
            <el-select
              v-show="!joinTime"
              v-model="level"
              placeholder="请选择级别"
            >
              <el-option
                v-for="item in levelOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 查看状态 -->
            <div v-show="joinTime">
              <!-- {{level}} -->
              一级
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
      funcName: '', //功能名称
      funcCode: '', //功能编码
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
    })

    // 表格数据
    const tableData = reactive({
      table: [
        {
          funcName: '管理员',
          funcCode: 'No. 189, Grove St, Los Angeles',
          founderTime: '2021.12.21',
          state: 'California',
        },
        {
          funcName: '管理员',
          funcCode: 'No. 189, Grove St, Los Angeles',
          founderTime: '2021.12.21',
          state: 'California',
        },
        {
          funcName: '管理员',
          funcCode: 'No. 189, Grove St, Los Angeles',
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
      // 新增功能
      newGongneng: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '新增功能' //新增功能
        btnState.confirmDisplay = true //显示确定和取消按钮
        btnState.joinTime = false //隐藏加入日期
        // 初始化新增功能数据
        newGongneng.gongnengName = '' //功能名称
        newGongneng.gongnengCode = '' //功能编码
        newGongneng.level = '' //级别
        newGongneng.levelOption = [
          {
            label: '经理',
            value: '1',
          },
          {
            label: '负责人',
            value: '2',
          },
        ] //级别option
        newGongneng.stateRadio = 1 //状态 默认启用
      },
      // 查看功能
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
        proxy.$message.success('成功')
      },
    })
    //  新增功能数据
    const newGongneng = reactive({
      gongnengName: '', //功能名称
      gongnengCode: '', //功能编码
      level: '', //级别
      levelOption: [
        {
          label: '经理',
          value: '1',
        },
        {
          label: '负责人',
          value: '2',
        },
      ], //级别option
      stateRadio: 1, //状态 默认启用
    })
    return {
      ...toRefs(form), //表单数据
      ...toRefs(tableData), //表格数据
      ...toRefs(btnState), //按钮数据源
      ...toRefs(newGongneng), //新增功能数据
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

  // 新增功能
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
