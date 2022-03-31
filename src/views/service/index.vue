<!-- 服务管理 > 维修服务页面 -->
<template>
  <div class="box">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      color="#ff7c00"
    >
      <el-tab-pane label="全部" name="whole"></el-tab-pane>
      <el-tab-pane label="待接单" name="waitingList"></el-tab-pane>
      <el-tab-pane label="待服务" name="toBeServed"></el-tab-pane>
      <el-tab-pane label="待付款" name="pendingPayment"></el-tab-pane>
      <el-tab-pane label="待评价" name="toBeEvaluated"></el-tab-pane>
      <el-tab-pane label="已完成" name="completed"></el-tab-pane>
      <el-tab-pane label="自行处理" name="voluntarilyHandle"></el-tab-pane>
      <el-tab-pane label="取消预约" name="cancelReservation"></el-tab-pane>
    </el-tabs>
    <!-- 表单 -->
    <el-row class="form" :gutter="20">
      <el-form
        style="width: 100%"
        :inline="true"
        :model="RmForm"
        class="demo-form-inline"
      >
        <el-col :span="6" class="listingNumber">
          <el-form-item label="房间号">
            <el-input
              v-model="RmForm.roomNumber"
              placeholder="请输入房间号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="listingNumber">
          <el-form-item label="联系人">
            <el-input
              v-model="RmForm.contacts"
              placeholder="请输入联系人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="维修人">
            <el-select v-model="RmForm.repairman" placeholder="请选择">
              <el-option
                v-for="item in RmForm.repairmanOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="btnBox">
          <el-form-item>
            <div>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
            <div style="margin-top:20px">
              <el-button type="primary" @click="RmForm.RmAddNewlyClick">
                新增
              </el-button>
              <el-button>导出</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <div class="tableBox">
      <el-table
        v-loading="RmTableData.tabLoading"
        class="table"
        :data="RmTableData.table"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" />
        <el-table-column prop="roomNumber" label="房间号" />
        <el-table-column prop="contacts" label="联系人" />
        <el-table-column prop="contactNumber" label="联系电话" />
        <el-table-column prop="appointmentTime" label="预约上门时间" />
        <el-table-column prop="isEnterTheDoor" label="是否可以进门" />
        <el-table-column prop="isCost" label="产生费用是否接受" />
        <el-table-column prop="problemDescription" label="问题描述" />
        <el-table-column prop="img" label="图片" />
        <el-table-column prop="repairman" label="维修人" />
        <el-table-column prop="evaluate" label="评价" />
        <el-table-column prop="commentOnStars" label="评星" />
        <el-table-column prop="state" label="状态" />
        <el-table-column label="操作" fixed="right">
          <template #default>
            <el-button
              type="text"
              size="small"
              @click="RmTableData.tipClick('查看', 'see')"
            >
              查看
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="RmTableData.tipClick('账单结算', 'billSettlement')"
            >
              账单结算
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="RmTableData.tipClick('取消订单', 'cancellationOfOrder')"
            >
              取消订单
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="RmTableData.tipClick('派单', 'distributeLeaflets')"
            >
              派单
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="RmTableData.tipClick('改派', 'reassignment')"
            >
              改派
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="paginations">
        <div class="total">共{{ RmTableData.total }}条数据</div>
        <el-pagination
          v-model:currentPage="RmTableData.currentPage"
          v-model:page-size="RmTableData.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="sizes, prev, pager, next"
          :total="RmTableData.total"
          @size-change="RmTableData.handleSizeChange"
          @current-change="RmTableData.handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 一级弹窗 -->
    <Dialog
      v-model:dialogVisible="dialogVisible"
      :confirmDisplay="confirmDisplay"
      :title="dialogTitle"
      @on-confirm="onConfirm"
    >
      <!-- 派单 -->
      <div v-show="dialogType === 'distributeLeaflets'" class="publishedMain">
        <div>
          <el-radio-group v-model="pdState.pdRadio" class="pdRadioGroup">
            <el-radio :label="1">派单</el-radio>
            <el-radio :label="2">自行处理</el-radio>
          </el-radio-group>
        </div>
        <!-- 派单-显示维修人选项 -->
        <el-row v-show="pdState.pdRadio == 1" class="repairmanMain">
          <el-col :span="3">
            <label for="">维修人</label>
          </el-col>
          <el-col :span="10">
            <el-select v-model="pdState.repairman" placeholder="请选择维修人">
              <el-option
                v-for="item in pdState.repairmanOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row class="remarks">
          <el-col :span="3">
            <label for="">备注</label>
          </el-col>
          <el-col :span="10">
            <el-input
              type="textarea"
              v-model="pdState.remarksValue"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入备注"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 改派 -->
      <div v-show="dialogType === 'reassignment'" class="publishedMain">
        <div>
          <el-radio-group v-model="pdState.pdRadio" class="pdRadioGroup">
            <el-radio :label="1">派单</el-radio>
            <el-radio :label="2">自行处理</el-radio>
          </el-radio-group>
        </div>
        <!-- 改派-显示维修人选项 -->
        <el-row v-show="gpState.pdRadio == 1" class="repairmanMain">
          <el-col :span="3">
            <label for="">维修人</label>
          </el-col>
          <el-col :span="10">
            <el-select v-model="gpState.repairman" placeholder="请选择维修人">
              <el-option
                v-for="item in gpState.repairmanOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row class="remarks">
          <el-col :span="3">
            <label for="">备注</label>
          </el-col>
          <el-col :span="10">
            <el-input
              type="textarea"
              v-model="gpState.remarksValue"
              :autosize="{ minRows: 5, maxRows: 10 }"
              placeholder="请输入备注"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 取消订单 -->
      <div v-show="dialogType === 'cancellationOfOrder'" class="publishedMain">
        <div class="publishedTip">
          <svg-icon
            style="font-size: 20px; margin: 0px 16px 0 0"
            name="checkMark"
          ></svg-icon>
          <div>确定取消该订单?</div>
        </div>
      </div>
      <!-- 删除 -->
      <div v-show="dialogType === 'OffTheShelf'" class="OffTheShelfMain">
        <div class="deleteTip">
          <svg-icon
            style="font-size: 20px; margin: 0px 16px 0 0"
            name="checkMark"
          ></svg-icon>
          <div>确认要删除该信息?</div>
        </div>
      </div>
      <!-- 新增 -->
      <div v-show="dialogType === 'addNewly'" class="addNewlyMain"></div>
    </Dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    //   tabs数据源
    const tabsState = reactive({
      activeName: 'whole', //tabs默认选中
      handleClick: tab => {},
    })
    // 维修服务数据源
    const rotationMap = reactive({
      //   表单数据
      RmForm: {
        //模块值
        roomNumber: '', //房间号
        contacts: '', //联系人
        repairman: '', //维修人
        //维修人option
        repairmanOption: [
          {
            label: '维修人1',
            value: '1',
          },
          {
            label: '维修人2',
            value: '2',
          },
        ],
        // 点击新增
        RmAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增选择' //显示弹窗
          btnState.dialogType = 'addNewly' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
        },
        // 房源的表格数据
        RmChoiceTable: () => {},
      },
      // 表格数据
      RmTableData: {
        // 轮播图table
        table: [
          {
            roomNumber: '白领精致房9304', //房间号
            contacts: '李四四', //联系人
            contactNumber: '18369635623', //联系电话
            appointmentTime: '2021-5-20', //预约上门时间
            isEnterTheDoor: '是', //是否可以进门
            isCost: '是', //产生费用是否接受
            problemDescription: '修水管', //问题描述
            img: '云丁', //图片
            repairman: '张三', //维修人
            evaluate: '服务很好', //评价
            commentOnStars: '4星', //评星
            state: '已发布', //状态
          },
          {
            roomNumber: '白领精致房9304', //房间号
            contacts: '李四四', //联系人
            contactNumber: '18369635623', //联系电话
            appointmentTime: '2021-7-31', //预约上门时间
            isEnterTheDoor: '否', //是否可以进门
            isCost: '是', //产生费用是否接受
            problemDescription: '修水龙头', //问题描述
            img: '云丁', //图片
            repairman: '马六', //维修人
            evaluate: '服务很好', //评价
            commentOnStars: '5星', //评星
            state: '未发布', //状态
          },
        ],
        // 弹窗table
        dialogTable: [
          {
            roomExhibition: '白领精致房9304', //房源展示
            roomName: '李四四', //房源名称
            roomPrice: '18369635623', //价格
            roomMatching: '云丁', //配套设施
          },
          {
            roomExhibition: '白领精致房9304', //房源展示
            roomName: '李四四', //房源名称
            roomPrice: '18369635623', //价格
            roomMatching: '云丁', //配套设施
          },
          {
            roomExhibition: '白领精致房9304', //房源展示
            roomName: '李四四', //房源名称
            roomPrice: '18369635623', //价格
            roomMatching: '云丁', //配套设施
          },
        ],
        tabLoading: false, //是否加载loading
        currentPage: 1, //当前页码
        pageSize: 10, //一页多少条数据
        total: 1000, //共多少条数据
        // (弹窗)
        tipClick: (tipTitle, state) => {
          console.log(state)
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = tipTitle //弹窗标题
          btnState.dialogType = state //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
        },
        // 修改每页多少条触发
        handleSizeChange: val => {
          console.log(`${val} items per page`)
          rotationMap.RmTableData.tabLoading = true
          setTimeout(() => {
            rotationMap.RmTableData.tabLoading = false
          }, 1000)
        },
        // 页码改变时触发
        handleCurrentChange: val => {
          console.log(`current page: ${val}`)
          rotationMap.RmTableData.tabLoading = true
          setTimeout(() => {
            rotationMap.RmTableData.tabLoading = false
          }, 1000)
        },
      },
    })
    // 弹窗数据源
    const popupState = reactive({
      pdState: {
        pdRadio: 1, //默认派单
        repairman: '', //维修人
        repairmanOption: [
          {
            label: '维修人1',
            value: 1,
          },
          {
            label: '维修人2',
            value: 2,
          },
        ], //维修人option
        remarksValue: '', //备注
      },
      gpState: {
        pdRadio: 1, //默认派单
        repairman: '', //维修人
        repairmanOption: [
          {
            label: '维修人1',
            value: 1,
          },
          {
            label: '维修人2',
            value: 2,
          },
        ], //维修人option
        remarksValue: '', //备注
      },
    })
    // 按钮数据源
    const btnState = reactive({
      dialogVisible: false, //是否显示新增弹窗
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      dialogType: '', //弹窗类型  published/已发布     OffTheShelf/已下架  addNewly/新增
      // 二级弹窗数据
      twoIsDialogType: '', //检查二级弹窗类型  choiceRoom房源选择
      twoDialogVisible: false, //二级弹窗 - 是否显示弹窗
      twoConfirmDisplay: true, //二级弹窗 - 是否显示弹窗的确定、取消按钮
      twoDialogTitle: '', //二级弹窗头部标题
      // 点击选择弹出表格
      onConfirm: () => {
        console.log(btnState.dialogType)
        btnState.dialogVisible = false //隐藏弹窗
        proxy.$message.success('OK!!!')
      },
      // 二级弹窗确定时间
      twoOnConfirm: () => {
        console.log('二级弹窗')
        btnState.dialogVisible = false //隐藏一级弹窗
        btnState.twoDialogVisible = false //隐藏弹窗
        proxy.$message.success('OK')
      },
    })
    return {
      ...toRefs(tabsState), //tabs数据源
      ...toRefs(rotationMap), //维修服务数据源
      ...toRefs(popupState), //弹窗数据源
      ...toRefs(btnState), //按钮数据源
    }
  },
})
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 22px 40px 22px;
  background-color: #f4f7ff;
  min-height: calc(100vh - 82px);
  box-sizing: border-box;
  ::v-deep(.el-tabs__nav-wrap::after) {
    position: static;
  }
  ::v-deep(.el-tabs__active-bar) {
    background-color: #ff7c00;
  }

  ::v-deep(.is-active) {
    color: #ff7c00;
  }
  ::v-deep(.el-tabs__item):hover {
    color: #ff7c00;
  }
  .form {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 35px 22px 12px 20px;
    width: 100%;
    margin-left: 0px !important;
    .listingNumber {
      ::v-deep(.el-input) {
        width: 300px;
      }
    }
    .btnBox {
      float: right;
      // margin-top: 20px;
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

  // 弹窗
  // 派单
  .publishedMain {
    .pdRadioGroup {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .repairmanMain {
      ::v-deep(.el-select) {
        width: 100%;
      }
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .el-col:nth-of-type(1) {
        display: flex;
        align-items: center;
        margin-right: 19px;
        // font-weight: 600;
      }
    }
    // 备注
    .remarks {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .el-col:nth-of-type(1) {
        display: flex;
        align-items: start;
        margin-right: 19px;
        // font-weight: 600;
      }
    }
  }

  // 下架
  .publishedMain {
    .publishedTip {
      color: #000000;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .describe {
      text-align: center;
      margin-top: 25px;
    }
  }
  // 删除
  .OffTheShelfMain {
    .deleteTip {
      color: #000000;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  // 新增
  .addNewlyMain {
    padding: 100px;
    .radioGroup {
      display: flex;
      flex-direction: column;
      align-items: center;
      &::v-deep(.el-radio:last-child) {
        margin-right: 30px;
        margin: 30px 30px 0 0;
      }
      &::v-deep(.el-radio) {
        margin-top: 30px;
      }
    }
  }

  //
}
</style>
