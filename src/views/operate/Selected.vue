<!-- 运营管理 > 精选管理页面 -->
<template>
  <div class="box">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      color="#ff7c00"
    >
      <el-tab-pane label="轮播图" name="rotationMap">
        <!-- 表单 -->
        <el-row class="form" :gutter="20">
          <el-form
            style="width: 100%"
            :inline="true"
            :model="RmForm"
            class="demo-form-inline"
          >
            <el-col :span="10" class="listingNNumber">
              <el-form-item label="模块">
                <el-select
                  v-model="RmForm.modularValue"
                  placeholder="请选择模块"
                >
                  <el-option
                    v-for="item in RmForm.modularOption"
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
                <el-select v-model="RmForm.stateValue" placeholder="请选择状态">
                  <el-option
                    v-for="item in RmForm.stateOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
              </div>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-form-item>
                <div>
                  <el-button type="primary" @click="RmForm.RmAddNewlyClick">
                    新增
                  </el-button>
                  <el-button type="primary" @click="RmForm.RmAddNewlyClick">
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
            v-loading="RmTableData.tabLoading"
            class="table"
            :data="RmTableData.table"
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" />
            <el-table-column
              prop="imgExhibition"
              label="图片展示"
              min-width="100"
            />
            <el-table-column prop="modular" label="模块" />
            <el-table-column prop="publisher" label="发布人" />
            <el-table-column prop="releaseTime" label="发布日期" />
            <el-table-column prop="state" label="状态">
              <template #default="scope">
                {{ scope.row.state === 1 ? '下架' : '删除' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="
                    tipClick(
                      scope.row.state === 1 ? 'published' : 'OffTheShelf'
                    )
                  "
                >
                  {{ scope.row.state === 1 ? '下架' : '删除' }}
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
      </el-tab-pane>
      <el-tab-pane label="为你推荐" name="recommend">
        <!-- 表单 -->
        <el-row class="form" :gutter="20">
          <el-form
            style="width: 100%"
            :inline="true"
            :model="TjForm"
            class="demo-form-inline"
          >
            <el-col :span="10" class="listingNNumber">
              <el-form-item label="模块">
                <el-select
                  v-model="TjForm.modularValue"
                  placeholder="请选择模块"
                >
                  <el-option
                    v-for="item in TjForm.modularOption"
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
                <el-select v-model="TjForm.stateValue" placeholder="请选择状态">
                  <el-option
                    v-for="item in TjForm.stateOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
              </div>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-form-item>
                <div>
                  <el-button type="primary" @click="TjForm.TjAddNewlyClick">
                    新增
                  </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <!-- 表格 -->
        <div class="tableBox">
          <el-table
            v-loading="TjTableData.tabLoading"
            class="table"
            :data="TjTableData.table"
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" />
            <el-table-column
              prop="imgExhibition"
              label="图片展示"
              min-width="100"
            />
            <el-table-column prop="modular" label="模块" />
            <el-table-column prop="publisher" label="发布人" />
            <el-table-column prop="releaseTime" label="发布日期" />
            <el-table-column prop="state" label="状态">
              <template #default="scope">
                {{ scope.row.state === 1 ? '下架' : '删除' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="
                    tipClick(
                      scope.row.state === 1 ? 'published' : 'OffTheShelf'
                    )
                  "
                >
                  {{ scope.row.state === 1 ? '下架' : '删除' }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="paginations">
            <div class="total">共{{ TjTableData.total }}条数据</div>
            <el-pagination
              v-model:currentPage="TjTableData.currentPage"
              v-model:page-size="TjTableData.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="sizes, prev, pager, next"
              :total="TjTableData.total"
              @size-change="TjTableData.handleSizeChange"
              @current-change="TjTableData.handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="优选房型" name="preferred">
        <!-- 表单 -->
        <el-row class="form" :gutter="20">
          <el-form
            style="width: 100%"
            :inline="true"
            :model="PfForm"
            class="demo-form-inline"
          >
            <el-col :span="10" class="listingNNumber">
              <el-form-item label="模块">
                <el-select
                  v-model="PfForm.modularValue"
                  placeholder="请选择模块"
                >
                  <el-option
                    v-for="item in PfForm.modularOption"
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
                <el-select v-model="PfForm.stateValue" placeholder="请选择状态">
                  <el-option
                    v-for="item in PfForm.stateOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
              </div>
            </el-col>
            <el-col :span="4" class="btnBox">
              <el-form-item>
                <div>
                  <el-button type="primary" @click="PfForm.PfAddNewlyClick">
                    新增
                  </el-button>
                  <el-button>删除</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <!-- 表格 -->
        <div class="tableBox">
          <el-table
            v-loading="PfTableData.tabLoading"
            class="table"
            :data="PfTableData.table"
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" />
            <el-table-column
              prop="imgExhibition"
              label="图片展示"
              min-width="100"
            />
            <el-table-column prop="modular" label="模块" />
            <el-table-column prop="publisher" label="发布人" />
            <el-table-column prop="releaseTime" label="发布日期" />
            <el-table-column prop="state" label="状态">
              <template #default="scope">
                {{ scope.row.state === 1 ? '下架' : '删除' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="
                    tipClick(
                      scope.row.state === 1 ? 'published' : 'OffTheShelf'
                    )
                  "
                >
                  {{ scope.row.state === 1 ? '下架' : '删除' }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="paginations">
            <div class="total">共{{ PfTableData.total }}条数据</div>
            <el-pagination
              v-model:currentPage="PfTableData.currentPage"
              v-model:page-size="PfTableData.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="sizes, prev, pager, next"
              :total="PfTableData.total"
              @size-change="PfTableData.handleSizeChange"
              @current-change="PfTableData.handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 一级弹窗 -->
    <Dialog
      v-model:dialogVisible="dialogVisible"
      :confirmDisplay="confirmDisplay"
      :title="dialogTitle"
      @on-confirm="onConfirm"
    >
      <!-- 下架 -->
      <div v-show="dialogType === 'published'" class="publishedMain">
        <div class="publishedTip">
          <svg-icon
            style="font-size: 20px; margin: 0px 16px 0 0"
            name="checkMark"
          ></svg-icon>
          <div>确认要下架该信息?</div>
        </div>
        <div class="describe">下架该信息,手机用户端将同步下架</div>
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
      <div v-show="dialogType === 'addNewly'" class="addNewlyMain">
        <el-radio-group v-model="RmForm.addNewlyValue" class="radioGroup">
          <el-radio :label="1">房源录入</el-radio>
          <el-radio :label="2">门店录入</el-radio>
          <el-radio :label="3">保洁服务</el-radio>
          <el-radio :label="4">活动管理</el-radio>
          <el-radio :label="5">党建管理</el-radio>
        </el-radio-group>
      </div>
    </Dialog>

    <!-- 二级弹窗 -->
    <Dialog
      custom-class="anbc"
      v-model:dialogVisible="twoDialogVisible"
      :confirmDisplay="twoConfirmDisplay"
      :title="twoDialogTitle"
      successBtn="发布"
      top="20vh"
      @on-confirm="twoOnConfirm"
    >
      <!-- 表格配套设施 -->
      <div v-show="twoIsDialogType === 'choiceRoom'" class="choiceRoomMain">
        <div class="tableBox">
          <el-table
            class="table"
            :data="RmTableData.dialogTable"
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" />
            <el-table-column
              prop="roomExhibition"
              label="房源展示"
              min-width="100"
            />
            <el-table-column prop="roomName" label="房源名称" />
            <el-table-column prop="roomPrice" label="价格" />
            <el-table-column prop="roomMatching" label="配套设施" />
          </el-table>
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
    //   tabs数据源
    const tabsState = reactive({
      activeName: 'rotationMap', //tabs默认选中
      handleClick: tab => {},
    })

    // 轮播图区域数据源
    const rotationMap = reactive({
      //   表单数据
      RmForm: {
        //模块值
        modularValue: '',
        //模块option
        modularOption: [
          {
            label: '模块1',
            value: '1',
          },
          {
            label: '模块2',
            value: '2',
          },
        ],
        //状态值
        stateValue: '',
        //状态option
        stateOption: [
          {
            label: '状态1',
            value: '1',
          },
          {
            label: '状态2',
            value: '2',
          },
        ],
        // 新增筛选框的值
        addNewlyValue: 1,
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
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 1, //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 2, //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 1, //状态
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

    // 为你推荐区域数据源
    const recommend = reactive({
      //   表单数据
      TjForm: {
        modularValue: '', //模块值
        modularOption: [
          {
            label: '模块1',
            value: '1',
          },
          {
            label: '模块2',
            value: '2',
          },
        ], //模块option
        stateValue: '', //状态值
        stateOption: [
          {
            label: '状态1',
            value: '1',
          },
          {
            label: '状态2',
            value: '2',
          },
        ], //状态option
        // 点击新增
        TjAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增选择' //显示弹窗
          btnState.dialogType = 'addNewly' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
        },
      },
      // 表格数据
      TjTableData: {
        table: [
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 'A类型', //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 'A类型', //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 'A类型', //状态
          },
        ],
        tabLoading: false, //是否加载loading
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
          recommend.TjTableData.tabLoading = true
          setTimeout(() => {
            recommend.TjTableData.tabLoading = false
          }, 1000)
        },
        // 页码改变时触发
        handleCurrentChange: val => {
          console.log(`current page: ${val}`)
          recommend.TjTableData.tabLoading = true
          setTimeout(() => {
            recommend.TjTableData.tabLoading = false
          }, 1000)
        },
      },
    })

    // 优选房型区域数据源
    const preferred = reactive({
      //   表单数据
      PfForm: {
        modularValue: '', //模块值
        modularOption: [
          {
            label: '模块1',
            value: '1',
          },
          {
            label: '模块2',
            value: '2',
          },
        ], //模块option
        stateValue: '', //状态值
        stateOption: [
          {
            label: '状态1',
            value: '1',
          },
          {
            label: '状态2',
            value: '2',
          },
        ], //状态option
        // 点击新增
        PfAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增选择' //显示弹窗
          btnState.dialogType = 'addNewly' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
        },
      },
      // 表格数据
      PfTableData: {
        table: [
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 'A类型', //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 'A类型', //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: 'A类型', //状态
          },
        ],
        tabLoading: false, //是否加载loading
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
          preferred.PfTableData.tabLoading = true
          setTimeout(() => {
            preferred.PfTableData.tabLoading = false
          }, 1000)
        },
        // 页码改变时触发
        handleCurrentChange: val => {
          console.log(`current page: ${val}`)
          preferred.PfTableData.tabLoading = true
          setTimeout(() => {
            preferred.PfTableData.tabLoading = false
          }, 1000)
        },
      },
    })

    // 按钮数据源
    const btnState = reactive({
      dialogVisible: false, //是否显示弹窗
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      dialogType: '', //弹窗类型  published/下架     OffTheShelf/删除  addNewly/新增
      // 二级弹窗数据
      twoIsDialogType: '', //检查二级弹窗类型  choiceRoom房源选择
      twoDialogVisible: false, //二级弹窗 - 是否显示弹窗
      twoConfirmDisplay: true, //二级弹窗 - 是否显示弹窗的确定、取消按钮
      twoDialogTitle: '', //二级弹窗头部标题
      // 下架/删除(弹窗)
      tipClick: state => {
        console.log(state)
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogType = state === 1 ? 'published' : 'OffTheShelf' //弹窗类型
        btnState.confirmDisplay = true //显示确定和取消按钮
      },
      // 点击选择弹出表格
      onConfirm: () => {
        console.log(btnState.dialogType) //弹窗类型
        console.log(tabsState.activeName) //rotationMap轮播图   recommend为你推荐   preferred优选房型
        if (btnState.dialogType === 'addNewly') {
          //新增
          // 选择好房源表格列表
          btnState.twoDialogVisible = true //显示弹窗
          btnState.twoIsDialogType = 'choiceRoom' //弹窗类型
          btnState.twoDialogTitle = '' //弹窗头部标题
        } else if (btnState.dialogType === 'published') {
          //下架
          console.log('请求下架')
          btnState.dialogVisible = false
          proxy.$message.success('下架成功')
        } else if (btnState.dialogType === 'OffTheShelf') {
          //删除
          console.log('请求删除')
          btnState.dialogVisible = false
          proxy.$message.success('删除成功')
        }
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
      ...toRefs(rotationMap), //轮播图数据源
      ...toRefs(recommend), // 为你推荐数据源
      ...toRefs(preferred), // 优选房型数据源
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
