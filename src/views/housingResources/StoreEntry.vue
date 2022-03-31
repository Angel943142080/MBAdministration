<!-- 房源管理 > 门店录入页面 -->
<template>
  <div class="box">
    <!-- 表单 -->
    <el-row class="form" :gutter="20">
      <el-form style="width: 100%" :inline="true" class="demo-form-inline">
        <el-col :span="7">
          <el-form-item label="门店名称">
            <el-input
              v-model="accountNumber"
              placeholder="请输入门店名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
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
          <div>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </div>
        </el-col>
        <el-col :span="4" class="btnBox">
          <el-form-item>
            <div style="margin-top: 20px">
              <el-button
                type="primary"
                @click="tipClick('新增人员', 'newlyAdded')"
              >
                新增
              </el-button>
              <el-button>删除</el-button>
              <el-button type="primary" @click="tipClick('排序', 'sortRoom')">
                排序
              </el-button>
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
        <el-table-column type="selection" />
        <el-table-column type="index" label="排序" />
        <el-table-column prop="storeCover" label="门店封面展示 " />
        <el-table-column prop="storeName" label="门店名称" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="supportingFacilities" label="配套设施" />
        <el-table-column prop="publisher" label="发布人" />
        <el-table-column prop="releaseDate" label="发布日期" />
        <el-table-column prop="state" label="状态" />
        <el-table-column prop="views" label="浏览量" />
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button
              type="text"
              size="small"
              @click="tipClick('查看', 'newlyAdded')"
            >
              查看
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="tipClick('编辑', 'newlyAdded')"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="tipClick('下架', 'offTheShelf')"
            >
              下架
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="tipClick('删除', 'deleteRole')"
            >
              删除
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
      :width="dialogWidth"
      :top="dialogTop"
      @on-confirm="onConfirm"
    >
      <!-- 新增 -->
      <div v-show="isDialogType === 'newlyAdded'" class="newlyAddedMain">
        <NewStores
          @release="onConfirm"
          :dialogTitle="dialogTitle"
          :newlyAddedState="newlyAddedState"
        ></NewStores>
      </div>
      <!-- 排序 -->
      <div v-show="isDialogType === 'sortRoom'">
        <el-table
          :data="sortTableData"
          class="sortTable"
          style="width: 100%"
          row-key="id"
        >
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <!-- 删除 -->
      <div v-show="isDialogType === 'deleteRole'" class="deleteRoleMain">
        <div class="deleteTip">
          <svg-icon
            style="font-size: 20px; margin: 10px 16px 0 0"
            name="checkMark"
          ></svg-icon>
          <span>确认要删除该员工信息吗?</span>
        </div>
      </div>
      <!-- 下架 -->
      <div v-show="isDialogType === 'offTheShelf'" class="deleteRoleMain">
        <div class="deleteTip">
          <svg-icon
            style="font-size: 20px; margin: 10px 16px 0 0"
            name="checkMark"
          ></svg-icon>
          <span>确认要下架该门店吗?</span>
        </div>
        <div class="tipText">下架该门店，手机用户端将同步下架该门店信息</div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  nextTick,
} from 'vue'
import NewStores from './NewStores.vue' //新增门店
import Sortable from 'sortablejs' //拖拽插件

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
          storeCover: '门店封面展示', //门店封面展示
          storeName: '漫柏集团', //门店名称
          price: '1289', //价格
          supportingFacilities: '演播厅,书吧', //配套设施
          publisher: '张三三', //发布人
          releaseDate: '2022-02-17', //发布日期
          state: '已发布', //状态
          views: '1.1W', //浏览量
        },
        {
          storeCover: '门店封面展示', //门店封面展示
          storeName: '漫柏集团', //门店名称
          price: '1289', //价格
          supportingFacilities: '演播厅,书吧', //配套设施
          publisher: '张三三', //发布人
          releaseDate: '2022-02-17', //发布日期
          state: '已发布', //状态
          views: '1.1W', //浏览量
        },
        {
          storeCover: '门店封面展示', //门店封面展示
          storeName: '漫柏集团', //门店名称
          price: '1289', //价格
          supportingFacilities: '演播厅,书吧', //配套设施
          publisher: '张三三', //发布人
          releaseDate: '2022-02-17', //发布日期
          state: '已发布', //状态
          views: '1.1W', //浏览量
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
      // 弹窗
      tipClick: (tipTitle, state) => {
        btnState.dialogVisible = true //显示弹窗
        btnState.isDialogType = state //弹窗类型  新增/设置角色/设置新密码/编辑/查看
        btnState.dialogTitle = tipTitle //弹窗头部标题
        tipTitle === '删除' || tipTitle === '下架'
          ? (btnState.confirmDisplay = true)
          : (btnState.confirmDisplay = false) //只有删除\下架状态显示确定和隐藏按钮
        if (
          tipTitle == '查看' ||
          tipTitle == '编辑' ||
          tipTitle == '新增人员'
        ) {
          btnState.dialogTop = '5vh' //弹窗距离顶部距离
          btnState.dialogWidth = '80%' //弹窗宽度
        } else {
          btnState.dialogTop = '15vh' //弹窗距离顶部距离
          btnState.dialogWidth = '50%' //弹窗宽度
        }
        if (tipTitle == '排序') tableData.rowDrop()
      },
      // 排序table
      sortTableData: [
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
        // nextTick解决弹窗获取不到节点问题
        nextTick(() => {
          const tbody = document.querySelector('.sortTable tbody')
          console.log(tbody, 'tbody')
          Sortable.create(tbody, {
            animation: 150,
            ghostClass: 'blue-background-class',
            onEnd({ newIndex, oldIndex }) {
              const currRow = tableData.sortTableData.splice(oldIndex, 1)[0]
              tableData.sortTableData.splice(newIndex, 0, currRow)
            },
          })
        })
      },
    })

    // 按钮/弹窗数据源
    const btnState = reactive({
      isDialogType: '', //弹窗类型  新增/设置角色/设置新密码/编辑/查看
      dialogVisible: false, //是否显示弹窗
      confirmDisplay: true, //隐藏弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      dialogWidth: '80%', //弹窗宽度
      dialogTop: '2vh', //弹窗顶部距离
      // 点击确定
      onConfirm: value => {
        // console.log('父组件打印:', value)
        btnState.dialogVisible = false
        proxy.$message.success('发布成功')
      },
    })

    //  查看门店数据
    const newlyAddedState = reactive({
      mapInformation: {
        adcode: 320411,
        address: '江苏省常州市新北区龙虎塘街道浏阳河168号',
        category: '酒店宾馆:公寓式酒店',
        city: '常州市',
        district: '新北区',
        id: '2097345201839751854',
        location: { lat: 31.881454, lng: 119.991305 },
        province: '江苏省',
        title: '漫柏未来人才社区',
        type: 0,
        value: '漫柏未来人才社区',
      },
    })

    return {
      ...toRefs(form), //表单数据
      ...toRefs(tableData), //表格数据
      ...toRefs(btnState), //按钮数据
      newlyAddedState, //新增人员数据
    }
  },
  components: {
    NewStores,
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.blue-background-class) {
  color: #fff !important;
  background: #42b983 !important;
}
.box {
  padding: 20px 22px 40px 22px;
  background-color: #f4f7ff;
  min-height: 100%;
  .form {
    margin: 0px 0px 12px !important;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 35px 22px 12px 20px;
    .btnBox {
      float: right;
    }
  }
  .tableBox {
    background-color: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    // margin-top: 12px;
    padding: 20px 20px 53px;
    height: 100%;
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
    .tipText {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
