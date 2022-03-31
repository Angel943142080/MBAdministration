<!-- 运营管理 > 保洁服务页面 -->
<template>
  <div class="box">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      color="#ff7c00"
    >
      <el-tab-pane label="保洁服务" name="rotationMap"></el-tab-pane>
    </el-tabs>
    <!-- 表单 -->
    <el-row class="form" :gutter="20">
      <el-form
        style="width: 100%"
        :inline="true"
        :model="RmForm"
        class="demo-form-inline"
      >
        <el-col :span="10" class="listingNNumber">
          <el-form-item label="保洁名称">
            <el-input
              v-model="RmForm.titleValue"
              placeholder="请输入名称"
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
        <el-table-column type="selection" width="45" />
        <el-table-column label="排序" sortable>
          <template #default="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="轮播图" min-width="100" sortable>
          <template #default="scope">
            <img
              style="width:112px;height:62px"
              src="https://img2.baidu.com/it/u=2719531752,4253059198&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="保洁名称" />
        <el-table-column prop="releaseDate" label="发布时间" />
        <el-table-column prop="releaseDate" label="发布人" />
        <el-table-column prop="state" label="状态" />
        <el-table-column prop="views" label="成交量">
          <template #default="scope">
            <span>{{ scope.row.turnover }}</span>
            /
            <span style="color:#FF7C00;">{{ scope.row.total }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" />
        <el-table-column label="操作" fixed="right">
          <template #default>
            <el-button type="text" size="small" @click="RmTableData.seeClick">
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

    <!-- 一级弹窗 -->
    <Dialog
      v-model:dialogVisible="dialogVisible"
      :confirmDisplay="confirmDisplay"
      :title="dialogTitle"
      width="40%"
      @on-confirm="onConfirm"
    >
      <!-- 新增 -->
      <div v-show="dialogType === 'RmAddNewly'" class="publishedMain">
        <el-row
          style="font-size: 16px;display:flex;align-items: center;padding-left:13px"
        >
          <el-col :span="2" style="color: rgba(16, 16, 16, 100)">
            服务名称
          </el-col>
          <el-col :span="9">
            <el-input placeholder="请输入内容" v-model="input" clearable />
          </el-col>
        </el-row>
        <div class="img_wrap">
          <el-row>
            <el-col :span="2">轮播图</el-col>
            <el-col :span="19">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <div class="img_wrap">
          <el-row>
            <el-col :span="2">详情图</el-col>
            <el-col :span="19">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <el-row
          style="margin-top:12px;font-size: 16px;display:flex;padding-left:13px"
        >
          <el-col
            :span="2"
            style="color: rgba(16, 16, 16, 100);padding-top:5px;"
          >
            费用
          </el-col>
          <el-col :span="22">
            <div style="display:flex;margin-bottom:12px;">
              <div style="width:50%;">
                <el-checkbox v-model="checked1" size="large">
                  <div style="display:flex;align-items: center;">
                    <div class="col_10" style="margin-right:15px;">
                      精选双人房
                    </div>
                    <el-input
                      style="margin-right:15px;width:99px;"
                      placeholder="请输入"
                    ></el-input>
                    <div class="col_10">元/次</div>
                  </div>
                </el-checkbox>
              </div>
              <div
                style="width:50%;font-size:16px;display:flex;align-items:center;"
              >
                <div class="col_10" style="margin-right:15px;">
                  成交量
                </div>
                <div>
                  <el-input style="width:100px" placeholder="请输入"></el-input>
                </div>
              </div>
            </div>

            <div style="margin-bottom:12px;">
              <el-checkbox v-model="checked2" size="large">
                <div style="display:flex;align-items: center;">
                  <div class="col_10" style="margin-right:15px;">
                    智慧主题房
                  </div>
                  <el-input
                    style="margin-right:15px;width:99px;"
                    placeholder="请输入"
                  ></el-input>
                  <div class="col_10">元/次</div>
                </div>
              </el-checkbox>
            </div>
            <div style="margin-bottom:12px;">
              <el-checkbox v-model="checked3" size="large">
                <div style="display:flex;align-items: center;">
                  <div class="col_10" style="margin-right:15px;">
                    白领精致房
                  </div>
                  <el-input
                    style="margin-right:15px;width:99px;"
                    placeholder="请输入"
                  ></el-input>
                  <div class="col_10">元/次</div>
                </div>
              </el-checkbox>
            </div>
            <div style="margin-bottom:12px;">
              <el-checkbox v-model="checked4" size="large">
                <div style="display:flex;align-items: center;">
                  <div style="margin-right:15px;" class="col_10">
                    雅政行政房
                  </div>
                  <el-input
                    style="margin-right:15px;width:99px;"
                    placeholder="请输入"
                  ></el-input>
                  <div class="col_10">元/次</div>
                </div>
              </el-checkbox>
            </div>
            <div>
              <el-checkbox v-model="checked5" size="large">
                <div style="display:flex;align-items: center;">
                  <div style="margin-right:15px;" class="col_10">
                    优享四人间
                  </div>
                  <el-input
                    style="margin-right:15px;width:99px;"
                    placeholder="请输入"
                  ></el-input>
                  <div class="col_10">元/次</div>
                </div>
              </el-checkbox>
            </div>
          </el-col>
        </el-row>
      </div>
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
      <!--  查看 -->
      <div v-show="dialogType === 'RmSee'" class="RmSeeMain">
        <div class="content">
          <el-row style="font-size:16px;">
            <el-col :span="3" style="color:#979797;">服务名称</el-col>
            <el-col :span="6">漫柏高端保洁服务</el-col>
            <el-col :span="3" style="color:#979797;">成交量</el-col>
            <el-col :span="3">
              500/
              <span style="color:#FF7C00;">200</span>
            </el-col>
            <el-col :span="2" style="color:#979797;">浏览量</el-col>
            <el-col :span="2">4684</el-col>
            <el-col :span="2" style="color:#979797;">状态</el-col>
            <el-col :span="2">已发布</el-col>
          </el-row>
          <el-row>
            <el-col :span="3" style="color:#979797;">发布时间</el-col>
            <el-col :span="6">2022-02-17 09：00</el-col>
            <el-col :span="3" style="color:#979797;">发布人</el-col>
            <el-col :span="3">张三三</el-col>
          </el-row>
        </div>
        <div class="img_wrap">
          <el-row>
            <el-col :span="3">轮播图</el-col>
            <el-col
              :span="21"
              style="display:flex;justify-content:space-between;"
            >
              <el-image
                v-for="item in [1, 1, 2]"
                :key="item"
                style="width: 166px; height: 103px;margin-right:8px;border-radius:8px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fill"
              />
            </el-col>
          </el-row>
        </div>
        <div class="img_wrap">
          <el-row>
            <el-col :span="3">详情图</el-col>
            <el-col
              :span="21"
              style="display:flex;justify-content:space-between;"
            >
              <el-image
                v-for="item in [1, 1, 2]"
                :key="item"
                style="width: 166px; height: 103px;margin-right:8px;border-radius:10px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fill"
              />
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="10" style="margin-top:16px;font-size:14px;">
          <el-col :span="3">费用</el-col>
          <el-col :span="3" class="col_10">精选双人房</el-col>
          <el-col :span="3" class="col_10">40元/次</el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:16px;font-size:14px;">
          <el-col :span="3"></el-col>
          <el-col :span="3" class="col_10">智慧主题房</el-col>
          <el-col :span="3" class="col_10">40元/次</el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:16px;font-size:14px;">
          <el-col :span="3"></el-col>
          <el-col :span="3" class="col_10">白领精致房</el-col>
          <el-col :span="3" class="col_10">40元/次</el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:16px;font-size:14px;">
          <el-col :span="3"></el-col>
          <el-col :span="3" class="col_10">雅致行政房</el-col>
          <el-col :span="3" class="col_10">40元/次</el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:16px;font-size:14px;">
          <el-col :span="3"></el-col>
          <el-col :span="3" class="col_10">优享四人间</el-col>
          <el-col :span="3" class="col_10">40元/次</el-col>
        </el-row>
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
import { defineComponent, reactive, toRefs, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    //   tabs数据源
    const tabsState = reactive({
      activeName: 'rotationMap', //tabs默认选中
      handleClick: tab => {},
    })

    let input = ref('')
    const checked1 = ref(true)
    const checked2 = ref(false)
    const checked3 = ref(false)
    const checked4 = ref(false)
    const checked5 = ref(false)
    const checked6 = ref(false)

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
        },
      },
      // 新增活动弹窗数据
      RmAddDialogState: {
        titleValue: '', //活动标题
        addressValue: '', //活动地址
        activityTime: '', //活动时间
        activityNumber: '', //活动人数
        activityGroupChat: '', //活动群聊名称
        tenant: 1, //是否只允许租户  1是 2否
        activityDetails: '', //活动详情
        releaseTime: '', //发布时间
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
        LbSuccess: () => {}, //图片上传成功事件
        LbBeforeUpload: () => {}, //图片上传之前事件
      },
      // 表格数据
      RmTableData: {
        // 轮播图table
        table: [
          {
            index: 0,
            title: '这里是保洁名称', //标题
            releaseDate: '2021-5-13', //发布日期
            publisher: '李四四', //发布人
            state: '已发布', //状态
            total: '200',
            turnover: '500',
            views: '15615', //浏览量
          },
          {
            index: 1,
            title: '这里是保洁名称', //标题
            releaseDate: '2021-5-13', //发布日期
            publisher: '李四四', //发布人
            state: '已发布', //状态
            total: '200',
            turnover: '500',
            views: '15615', //浏览量
          },
          {
            index: 2,
            title: '这里是保洁名称', //标题
            releaseDate: '2021-5-13', //发布日期
            publisher: '李四四', //发布人
            state: '已发布', //状态
            total: '200',
            turnover: '500',
            views: '15615', //浏览量
          },
          {
            index: 3,
            title: '这里是保洁名称', //标题
            releaseDate: '2021-5-13', //发布日期
            publisher: '李四四', //发布人
            state: '已发布', //状态
            total: '200',
            turnover: '500',
            views: '15615', //浏览量
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

    // 活动推荐数据源
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

    // 审核数据源
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
            title: '这里是保洁名称', //标题
            releaseDate: '2021-5-13', //发布日期
            publisher: '李四四', //发布人
            state: '已发布', //状态
            numberApplicants: '666', //成交量
            views: '15615', //浏览量
          },
          {
            title: '这里是保洁名称', //标题
            releaseDate: '2021-5-13', //发布日期
            publisher: '李四四', //发布人
            state: '已发布', //状态
            numberApplicants: '666', //成交量
            views: '15615', //浏览量
          },
          {
            title: '这里是保洁名称', //标题
            releaseDate: '2021-5-13', //发布日期
            publisher: '李四四', //发布人
            state: '已发布', //状态
            numberApplicants: '666', //成交量
            views: '15615', //浏览量
          },
        ],
        pageSize: 10, //一页多少条数据
        total: 1000, //共多少条数据
        //查看事件
        seeClick: () => {
          console.log('查看click')
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '查看' //显示弹窗
          btnState.dialogType = 'RmSee' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
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
      dialogVisible: false, //是否显示新增弹窗
      confirmDisplay: true, //是否显示弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      dialogType: '', //弹窗类型  published/已发布     OffTheShelf/已下架  addNewly/新增
      // 二级弹窗数据
      twoIsDialogType: '', //检查二级弹窗类型  choiceRoom房源选择
      twoDialogVisible: false, //二级弹窗 - 是否显示弹窗
      twoConfirmDisplay: true, //二级弹窗 - 是否显示弹窗的确定、取消按钮
      twoDialogTitle: '', //二级弹窗头部标题
      // 查看活动弹窗数据
      sseAddDialogState: {
        titleValue: '', //活动标题
        addressValue: '', //活动地址
        activityTime: '', //活动时间
        activityNumber: '', //活动人数
        activityGroupChat: '', //活动群聊名称
        tenant: 1, //是否只允许租户  1是 2否
        activityDetails: '', //活动详情
        releaseTime: '', //发布时间
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
      },
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
      input,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
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
  ::v-deep .el-input__inner {
    border-radius: 19px !important;
  }
  .col_10 {
    color: rgba(16, 16, 16, 100) !important;
  }
  .img_wrap {
    margin: 13px 0 0 0;
    box-sizing: border-box;
    padding: 16px 13px;
    border-radius: 10px;
    box-shadow: 0px 0px 6px 0px rgba(183, 183, 183, 100);
    .avatar-uploader ::v-deep .el-upload {
      border: 1px solid rgba(187, 187, 187, 100) !important;
      border-radius: 8px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      height: 100px;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 30px;
      color: #000000;
      width: 178px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 100px;
      display: block;
    }
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
    // padding: 0px 10px;
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
      box-sizing: border-box;
      padding: 0 0 0 32px;
      .el-row {
        margin-top: 26px;
        .el-col:nth-child(odd) {
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(16, 16, 16, 100);
          font-size: 14px;
          font-family: SourceHanSansSC-regular;
        }
        .el-col:nth-child(even) {
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(16, 16, 16, 100);
          font-size: 14px;
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
