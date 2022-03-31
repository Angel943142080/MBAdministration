<!-- 设备管理 > 智能门锁页面 -->
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
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="roomName" label="房源名称" min-width="200" />
        <el-table-column prop="tenantName" label="租户姓名" min-width="200" />
        <el-table-column prop="tenantPhone" label="租户电话" min-width="200" />
        <el-table-column
          prop="equipmentName"
          label="设备名称"
          min-width="200"
        />
        <el-table-column
          prop="MACAddress"
          label="MAC地址/编码"
          min-width="200"
        />
        <el-table-column label="操作" fixed="right" width="200">
          <template #default>
            <el-button type="text" size="small" @click="detailsClick">
              详情
            </el-button>
            <el-button type="text" size="small" @click="abnormalRecord">
              异常记录
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
    <!-- 一级弹窗 -->
    <Dialog
      v-model:dialogVisible="dialogVisible"
      :confirmDisplay="confirmDisplay"
      :title="dialogTitle"
      top="15vh"
      width="80%"
      @on-confirm="oneOnConfirm"
    >
      <!-- 异常记录 -->
      <div v-show="isDialogType === 'abnormal'" class="abnormalMain">
        <!-- 筛选表单区域 -->
        <div class="abnormalHeader">
          <el-row :gutter="10">
            <el-col :span="3">
              <label>授权类型</label>
            </el-col>
            <el-col :span="5">
              <el-select
                v-model="authorizationValue"
                placeholder="请选择授权类型"
              >
                <el-option
                  v-for="item in authorizationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <label>授权时间</label>
            </el-col>
            <el-col :span="9">
              <el-date-picker
                v-model="authorizationTime"
                type="datetimerange"
                range-separator="-"
                start-placeholder="起始时间"
                end-placeholder="截止时间"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button @click="abnormalTableChange">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 异常记录表格 -->
        <el-table
          class="abnormalTable"
          ref="singleTableRef"
          :data="abnormalTable"
          highlight-current-row
          style="width: 100%"
          border
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          @current-change="abnormalTableChange"
        >
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column
            property="abnormalId"
            label="异常ID"
            min-width="120"
          />
          <el-table-column
            property="abnormaCategory"
            label="异常类别"
            min-width="120"
          />
          <el-table-column property="abnormaDescribe" label="异常描述" />
          <el-table-column
            property="abnormaTime"
            label="异常记录时间"
            min-width="120"
          />
        </el-table>
      </div>

      <!-- 详情 -->
      <div v-show="isDialogType === 'details'" class="detailsMain">
        <div class="detailsHeader">
          <div class="headerTitle">在线</div>
          <div>
            <svg-icon class="lockIcon" name="lock" />
          </div>
          <div>
            <ul>
              <li>云丁智能门锁</li>
              <li>电量:94%</li>
              <li>门锁序列号:LKJI2398774984476486</li>
              <li>网关状态:离线</li>
            </ul>
            <ul>
              <li>开锁方式</li>
              <li>
                <svg-icon style="font-size: 14px" name="bluetooth" />
                <!-- <svg-icon style="font-size:14px" name="selectBluetooth" /> -->
                <span>蓝牙开锁</span>
              </li>
              <li>
                <!-- <svg-icon style="font-size: 17px" name="doorLock" /> -->
                <svg-icon style="font-size: 17px" name="selectDoorLock" />
                <span>密码开锁</span>
              </li>
              <li>
                <svg-icon style="font-size: 17px" name="longRange" />
                <!-- <svg-icon style="font-size: 17px" name="selectLongRange" /> -->
                <span>远程开锁</span>
              </li>
              <li>
                <svg-icon style="font-size: 17px" name="eye" />
                <!-- <svg-icon style="font-size: 17px" name="selectEye" /> -->
                <span>临时密码</span>
              </li>
            </ul>
          </div>
          <div class="btnBox">
            <el-button @click="passwordAhState.passwordAhClick">
              密码授权
            </el-button>
            <el-button>解绑</el-button>
          </div>
        </div>
        <!-- tabs和表格数据 -->
        <el-tabs
          v-model="detailsActiveName"
          class="demo-tabs detailsTable"
          @tab-click="detailsHandleClick"
        >
          <el-tab-pane label="授权记录" name="authorization">
            <!-- 头部筛选表单 -->
            <el-row class="authorizationForm">
              <el-form
                style="width: 100%"
                :inline="true"
                :model="authorizationState"
                class="demo-form-inline"
              >
                <el-col :span="5">
                  <el-form-item label="状态">
                    <el-select
                      v-model="authorizationState.AhStateValue"
                      placeholder="请选择状态"
                    >
                      <el-option
                        v-for="item in authorizationState.AhStateOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="授权类型">
                    <el-select
                      v-model="authorizationState.AhTypeValue"
                      placeholder="请选择授权类型"
                    >
                      <el-option
                        v-for="item in authorizationState.AhTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="密码类型">
                    <el-select
                      v-model="authorizationState.AhPasswordValue"
                      placeholder="请选择密码类型"
                    >
                      <el-option
                        v-for="item in authorizationState.AhPasswordOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" style="margin-left: 20px">
                  <el-input
                    v-model="authorizationState.AhInputValue"
                    placeholder="请输入姓名、电话"
                  ></el-input>
                </el-col>
                <el-col class="btnBox">
                  <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">时间</el-button>
                    <el-button type="primary" @click="exportClick">
                      导出
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <!-- table -->
            <el-table
              :data="authorizationState.AhTableData"
              style="width: 100%"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column prop="AhState" label="状态" min-width="180" />
              <el-table-column prop="AhType" label="授权类型" min-width="180" />
              <el-table-column
                prop="AhPeople"
                label="被授权人"
                min-width="180"
              />
              <el-table-column
                prop="AhPeoplePhone"
                label="被授权人电话"
                min-width="180"
              />
              <el-table-column
                prop="AhTerm"
                label="授权期限 "
                min-width="180"
              />
              <el-table-column
                prop="passwordType"
                label="密码类型"
                min-width="180"
              />
              <el-table-column
                prop="Authorizer"
                label="授权人"
                min-width="180"
              />
              <el-table-column prop="AhTime" label="授权时间" />
              <el-table-column label="操作" width="200">
                <template #default>
                  <el-button
                    type="text"
                    size="small"
                    @click="authorizationState.AhDeleteClick"
                  >
                    删除
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="authorizationState.AhFrozenClick"
                  >
                    冻结
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="authorizationState.AhModifyClick"
                  >
                    修改
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="开门记录" name="openDoor">
            <!-- 头部筛选表单 -->
            <el-row class="openDoorForm">
              <el-form
                style="width: 100%"
                :inline="true"
                :model="openDoorState"
                class="demo-form-inline"
              >
                <el-col :span="5">
                  <el-form-item label="授权类型">
                    <el-select
                      v-model="openDoorState.OpTypeValue"
                      placeholder="请选择授权类型"
                    >
                      <el-option
                        v-for="item in openDoorState.OpTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="开锁方式">
                    <el-select
                      v-model="openDoorState.OpUnlock"
                      placeholder="请选择开锁方式"
                    >
                      <el-option
                        v-for="item in openDoorState.OpUnlockOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" style="margin-left: 20px">
                  <el-input
                    v-model="openDoorState.OpInputValue"
                    placeholder="请输入姓名、电话"
                  ></el-input>
                </el-col>
                <el-col :span="4" class="btnBox">
                  <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">时间</el-button>
                    <el-button type="primary" @click="exportClick">
                      导出
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <!-- table -->
            <el-table
              :data="openDoorState.OpTableData"
              style="width: 100%"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column prop="OpType" label="授权类型" min-width="180" />
              <el-table-column prop="OpPeople" label="开锁人" min-width="180" />
              <el-table-column
                prop="OpPeoplePhone"
                label="开锁人电话"
                min-width="180"
              />
              <el-table-column
                prop="OpPasswordType"
                label="开门方式"
                min-width="180"
              />
              <el-table-column prop="OpTime" label="开锁时间" />
              <el-table-column label="操作" width="200">
                <template #default>
                  <el-button type="text" size="small" @click="deleteClick">
                    删除
                  </el-button>
                  <el-button type="text" size="small" @click="deleteClick">
                    冻结
                  </el-button>
                  <el-button type="text" size="small" @click="seeClick">
                    修改
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="租户修改密码记录" name="modifyPassword">
            <!-- 头部筛选表单 -->
            <el-row class="modifyPsForm">
              <el-form
                style="width: 100%"
                :inline="true"
                :model="modifyPsState"
                class="demo-form-inline"
              >
                <el-col :span="5" style="margin-left: 20px">
                  <el-input
                    v-model="modifyPsState.MdInputValue"
                    placeholder="请输入姓名、电话"
                  ></el-input>
                </el-col>
                <el-col :span="4" class="btnBox">
                  <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">时间</el-button>
                    <el-button type="primary" @click="exportClick">
                      导出
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <!-- table -->
            <el-table
              :data="modifyPsState.MdTableData"
              style="width: 100%"
              :header-cell-style="{ textAlign: 'center' }"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column prop="MdName" label="姓名" min-width="180" />
              <el-table-column prop="MdPhone" label="电话" min-width="180" />
              <el-table-column prop="MdTime" label="修改时间" min-width="180" />
              <el-table-column label="操作" width="200">
                <template #default>
                  <el-button
                    type="text"
                    size="small"
                    @click="passwordAhState.psDeleteClick"
                  >
                    删除
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="passwordAhState.psFrozenClick"
                  >
                    冻结
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="passwordAhState.psModifyClick"
                  >
                    修改
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="临时密码获取记录" name="temporaryPassword">
            临时密码获取记录
          </el-tab-pane>
        </el-tabs>
      </div>
    </Dialog>

    <!-- 二级弹窗 -->
    <!-- width="80%" -->
    <Dialog
      custom-class="anbc"
      v-model:dialogVisible="twoDialogVisible"
      :confirmDisplay="twoConfirmDisplay"
      :title="twoDialogTitle"
      top="30vh"
      @on-confirm="twoOnConfirm"
    >
      <!-- 密码授权弹窗 -->
      <div v-show="twoIsDialogType === 'twoPassword'" class="passwordAhMain">
        <el-row justify="center" style="margin-top: 0px">
          <el-col :span="4">
            <label>授权类型</label>
          </el-col>
          <el-col :span="15">
            <el-select
              v-model="passwordAhState.AhType"
              placeholder="请选择授权类型"
            >
              <el-option
                v-for="item in passwordAhState.AhTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>密码</label>
          </el-col>
          <el-col :span="15">
            <el-select
              v-model="passwordAhState.AhPasswordType"
              placeholder="密码类型"
            >
              <el-option
                v-for="item in passwordAhState.AhPasswordOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>授权时间</label>
          </el-col>
          <el-col :span="15">
            <el-date-picker
              v-model="passwordAhState.AhTime"
              type="datetimerange"
              range-separator="-"
              start-placeholder="起始时间"
              end-placeholder="截止时间"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>被授权人姓名</label>
          </el-col>
          <el-col :span="15">
            <el-input
              v-model="passwordAhState.AhName"
              placeholder="请输入被授权人姓名"
            ></el-input>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="4">
            <label>电话</label>
          </el-col>
          <el-col :span="15">
            <el-input
              v-model="passwordAhState.AhTelephone"
              placeholder="请输入电话"
            ></el-input>
          </el-col>
        </el-row>
      </div>

      <!-- 删除授权 -->
      <div v-show="twoIsDialogType === 'twoDeleteClick'" class="twoDeleteMain">
        确定删除该授权吗
      </div>
      <!-- 冻结授权 -->
      <div v-show="twoIsDialogType === 'twoFrozenClick'" class="twoDeleteMain">
        确定冻结该授权吗
      </div>
      <!-- 修改授权时间 -->
      <div v-show="twoIsDialogType === 'twoModifyClick'" class="twoModifyMain">
        <label style="margin-right: 20px">授权时间</label>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="-"
          start-placeholder="起始时间"
          end-placeholder="截止时间"
        ></el-date-picker>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'

export default defineComponent({
  setup() {
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
          MACAddress: 'e3dd83b3421d29deeea799ad641bf112', //MAC地址/编码
        },
        {
          roomName: '白领精致房9304', //房源名称
          tenantName: '李四四', //租户姓名
          tenantPhone: '18369635623', //租户电话
          equipmentName: '云丁', //设备名称
          MACAddress: 'e3dd83b3421d29deeea799ad641bf112', //MAC地址/编码
        },
        {
          roomName: '白领精致房9304', //房源名称
          tenantName: '刘六六', //租户姓名
          tenantPhone: '18369635623', //租户电话
          equipmentName: '云丁', //设备名称
          MACAddress: 'e3dd83b3421d29deeea799ad641bf112', //MAC地址/编码
        },
      ], //表格数据
      tabLoading: false, //tabloading
      currentPage: 1, //当前页码
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
      // 一级弹窗数据
      isDialogType: '', //检查弹窗类型  abnormal 异常记录 details 详情弹窗
      dialogVisible: false, //是否显示弹窗
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      // 二级弹窗数据
      twoIsDialogType: '', //检查二级弹窗类型  twoPassword密码授权弹窗
      twoDialogVisible: false, //二级弹窗 - 是否显示弹窗
      twoConfirmDisplay: true, //二级弹窗 - 是否显示弹窗的确定、取消按钮
      twoDialogTitle: '', //二级弹窗头部标题
      // 异常记录
      abnormalRecord: () => {
        btnState.isDialogType = 'abnormal' //异常记录弹窗
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '异常记录' //异常记录
        btnState.confirmDisplay = false //隐藏确定和取消按钮
        // 获取异常记录数据
        newRuleState.authorizationValue = '' //授权类型
        newRuleState.authorizationOptions = [
          {
            value: 'Option1',
            label: 'A类型',
          },
          {
            value: 'Option2',
            label: 'B类型',
          },
        ] //授权类型option
        newRuleState.authorizationTime = '' //授权时间
        // 异常记录表格数据
        newRuleState.abnormalTable = [
          {
            abnormalId: '164523156321',
            abnormaCategory: '电量更新',
            abnormaDescribe: '—',
            abnormaTime: '2016-05-03',
          },
          {
            abnormalId: '164523156321',
            abnormaCategory: '电量更新',
            abnormaDescribe: '—',
            abnormaTime: '2016-05-03',
          },
          {
            abnormalId: '164523156321',
            abnormaCategory: '电量更新',
            abnormaDescribe: '—',
            abnormaTime: '2016-05-03',
          },
          {
            abnormalId: '164523156321',
            abnormaCategory: '电量更新',
            abnormaDescribe: '—',
            abnormaTime: '2016-05-03',
          },
        ]
      },
      // 详情
      detailsClick: () => {
        btnState.isDialogType = 'details' //详情记录弹窗
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '房源信息:白领精致房9304' //弹窗头部标题
        btnState.confirmDisplay = false //隐藏确定和取消按钮
      },
      oneOnConfirm: () => {
        console.log('一级弹窗')
      },
      // 二级弹窗确定事件
      twoOnConfirm: () => {
        console.log('二级弹窗')
      },
    })
    //  异常记录数据
    const newRuleState = reactive({
      authorizationValue: '', //授权类型
      authorizationOptions: [
        {
          value: 'Option1',
          label: 'A类型',
        },
        {
          value: 'Option2',
          label: 'B类型',
        },
      ], //授权类型option
      authorizationTime: '', //授权时间
      // 异常记录表格数据
      abnormalTable: [
        {
          abnormalId: '164523156321',
          abnormaCategory: '电量更新',
          abnormaDescribe: '—',
          abnormaTime: '2016-05-03',
        },
        {
          abnormalId: '164523156321',
          abnormaCategory: '电量更新',
          abnormaDescribe: '—',
          abnormaTime: '2016-05-03',
        },
        {
          abnormalId: '164523156321',
          abnormaCategory: '电量更新',
          abnormaDescribe: '—',
          abnormaTime: '2016-05-03',
        },
        {
          abnormalId: '164523156321',
          abnormaCategory: '电量更新',
          abnormaDescribe: '—',
          abnormaTime: '2016-05-03',
        },
      ],
      // 查询异常记录表格
      abnormalTableChange: val => {
        console.log(val)
      },
    })
    // 详情弹窗数据源
    const detailsState = reactive({
      detailsActiveName: 'authorization', //tabs当前页面值
      // 点击tab
      detailsHandleClick: tab => {
        console.log(tab)
      },
      // 导出
      exportClick: () => {
        console.log(detailsState.detailsActiveName, '导出')
      },
      // 密码授权弹窗数据源
      passwordAhState: {
        AhType: '', //授权类型
        AhTypeOption: [
          {
            value: 'Option1',
            label: '授权类型A',
          },
          {
            value: 'Option2',
            label: '授权类型B',
          },
        ], //授权类型option
        AhPasswordType: '', //密码类型
        AhPasswordOption: [
          {
            value: 'Option1',
            label: '密码类型A',
          },
          {
            value: 'Option2',
            label: '密码类型B',
          },
        ], //密码类型option
        AhTime: '', //授权时间
        AhName: '', //被授权人姓名
        AhTelephone: '', //被授权人电话
        // 显示密码授权二级弹窗事件
        passwordAhClick: () => {
          btnState.twoIsDialogType = 'twoPassword' //显示密码授权弹窗
          btnState.twoDialogVisible = true //二级弹窗 - 显示弹窗
          btnState.twoConfirmDisplay = true //二级弹窗 - 显示弹窗的确定、取消按钮
          btnState.twoDialogTitle = '密码授权' //二级弹窗 - 头部标题
        },
      },
      // 授权记录数据源
      authorizationState: {
        AhStateValue: '', //状态值
        AhStateOption: [
          {
            label: '状态A',
            value: 1,
          },
          {
            label: '状态B',
            value: 2,
          },
        ], //状态option
        AhTypeValue: '', //授权类型值
        AhTypeOptions: [
          {
            label: '授权类型A',
            value: 1,
          },
          {
            label: '授权类型B',
            value: 2,
          },
        ], //授权类型option
        AhPasswordValue: '', //密码类型值
        AhPasswordOptions: [
          {
            label: '密码A',
            value: 1,
          },
          {
            label: '密码B',
            value: 2,
          },
        ], //密码类型option
        AhInputValue: '', //姓名、手机号搜索
        AhTableData: [
          {
            AhState: '有效', //状态
            AhType: '入住', //授权类型
            AhPeople: '李思思', //被授权人
            AhPeoplePhone: '18369635623', //被授权人电话
            AhTerm: '2021.8.13 14:20  -  2021.8.31 00:00', //授权期限
            passwordType: '时长密码 ', //密码类型
            Authorizer: '张三三', //授权人
            AhTime: '2021.7.05 00:15', //授权时间
          },
          {
            AhState: '过期',
            AhType: '其他',
            AhPeople: '网思思',
            AhPeoplePhone: '18369635624',
            AhTerm: '永久有效',
            passwordType: '管理员密码',
            Authorizer: '',
            AhTime: '2021.6.05 00:15',
          },
        ],

        // 删除授权
        AhDeleteClick: () => {
          btnState.twoIsDialogType = 'twoDeleteClick' //显示密码授权弹窗
          btnState.twoDialogVisible = true //二级弹窗 - 显示弹窗
          btnState.twoConfirmDisplay = true //二级弹窗 - 显示弹窗的确定、取消按钮
          btnState.twoDialogTitle = '删除' //二级弹窗 - 头部标题
        },
        // 冻结授权
        AhFrozenClick: () => {
          btnState.twoIsDialogType = 'twoFrozenClick' //显示密码授权弹窗
          btnState.twoDialogVisible = true //二级弹窗 - 显示弹窗
          btnState.twoConfirmDisplay = true //二级弹窗 - 显示弹窗的确定、取消按钮
          btnState.twoDialogTitle = '冻结' //二级弹窗 - 头部标题
        },
        // 修改授权
        AhModifyClick: () => {
          btnState.twoIsDialogType = 'twoModifyClick' //显示密码授权弹窗
          btnState.twoDialogVisible = true //二级弹窗 - 显示弹窗
          btnState.twoConfirmDisplay = true //二级弹窗 - 显示弹窗的确定、取消按钮
          btnState.twoDialogTitle = '修改' //二级弹窗 - 头部标题
        },
      },
      // 开门记录数据源
      openDoorState: {
        OpTypeValue: '', //授权类型值
        OpTypeOptions: [
          {
            label: '授权类型A',
            value: 1,
          },
          {
            label: '授权类型B',
            value: 2,
          },
        ], //授权类型option
        OpUnlock: '', //开锁类型值
        OpUnlockOptions: [
          {
            label: '密码A',
            value: 1,
          },
          {
            label: '密码B',
            value: 2,
          },
        ], //开锁类型option
        OpInputValue: '', //姓名、手机号搜索
        // 开门记录表格
        OpTableData: [
          {
            OpType: '入住', //授权类型
            OpPeople: '李思思', //开锁人
            OpPeoplePhone: '18369635623', //开锁人电话
            OpPasswordType: '密码 ', //开门方式
            OpTime: '2021.7.05 00:15', //开锁时间
          },
          {
            OpType: '其他',
            OpPeople: '网思思',
            OpPeoplePhone: '18369635624',
            OpPasswordType: '密码',
            OpTime: '2021.6.05 00:15',
          },
        ],
      },
      // 租户修改密码记录数据源
      modifyPsState: {
        MdInputValue: '', //姓名、手机号搜索
        // 租户修改密码表格
        MdTableData: [
          {
            MdName: '李思思', //姓名
            MdPhone: '18369635623', //电话
            MdTime: '2021.7.05 00:15', //修改时间
          },
          {
            MdName: '刘思', //姓名
            MdPhone: '18369635623', //电话
            MdTime: '2021.7.05 00:15', //修改时间
          },
        ],
      },
    })
    return {
      ...toRefs(form), //表单数据
      ...toRefs(tableData), //表格数据
      ...toRefs(btnState), //按钮数据源
      ...toRefs(newRuleState), //异常记录数据
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
    border-radius: 12px;
    padding: 35px 22px 12px 20px;
    margin-bottom: 13px;
    width: 100%;
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
  // 异常记录
  .abnormalMain {
    height: 60vh;
    .abnormalHeader {
      display: flex;
      align-items: center;
      .el-col {
        display: flex;
        align-items: center;
      }
    }
    // 异常表格
    .abnormalTable {
      margin-top: 25px;
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
          color: #979797;
          span {
            display: inline-block;
            margin-left: 3px;
          }
        }
        li:nth-of-type(1) {
          color: #101010;
        }
      }
      ul:nth-of-type(2) {
        margin-top: 13px;
        li {
          margin-left: 34px;
          flex: 1;
        }
      }
      .btnBox {
        margin-left: 26px;
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
      .btnBox {
        margin-left: 20px;
      }
    }
  }

  // 密码授权
  .passwordAhMain {
    margin: 5vh 0 10vh;
    .el-row {
      margin-top: 25px;
      .el-col:nth-of-type(1) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  // 删除授权
  .twoDeleteMain,
  .twoDeleteMain {
    text-align: center;
  }

  // 修改授权时间
  .twoModifyMain {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
