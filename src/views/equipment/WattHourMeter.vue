<!-- 设备管理 > 智能电表页面 -->
<template>
  <div class="box">
    <!-- 表单 -->
    <el-row class="form">
      <el-form style="width: 100%" :inline="true" class="demo-form-inline">
        <el-col :span="10" class="listingNNumber">
          <el-form-item label="房源信息">
            <el-input
              v-model="founder"
              placeholder="请输入房源编号、名称、门牌号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="租客信息">
            <el-input
              v-model="roleName"
              placeholder="请输入姓名、电话"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="btnBox">
          <el-form-item>
            <div>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
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
        <el-table-column type="index" label="序号" />
        <el-table-column prop="roomName" label="房源名称" min-width="100" />
        <el-table-column prop="tenantName" label="租户姓名" />
        <el-table-column prop="tenantPhone" label="租户电话" />
        <el-table-column prop="equipmentName" label="设备名称" />
        <el-table-column prop="equipmentType" label="设备类型" />
        <el-table-column prop="MACAddress" label="MAC地址/编码" />
        <el-table-column prop="waterType" label="水资源类型" />
        <el-table-column prop="ratePrice" label="费率(元/m²)" />
        <el-table-column prop="waterVolume" label="使用水量(m²)" />
        <el-table-column prop="paymentMethod" label="付费方式" />

        <el-table-column label="操作" fixed="right">
          <template #default>
            <el-button type="text" size="small" @click="detailsClick">
              详情
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
      width="80%"
      @on-confirm="onConfirm"
    >
      <!-- 详情 -->
      <div class="detailsMain">
        <div class="detailsHeader">
          <div class="headerTitle">在线</div>
          <div>
            <svg-icon class="lockIcon" name="waterDrop" />
          </div>
          <div>
            <ul>
              <li>
                <p>品牌</p>
                <div>非智能</div>
              </li>
              <li>
                <p>价格</p>
                <div>5元/吨</div>
              </li>
              <li>
                <p>操作时间</p>
                <div>2022-02-28</div>
              </li>
            </ul>
          </div>
          <div class="btnBox">
            <el-button color="#FF7C00">抄表</el-button>
            <el-button color="#FF7C00">解绑</el-button>
          </div>
        </div>
        <!-- 表格数据 -->
        <div class="detailsBox">
          <div class="header">
            <div>租客起始读数:(千瓦.时)</div>
            <div>公摊累积电量:(千瓦.时)</div>
          </div>
          <div>
            <!-- table -->
            <el-table
              :data="authorizationState.WmTableData"
              border
              style="width: 100%"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column prop="WmTableNo" label="表号" />
              <el-table-column prop="WmAddress" label="地址" />
              <el-table-column prop="WmTenant" label="租户" />
              <el-table-column prop="WmTableNumber" label="表数" />
              <el-table-column prop="WmMoney" label="金额 " />
              <el-table-column prop="WmMeterReading" label="抄表时间" />
              <el-table-column prop="WmMeterReader" label="抄表人" />
              <el-table-column label="操作" width="200">
                <template #default>
                  <el-button type="text" size="small" @click="deleteClick">
                    查看
                  </el-button>
                  <el-button type="text" size="small" @click="deleteClick">
                    生产账单
                  </el-button>
                  <el-button type="text" size="small" @click="seeClick">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
      founder: '', //房源信息
      roleName: '', //租客信息
    })
    // 表格数据
    const tableData = reactive({
      table: [
        {
          roomName: '白领精致房9304', //房源名称
          tenantName: '李四四', //租户姓名
          tenantPhone: '18369635623', //租户电话
          equipmentName: '云丁', //设备名称
          equipmentType: 'A类型', //设备类型
          MACAddress: 'e3dd83b3421d29deeea799ad641bf112', //MAC地址/编码
          waterType: '水', //水资源类型
          ratePrice: '6', //费率(元/m²)
          waterVolume: '541.11', //使用水量(m²)
          paymentMethod: '后付费率', //付费方式
        },
        {
          roomName: '白领精致房9304', //房源名称
          tenantName: '李四四', //租户姓名
          tenantPhone: '18369635623', //租户电话
          equipmentName: '云丁', //设备名称
          equipmentType: 'A类型', //设备类型
          MACAddress: 'e3dd83b3421d29deeea799ad641bf112', //MAC地址/编码
          waterType: '水', //水资源类型
          ratePrice: '5', //费率(元/m²)
          waterVolume: '25.12', //使用水量(m²)
          paymentMethod: '后付费率', //付费方式
        },
        {
          roomName: '白领精致房9304', //房源名称
          tenantName: '李四四', //租户姓名
          tenantPhone: '18369635623', //租户电话
          equipmentName: '云丁', //设备名称
          equipmentType: 'A类型', //设备类型
          MACAddress: 'e3dd83b3421d29deeea799ad641bf112', //MAC地址/编码
          waterType: '水', //水资源类型
          ratePrice: '4', //费率(元/m²)
          waterVolume: '0.00', //使用水量(m²)
          paymentMethod: '后付费率', //付费方式
        },
      ], //表格数据
      currentPage: 1, //当前页码
      tabLoading: false, //tabloading
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
      // 异常记录
      abnormalRecord: () => {},
    })

    // 按钮数据源
    const btnState = reactive({
      dialogVisible: false, //是否显示新增弹窗
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      // 详情
      detailsClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '房源信息:白领精致房9304' //弹窗头部标题
        btnState.confirmDisplay = false //隐藏确定和取消按钮
      },
      // 弹窗确定按钮
      onConfirm: () => {
        console.log('弹窗确定')
        btnState.dialogVisible = false //隐藏弹窗
        proxy.$message.success('发布成功')
      },
    })

    // 详情弹窗数据源
    const detailsState = reactive({
      // 授权记录数据
      authorizationState: {
        WmTableData: [
          {
            WmTableNo: '1', //表号
            WmAddress: '白领101', //地址
            WmTenant: '李思思', //租户
            WmTableNumber: '111', //表数
            WmMoney: '202', //金额
            WmMeterReading: '2022-02-28 ', //抄表时间
            WmMeterReader: '管理员', //抄表人
          },
          {
            WmTableNo: '1', //表号
            WmAddress: '白领101', //地址
            WmTenant: '李思思', //租户
            WmTableNumber: '111', //表数
            WmMoney: '202', //金额
            WmMeterReading: '2022-02-28 ', //抄表时间
            WmMeterReader: '管理员', //抄表人
          },
        ],
      },
    })
    return {
      ...toRefs(form), //表单数据
      ...toRefs(tableData), //表格数据
      ...toRefs(btnState), //按钮数据源
      ...toRefs(detailsState), //详情弹窗数据源
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
    margin-bottom: 13px;
    .listingNNumber {
      ::v-deep(.el-input) {
        width: 300px;
      }
    }
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

  // 详情
  .detailsMain {
    height: 60vh;
    // 详情弹窗 头部
    .detailsHeader {
      display: flex;
      align-items: center;
      border: 1px solid rgba(187, 187, 187, 100);
      padding: 35px 35px 25px;
      border-radius: 10px;
      position: relative;
      .headerTitle {
        position: absolute;
        width: 80vw;
        left: 0px;
        top: 8px;
        font-size: 14px;
        background-color: #ff7c00;
        border-radius: 0px 10px 10px 0px;
        width: 43px;
        height: 24px;
        box-sizing: border-box;
        padding: 0 0 2px 0;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lockIcon {
        font-size: 32px;
      }
      ul {
        display: flex;
        align-items: center;
        li {
          list-style: none;
          margin-left: 34px;
        }
        li p {
          color: #101010;
        }
        li div {
          color: #979797;
          margin-top: 10px;
        }
      }
      .btnBox {
        flex: 1;
        display: flex;
        justify-content: end;
      }
    }
    .detailsBox {
      .header {
        display: flex;
        align-items: center;
        margin: 27px 0 15px;
        div:nth-of-type(2) {
          margin-left: 25px;
        }
      }
      // 表格
      .detailsTable {
        ::v-deep(.is-active) {
          color: #ff7c00;
        }
        ::v-deep(.el-tabs__item):hover {
          color: #ff7c00;
        }
        ::v-deep(.el-tabs__nav-wrap::after) {
          position: static;
        }
        ::v-deep(.el-tabs__active-bar) {
          display: none;
        }
      }
    }
  }
}
</style>
