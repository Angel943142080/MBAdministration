<!-- 运营管理 > 政策解读管理页面 -->
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
              <el-form-item label="标题">
                <el-input
                  v-model="RmForm.titleValue"
                  placeholder="请输入标题"
                ></el-input>
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
                  <el-button @click="RmForm.RmAddNewlyClick">删除</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <!-- 表格 -->
        <div class="tableBox">
          <!-- :sort-change="RmTableData.sortChange" -->
          <el-table
            v-loading="RmTableData.tabLoading"
            class="table"
            :data="RmTableData.table"
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
            :default-sort="{ prop: 'index', order: 'descending' }"
          >
            <el-table-column type="selection" width="55" />
            <!-- :index="RmTableData.typeIndex" -->
            <!-- :sort-method="RmTableData.sortChange" -->
            <el-table-column label="排序" sortable>
              <template #default="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="imgExhibition"
              label="图片展示"
              min-width="100"
              sortable
            />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="activityDate" label="活动日期" />
            <el-table-column prop="releaseDate" label="发布日期">
              <template #default="scope">
                <div>{{ scope.row.releaseDate }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="publisher" label="发布人" />
            <el-table-column prop="state" label="状态" />
            <el-table-column prop="numberApplicants" label="报名人数" />
            <el-table-column prop="views" label="浏览量" />
            <el-table-column label="操作" fixed="right">
              <template #default>
                <el-button
                  type="text"
                  size="small"
                  @click="RmTableData.seeClick"
                >
                  查看
                </el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">下架</el-button>
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
      <el-tab-pane label="政策要闻" name="preferred">政策要闻</el-tab-pane>
    </el-tabs>

    <!-- 一级弹窗 -->
    <Dialog
      v-model:dialogVisible="dialogVisible"
      :confirmDisplay="confirmDisplay"
      :title="dialogTitle"
      :width="dialogWidth"
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
      <!-- 轮播图新增 -->
      <div v-show="dialogType === 'RmAddNewly'" class="RmAddNewlyMain">
        <div class="content">
          <el-row>
            <el-col :span="3">链接</el-col>
            <el-col :span="15">
              <el-input
                v-model="RmAddDialogState.linkValue"
                placeholder="请输入链接"
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">标题</el-col>
            <el-col :span="15">
              <el-input
                v-model="RmAddDialogState.titleValue"
                placeholder="请输入标题"
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" style="display: flex; align-items: start">
              宣传图
            </el-col>
            <el-col :span="15">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="RmAddDialogState.LbSuccess"
                :before-upload="RmAddDialogState.LbbeforeUpload"
              >
                <img
                  v-if="RmAddDialogState.imageUrl"
                  :src="RmAddDialogState.imageUrl"
                  class="VRavatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <plus />
                </el-icon>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">排序</el-col>
            <el-col :span="15" class="releaseTime">
              <el-select
                v-model="RmAddDialogState.sortValue"
                placeholder="请选择顺序"
              >
                <el-option
                  v-for="item in RmAddDialogState.sortOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
      <!--  查看 -->
      <div v-show="dialogType === 'RmSee'" class="RmSeeMain">
        <div class="content">
          <el-row>
            <el-col :span="3" :offset="1">排序</el-col>
            <el-col :span="12" :offset="2">
              {{ RmSeeState.sortNumber }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="1">浏览量</el-col>
            <el-col :span="12" :offset="2">
              {{ RmSeeState.views }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="1">标题</el-col>
            <el-col :span="12" :offset="2">
              {{ RmSeeState.titleValue }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="1">链接</el-col>
            <el-col :span="12" :offset="2">
              {{ RmSeeState.linkValue }}
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :span="3"
              :offset="1"
              style="display: flex; align-items: start"
            >
              宣传图
            </el-col>
            <el-col :span="12" :offset="2">
              <el-image
                src="https://t8.baidu.com/it/u=1403410121,3250381415&fm=167&app=3000&size=w560&q=100&n=0&f=JPEG&fmt=auto?sec=1646499600&t=4db917ad087e7390e3cd60b25e136ff6"
              ></el-image>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="1">发布人</el-col>
            <el-col :span="12" :offset="2">{{ RmSeeState.rublisher }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="1">发布日期</el-col>
            <el-col :span="12" :offset="2" class="releaseTime">
              {{ RmSeeState.releaseDate }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="1">状态</el-col>
            <el-col :span="12" :offset="2">{{ RmSeeState.state }}</el-col>
          </el-row>
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

    // 轮播图数据源
    const rotationMap = reactive({
      //   表单数据
      RmForm: {
        //标题值
        titleValue: '',
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
        RmAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增' //显示弹窗
          btnState.dialogType = 'RmAddNewly' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
          btnState.dialogWidth = '60%' //弹窗宽度
        },
      },
      // 新增政策要闻弹窗数据
      RmAddDialogState: {
        linkValue: '', //链接
        titleValue: '', //标题
        publicityMap: [], //宣传图
        sortValue: '', //排序
        sortOption: [
          {
            label: '正序',
            value: 1,
          },
          {
            label: '倒序',
            value: 2,
          },
        ], //排序option
        imageUrl: '', //上传成功的图片
        LbSuccess: () => {},
        LbbeforeUpload: () => {},
      },
      //  查看数据
      RmSeeState: {
        sortNumber: 1, //排序
        views: '', //浏览量
        titleValue: '', //标题
        linkValue: '', //链接
        publicityMap: [], //宣传图
        rublisher: '', //发布人
        releaseDate: '', //发布日期
        state: '', //状态
      },
      // 表格数据
      RmTableData: {
        // 轮播图table
        table: [
          {
            index: 1,
            imgExhibition: '白领精致房9304', //图片展示
            title: '好丽友1', //标题
            activityDate: '2022-02-20  09:00----2022-02-28 24:00', //活动日期
            releaseDate: '2022-02-17  09:00', //发布日期
            publisher: '张三', //发布人
            state: '已发布', //状态
            numberApplicants: '56', //报名人数
            views: '2345', //浏览量
          },
          {
            index: 2,
            imgExhibition: '白领精致房9304', //图片展示
            title: '好丽友2', //标题
            activityDate: '2022-02-20  09:00----2022-02-28 24:00', //活动日期
            releaseDate: '2022-02-17  09:00', //发布日期
            publisher: '张三', //发布人
            state: '已发布', //状态
            numberApplicants: '56', //报名人数
            views: '2345', //浏览量
          },
          {
            index: 3,
            imgExhibition: '白领精致房9304', //图片展示
            title: '好丽友3', //标题
            activityDate: '2022-02-20  09:00----2022-02-28 24:00', //活动日期
            releaseDate: '2022-02-17  09:00', //发布日期
            publisher: '张三', //发布人
            state: '已发布', //状态
            numberApplicants: '56', //报名人数
            views: '2345', //浏览量
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
        currentPage: 1, //当前页码
        tabLoading: false, //tabloading
        pageSize: 10, //一页多少条数据
        total: 1000, //共多少条数据
        //查看事件
        seeClick: () => {
          console.log('查看click')
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '查看' //显示弹窗
          btnState.dialogType = 'RmSee' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
          btnState.dialogWidth = '40%' //弹窗宽度

          rotationMap.RmSeeState.sortNumber = 2 //排序
          rotationMap.RmSeeState.views = 156156 //浏览量
          rotationMap.RmSeeState.titleValue = '张三666' //标题
          rotationMap.RmSeeState.linkValue = 'http://www.baidu.com' //链接
          rotationMap.RmSeeState.publicityMap = [] //宣传图
          rotationMap.RmSeeState.rublisher = '马六' //发布人
          rotationMap.RmSeeState.releaseDate = '2022-5-6' //发布日期
          rotationMap.RmSeeState.state = '已启用' //状态
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

    // 政策要闻数据源
    const preferred = reactive({})

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
      dialogWidth: '50%', //弹窗宽度
      // 下架/删除(弹窗)
      tipClick: state => {
        console.log(state)
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogType = state === '已发布' ? 'published' : 'OffTheShelf' //弹窗类型
        btnState.confirmDisplay = true //显示确定和取消按钮
      },
      // 点击选择弹出表格
      onConfirm: () => {
        console.log(btnState.dialogType)
        // 选择好房源表格列表
        btnState.dialogVisible = false //隐藏弹窗
        proxy.$message.success('OK')
      },
      // 二级弹窗确定时间
      twoOnConfirm: () => {
        console.log('二级弹窗')
        proxy.$message.success('OK')
      },
    })
    return {
      ...toRefs(tabsState), //tabs数据源
      ...toRefs(rotationMap), //轮播图数据源
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
    width: 223px;
    height: 144px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #d9d9d9;
    border-radius: 8px;
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
  .RmAddNewlyMain,
  .RmSeeMain {
    padding: 0px 10px;
    .header {
      height: 58px;
      line-height: 20px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 100);
      text-align: center;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      color: rgba(16, 16, 16, 100);
      font-size: 14px;
      font-family: SourceHanSansSC-regular;
    }
    .content {
      .el-row {
        margin-top: 26px;
        .el-col:nth-child(odd) {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(16, 16, 16, 100);
          font-size: 18px;
          font-family: SourceHanSansSC-regular;
        }
        .el-col:nth-child(even) {
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(16, 16, 16, 100);
          font-size: 18px;
          font-family: SourceHanSansSC-regular;
        }
        // 发布
        .releaseTime {
          ::v-deep(.el-input) {
            width: 100% !important;
          }
        }
      }
    }
  }
}
</style>
