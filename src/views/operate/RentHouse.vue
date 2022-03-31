<!-- 运营管理 > 租房管理页面 -->
<template>
  <div class="box">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      color="#ff7c00"
    >
      <el-tab-pane label="企业优享" name="EnterprisePriority">
        <!-- 表单 -->
        <el-row class="form" :gutter="20">
          <el-form
            style="width: 100%"
            :inline="true"
            :model="EpForm"
            class="demo-form-inline"
          >
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="EpForm.stateValue" placeholder="请选择状态">
                  <el-option
                    v-for="item in EpForm.stateOption"
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
                  <el-button type="primary" @click="EpForm.EpAddNewlyClick">
                    新增
                  </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <!-- 列表 -->
        <div class="ulBox">
          <el-row class="ul">
            <el-col class="li" v-for="item in EpList" :key="item.id">
              <!-- 右上角 -->
              <el-popover
                placement="bottom"
                popper-class="popover"
                :width="50"
                trigger="click"
                style="width: 50px !important"
              >
                <template #reference>
                  <div class="moreBox">
                    <svg-icon name="more" class="moreIcon"></svg-icon>
                  </div>
                </template>
                <div>
                  <p @click="EpMoreSeeClick">查看</p>
                  <p>编辑</p>
                </div>
              </el-popover>
              <!-- 发布状态  0下架  1发布   2草稿 -->
              <div class="stateStyle">
                <div v-show="item.state === 0">已发布</div>
                <div v-show="item.state === 1">已下架</div>
                <div v-show="item.state === 2">草稿</div>
              </div>
              <div>
                <el-image
                  src="https://t8.baidu.com/it/u=1403410121,3250381415&fm=167&app=3000&size=w560&q=100&n=0&f=JPEG&fmt=auto?sec=1646499600&t=4db917ad087e7390e3cd60b25e136ff6"
                ></el-image>
              </div>
              <div class="content">
                <div>
                  <p>{{ item.name }}</p>
                  <p>{{ item.time }}</p>
                  <p>浏览量{{ item.browse }}</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 分页 -->
          <div class="paginations">
            <div class="total">共{{ EpPaging.total }}条数据</div>
            <el-pagination
              v-model:currentPage="EpPaging.currentPage"
              v-model:page-size="EpPaging.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="sizes, prev, pager, next"
              :total="EpPaging.total"
              @size-change="EpPaging.handleSizeChange"
              @current-change="EpPaging.handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="书生计划" name="ScholarProgram">
        <!-- 表单 -->
        <el-row class="form" :gutter="20">
          <el-form
            style="width: 100%"
            :inline="true"
            :model="SpForm"
            class="demo-form-inline"
          >
            <el-col :span="10" class="listingNNumber">
              <el-form-item label="模块">
                <el-select
                  v-model="SpForm.modularValue"
                  placeholder="请选择模块"
                >
                  <el-option
                    v-for="item in SpForm.modularOption"
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
                <el-select v-model="SpForm.stateValue" placeholder="请选择状态">
                  <el-option
                    v-for="item in SpForm.stateOption"
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
                  <el-button type="primary" @click="SpForm.SpAddNewlyClick">
                    新增
                  </el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <!-- 列表 -->
        <div class="ulBox">
          <el-row class="ul">
            <el-col class="li" v-for="item in SpList" :key="item.id">
              <!-- 右上角 -->
              <el-popover
                placement="bottom"
                popper-class="popover"
                :width="50"
                trigger="click"
                style="width: 50px !important"
              >
                <template #reference>
                  <div class="moreBox">
                    <svg-icon name="more" class="moreIcon"></svg-icon>
                  </div>
                </template>
                <div>
                  <p @click="SpMoreSeeClick">查看</p>
                  <p>编辑</p>
                </div>
              </el-popover>
              <!-- 发布状态  0下架  1发布   2草稿 -->
              <div class="stateStyle">
                <div v-show="item.state === 0">已发布</div>
                <div v-show="item.state === 1">已下架</div>
                <div v-show="item.state === 2">草稿</div>
              </div>
              <div>
                <el-image
                  src="https://t8.baidu.com/it/u=1403410121,3250381415&fm=167&app=3000&size=w560&q=100&n=0&f=JPEG&fmt=auto?sec=1646499600&t=4db917ad087e7390e3cd60b25e136ff6"
                ></el-image>
              </div>
              <div class="content">
                <div>
                  <p>{{ item.name }}</p>
                  <p>{{ item.time }}</p>
                  <p>浏览量{{ item.browse }}</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 分页 -->
          <div class="paginations">
            <div class="total">共{{ EpPaging.total }}条数据</div>
            <el-pagination
              v-model:currentPage="EpPaging.currentPage"
              v-model:page-size="EpPaging.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="sizes, prev, pager, next"
              :total="EpPaging.total"
              @size-change="EpPaging.handleSizeChange"
              @current-change="EpPaging.handleCurrentChange"
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
      successBtn="发布"
      :width="dialogWidth"
      @on-confirm="onConfirm"
    >
      <!-- 企业优享新增 -->
      <div v-show="dialogType === 'EpAddNewly'" class="EpAddNewlyMain">
        <div class="uploadLi">
          <div class="title">企业优享详情图</div>
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="FpdialogState.EphandleSuccess"
              :before-upload="FpdialogState.EpbeforeUpload"
            >
              <img
                v-if="FpdialogState.imageUrl"
                :src="FpdialogState.imageUrl"
                class="VRavatar"
              />
              <el-icon v-else class="avatar-uploader-icon">
                <plus />
              </el-icon>
            </el-upload>
          </div>
        </div>
        <!-- 企业联系手机号 -->
        <div class="TjStore">
          <div>企业联系手机号</div>
          <div>
            <el-input
              v-model="FpdialogState.EpPhoneValue"
              class="m-2"
              placeholder="请输入手机号"
              size="large"
            ></el-input>
          </div>
        </div>
      </div>

      <!-- 企业优享查看 -->
      <div v-show="dialogType === 'FpSee'" class="FpSeeMain">
        <!-- 浏览量 -->
        <el-row class="seeHeader">
          <el-col :span="6">
            <div style="line-height: 16px">浏览量</div>
            <div>112560</div>
          </el-col>
          <el-col :span="6">
            <div>企业联系手机号</div>
            <div>18532633562</div>
          </el-col>
          <el-col :span="6">
            <div>发布人</div>
            <div>张三三</div>
          </el-col>
          <el-col :span="6">
            <div style="line-height: 16px">发布时间</div>
            <div>2022-02-28</div>
          </el-col>
        </el-row>
        <!-- 企业优享详情图 -->
        <div class="Li">
          <div class="title">企业优享详情图</div>
          <div class="imgBox">
            <el-image
              v-for="(item, index) in 5"
              :key="index"
              :style="index == 0 ? 'margin-left:0px' : 'margin-left:8px'"
              src="https://t8.baidu.com/it/u=1403410121,3250381415&fm=167&app=3000&size=w560&q=100&n=0&f=JPEG&fmt=auto?sec=1646499600&t=4db917ad087e7390e3cd60b25e136ff6"
            ></el-image>
          </div>
        </div>
      </div>

      <!-- 书生计划新增 -->
      <div v-show="dialogType === 'SpAddNewly'" class="SpAddNewlyManin">
        <div class="uploadLi">
          <div class="title">书生计划详情图</div>
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="SpdialogState.SphandleSuccess"
              :before-upload="SpdialogState.SpbeforeUpload"
            >
              <img
                v-if="SpdialogState.imageUrl"
                :src="SpdialogState.imageUrl"
                class="VRavatar"
              />
              <el-icon v-else class="avatar-uploader-icon">
                <plus />
              </el-icon>
            </el-upload>
          </div>
        </div>
        <!-- 企业联系手机号 -->
        <div class="TjStore">
          <div>联系电话</div>
          <div>
            <el-input
              v-model="SpdialogState.SpPhoneValue"
              class="m-2"
              placeholder="请输入手机号"
              size="large"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 书生计划查看 -->
      <div v-show="dialogType === 'SpSee'" class="SpSeeMain">
        <!-- 浏览量 -->
        <el-row class="seeHeader">
          <el-col :span="6">
            <div style="line-height: 16px">浏览量</div>
            <div>112560</div>
          </el-col>
          <el-col :span="6">
            <div>联系电话</div>
            <div>18532633562</div>
          </el-col>
          <el-col :span="6">
            <div>发布人</div>
            <div>张三三</div>
          </el-col>
          <el-col :span="6">
            <div style="line-height: 16px">发布时间</div>
            <div>2022-02-28</div>
          </el-col>
        </el-row>
        <!-- 书生计划详情图 -->
        <div class="Li">
          <div class="title">书生计划详情图</div>
          <div class="imgBox">
            <el-image
              v-for="(item, index) in 5"
              :key="index"
              :style="index == 0 ? 'margin-left:0px' : 'margin-left:8px'"
              src="https://t8.baidu.com/it/u=1403410121,3250381415&fm=167&app=3000&size=w560&q=100&n=0&f=JPEG&fmt=auto?sec=1646499600&t=4db917ad087e7390e3cd60b25e136ff6"
            ></el-image>
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
    //  tabs数据源
    const tabsState = reactive({
      activeName: 'EnterprisePriority', //tabs默认选中
      handleClick: tab => {},
    })

    // 企业优享数据源
    const enterprise = reactive({
      //   表单数据
      EpForm: {
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
        // 点击新增
        EpAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增' //显示弹窗
          btnState.dialogType = 'EpAddNewly' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
        },
      },
      // 企业优享列表
      EpList: [
        {
          id: 1,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1, //state  0下架  1发布   2草稿
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 2,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 3,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 4,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
      ],
      // 企业优享查看
      EpMoreSeeClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '查看' //显示弹窗
        btnState.dialogType = 'FpSee' //弹窗类型
        btnState.confirmDisplay = true //显示确定和取消按钮
        btnState.dialogWidth = '50%' //设置弹窗宽度
      },
      //  企业新增弹窗数据
      FpdialogState: {
        // 上传成功后
        EphandleSuccess: () => {
          console.log('上传成功')
        },
        // 上传成功之前
        EpbeforeUpload: () => {
          console.log('上传成功之前')
        },
        imageUrl: '', //上传成功后的图片
        // 企业联系手机号
        EpPhoneValue: '',
      },
      // 分页
      EpPaging: {
        currentPage: 1, //当前页码
        pageSize: 10, //一页多少条数据
        total: 1000, //共多少条数据
        // 修改每页多少条触发
        handleSizeChange: val => {
          console.log(`${val} items per page`)
        },
        // 页码改变时触发
        handleCurrentChange: val => {
          console.log(`current page: ${val}`)
        },
      },
    })

    // 书生计划数据源
    const scholar = reactive({
      //   表单数据
      SpForm: {
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
        SpAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增' //显示弹窗
          btnState.dialogType = 'SpAddNewly' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
        },
      },
      // 书生计划列表
      SpList: [
        {
          id: 1,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1, //state  0下架  1发布   2草稿
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 2,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 3,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 4,
          name: '李四', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
      ],
      // 书生计划查看
      SpMoreSeeClick: () => {
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '查看' //显示弹窗
        btnState.dialogType = 'SpSee' //弹窗类型
        btnState.confirmDisplay = true //显示确定和取消按钮
        btnState.dialogWidth = '50%' //设置弹窗宽度
      },
      //  书生计划新增弹窗数据
      SpdialogState: {
        // 上传成功后
        SphandleSuccess: () => {
          console.log('上传成功')
        },
        // 上传成功之前
        SpbeforeUpload: () => {
          console.log('上传成功之前')
        },
        imageUrl: '', //上传成功后的图片
        // 企业联系手机号
        SpPhoneValue: '',
      },
      // 表格数据
      SpableData: {
        // 轮播图table
        table: [
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: '已发布', //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: '已下架', //状态
          },
          {
            imgExhibition: '白领精致房9304', //图片展示
            modular: '李四四', //模块
            publisher: '18369635623', //发布人
            releaseTime: '云丁', //发布日期
            state: '已发布', //状态
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
        },
        // 页码改变时触发
        handleCurrentChange: val => {
          console.log(`current page: ${val}`)
        },
      },
    })
    // 按钮数据源
    const btnState = reactive({
      dialogVisible: false, //是否显示新增弹窗
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      dialogType: '', //弹窗类型  published/已发布     OffTheShelf/已下架  addNewly/新增
      dialogWidth: '50%', //默认宽度
      // 二级弹窗数据
      twoIsDialogType: '', //检查二级弹窗类型
      twoDialogVisible: false, //二级弹窗 - 是否显示弹窗
      twoConfirmDisplay: true, //二级弹窗 - 是否显示弹窗的确定、取消按钮
      twoDialogTitle: '', //二级弹窗头部标题
      // 点击选择弹出表格
      onConfirm: () => {
        console.log(btnState.dialogType)
        btnState.dialogVisible = false //隐藏弹窗
        proxy.$message.success('OK')
      },
      // 二级弹窗确定时间
      twoOnConfirm: () => {
        console.log('二级弹窗')
      },
    })
    return {
      ...toRefs(tabsState), //tabs数据源
      ...toRefs(scholar), //书生计划数据源
      ...toRefs(enterprise), // 企业优享数据源
      ...toRefs(btnState), //按钮数据源
    }
  },
})
</script>

<style lang="scss">
// .el-popover.popover.el-popper.is-light {
//   width: 50px !important;
//   color: #f56c6c;
//   border: 1px solid #f56c6c;
// }
// .popover.el-popper.is-light .el-popper__arrow::before {
//   border: 1px solid #f56c6c;
// }
.popover {
  min-width: 50px !important;
  // .el-popover.el-popper  {
  //   width: 50px !important;
  // }
  // .el-popper{
  //   width: 50px !important;
  // }
  // ::v-deep(.el-popper) {
  //   // width: 50px !important;
  //   min-width: 50px !important;
  // }
  // ::v-deep(.el-popover) {
  //   // width: 50px !important;
  //   min-width: 50px !important;
  // }
  // .is-light {
  //   // width: 50px !important;
  //   min-width: 50px !important;
  // }
}
</style>
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
  // 表单
  .form {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 35px 22px 12px 20px;
    margin-left: 0px !important;
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
  // 表格
  .tableBox {
    background-color: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    margin-top: 12px;
    padding: 20px 20px 53px;
    height: 100%;
  }
  .ulBox {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 15px;
    margin-top: 10px;
  }
  // 列表
  .ul {
    background-color: #ffffff;
    border-radius: 15px;
    display: flex;
    .li {
      margin-left: 20px;
      flex: 1;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.4);
      position: relative;
      &.li:nth-of-type(1) {
        margin-left: 0px;
      }
      &div:nth-of-type(1) {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      // 发布状态
      .stateStyle {
        position: absolute;
        left: 0px;
        top: 12px;
        z-index: 1;
        color: #ffffff;
        div:nth-of-type(1) {
          background-color: #ff7c00;
          padding: 5px 10px 5px 10px;
          border-radius: 0px 20px 20px 0px;
        }
        div:nth-of-type(2) {
          background-color: #a8a8a8;
          padding: 5px 10px 5px 10px;
          border-radius: 0px 20px 20px 0px;
        }
        div:nth-of-type(3) {
          background-color: #3d76ff;
          padding: 5px 10px 5px 10px;
          border-radius: 0px 20px 20px 0px;
        }
      }

      // 更多ICON
      .moreBox {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: end;
        .moreIcon {
          font-size: 28px;
        }

        ul {
          background-color: #ffffff;
          padding: 7px 12px;
          border: 1px solid rgba(187, 187, 187, 100);
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 100);
          text-align: center;
          box-shadow: 0px 0px 4px 0px rgba(155, 155, 155, 100);
          li {
            margin-top: 8px;
            &:nth-of-type(1) {
              margin-top: 0px;
            }
          }
        }
      }
      .name {
        overflow: hidden;
      }

      .content {
        padding: 6px 8px;
        box-sizing: border-box;
        background-color: #ffffff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .paginations {
    .total {
      margin-bottom: 2px;
      font-size: 12px;
      color: #747579;
      margin-right: 30px;
    }
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

  // 上传文件样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 166px;
    height: 101px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #d9d9d9;
    border-radius: 8px;
  }
  // 弹窗
  // 新增企业优化详情图/新增书生计划
  .EpAddNewlyMain,
  .SpAddNewlyManin {
    .title {
      font-size: 14px;
      margin-bottom: 8px;
    }

    .uploadLi {
      box-shadow: 0px 0px 6px 0px rgba(183, 183, 183, 100);
      padding: 10px 15px 21px;
      box-sizing: border-box;
      margin-top: 12px;
      border-radius: 10px;
      &:nth-of-type(1) {
        margin-top: 0px;
      }
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    // 推荐门店
    .TjStore {
      margin-top: 12px;
      div:nth-of-type(1) {
        margin-bottom: 8px;
      }
    }
  }

  //查看
  .FpSeeMain,
  .SpSeeMain {
    .seeHeader {
      .el-col {
        display: flex;
        align-items: center;
        list-style-type: decimal;
        vertical-align: text-bottom;
        div:nth-of-type(1) {
          color: #a8a8a8;
          margin-right: 15px;
        }
      }
    }
    .Li {
      box-shadow: 0px 0px 6px 0px rgba(183, 183, 183, 100);
      padding: 10px 15px 21px;
      box-sizing: border-box;
      margin-top: 29px;
      border-radius: 10px;
      &:nth-of-type(1) {
        margin-top: 0px;
      }
      .imgBox {
        margin-top: 8px;
        display: flex;
        ::v-deep(.el-image__inner) {
          flex: 1;
        }
      }
    }
  }

  // 漫柏社区全景图新增
  .PfAddPanoramaManin {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
