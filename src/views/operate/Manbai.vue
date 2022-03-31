<!-- 运营管理 > 漫柏社区管理页面 -->
<template>
  <div class="box">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      color="#ff7c00"
    >
      <el-tab-pane label="发现漫柏" name="findManbai">
        <!-- 表单 -->
        <el-row class="form" :gutter="20">
          <el-form
            style="width: 100%"
            :inline="true"
            :model="FmForm"
            class="demo-form-inline"
          >
            <el-col :span="10" class="listingNNumber">
              <el-form-item label="模块">
                <el-select
                  v-model="FmForm.modularValue"
                  placeholder="请选择模块"
                >
                  <el-option
                    v-for="item in FmForm.modularOption"
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
                <el-select v-model="FmForm.stateValue" placeholder="请选择状态">
                  <el-option
                    v-for="item in FmForm.stateOption"
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
                  <el-button type="primary" @click="FmForm.FmAddNewlyClick">
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
            <el-col class="li" v-for="item in FmList" :key="item.id">
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
                <div class="popoverLi">
                  <p @click="FmMoreSeeClick">查看</p>
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
                  <p>浏览量{{ item.browse }}</p>
                </div>
                <div>
                  <p>{{ item.time }}</p>
                  <p>{{ item.browse }}</p>
                </div>
              </div>
            </el-col>
          </el-row>

          <!-- 分页 -->
          <div class="paginations">
            <div class="total">共{{ FmPaging.total }}条数据</div>
            <el-pagination
              v-model:currentPage="FmPaging.currentPage"
              v-model:page-size="FmPaging.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="sizes, prev, pager, next"
              :total="FmPaging.total"
              @size-change="FmPaging.handleSizeChange"
              @current-change="FmPaging.handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
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
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="瀑布流" name="waterfallFlow">
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
      </el-tab-pane>
      <el-tab-pane label="漫柏社区全景图" name="ManbaiPanorama">
        <!-- 表单 -->
        <el-row class="form" :gutter="20">
          <el-form
            style="width: 100%"
            :inline="true"
            :model="PfForm"
            class="demo-form-inline"
          >
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
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <!-- 列表 -->
        <div class="ulBox">
          <el-row class="ul">
            <el-col class="li" v-for="item in PfList" :key="item.id">
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
                  <p @click="PfMoreSeeClick">查看</p>
                  <!-- <p>编辑</p> -->
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
            <div class="total">共{{ PfPaging.total }}条数据</div>
            <el-pagination
              v-model:currentPage="PfPaging.currentPage"
              v-model:page-size="PfPaging.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="sizes, prev, pager, next"
              :total="PfPaging.total"
              @size-change="PfPaging.handleSizeChange"
              @current-change="PfPaging.handleCurrentChange"
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
      <!-- 发现漫柏新增 -->
      <div v-show="dialogType === 'FmAddNewly'" class="FmAddNewlyMain">
        <div class="uploadLi">
          <div class="title">轮播图</div>
          <!-- 新增轮播图 -->
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="FmNewlyAddNd.LbSuccess"
              :before-upload="FmNewlyAddNd.LbBeforeUpload"
            >
              <img
                v-if="FmNewlyAddNd.imageUrl"
                :src="FmNewlyAddNd.imageUrl"
                class="VRavatar"
              />
              <el-icon v-else class="avatar-uploader-icon">
                <plus />
              </el-icon>
            </el-upload>
          </div>
        </div>
        <div class="uploadLi">
          <div class="title">详情图</div>
          <!-- 新增详情图 -->
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="FmNewlyAddNd.XqSuccess"
              :before-upload="FmNewlyAddNd.XqBeforeUpload"
            >
              <img
                v-if="FmNewlyAddNd.imageUrl"
                :src="FmNewlyAddNd.imageUrl"
                class="VRavatar"
              />
              <el-icon v-else class="avatar-uploader-icon">
                <plus />
              </el-icon>
            </el-upload>
          </div>
        </div>
        <!-- 推荐门店 -->
        <div class="TjStore">
          <div>推荐门店</div>
          <div>
            <el-select
              v-model="FmNewlyAddNd.FmTjValue"
              class="m-2"
              placeholder="请选择推荐门店"
              size="large"
            >
              <el-option
                v-for="item in FmNewlyAddNd.FmTjOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>

      <!-- 查看 -->
      <div v-show="dialogType === 'FmSee'" class="FmSeeMain">
        <!-- 浏览量 -->
        <el-row class="seeHeader">
          <el-col :span="6">
            <div style="line-height: 16px">浏览量</div>
            <div>1120</div>
          </el-col>
          <el-col :span="6">
            <div>关联门店</div>
            <div>漫柏未来人才社区</div>
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
        <!-- 图片 -->
        <div class="Li">
          <div class="title">轮播图</div>
          <div class="imgBox">
            <el-image
              v-for="(item, index) in 5"
              :key="index"
              :style="index == 0 ? 'margin-left:0px' : 'margin-left:8px'"
              src="https://t8.baidu.com/it/u=1403410121,3250381415&fm=167&app=3000&size=w560&q=100&n=0&f=JPEG&fmt=auto?sec=1646499600&t=4db917ad087e7390e3cd60b25e136ff6"
            ></el-image>
          </div>
        </div>
        <div class="Li">
          <div class="title">详情图</div>
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

      <!-- 新增全景图 -->
      <div v-show="dialogType === 'PfAddPanorama'" class="PfAddPanoramaManin">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="PfNewlyAddNd.QjSuccess"
          :before-upload="PfNewlyAddNd.QjBeforeUpload"
        >
          <img
            v-if="PfNewlyAddNd.imageUrl"
            :src="PfNewlyAddNd.imageUrl"
            class="VRavatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <plus />
          </el-icon>
        </el-upload>
      </div>
    </Dialog>

    <!-- 二级弹窗 -->
    <Dialog
      v-model:dialogVisible="twoDialogVisible"
      :confirmDisplay="twoConfirmDisplay"
      :title="twoDialogTitle"
      successBtn="发布"
      top="20vh"
      @on-confirm="twoOnConfirm"
    ></Dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()
    //   tabs数据源
    const tabsState = reactive({
      activeName: 'findManbai', //tabs默认选中
      handleClick: tab => {},
    })

    // 发现漫柏数据源
    const findManbai = reactive({
      //   表单数据
      FmForm: {
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
        // 发现漫柏新增
        FmAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增发现漫柏' //显示弹窗
          btnState.dialogType = 'FmAddNewly' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
          btnState.dialogWidth = '50%' //设置弹窗宽度
        },
      },
      // 发现漫柏列表
      FmList: [
        {
          id: 1,
          name: '张三三', //发布人
          browse: 1133, //浏览量
          state: 0, //state  0下架  1发布   2草稿
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 2,
          name: '张三三', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 3,
          name: '张三三', //发布人
          browse: 1133, //浏览量
          state: 2,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
        {
          id: 4,
          name: '张三三', //发布人
          browse: 1133, //浏览量
          state: 1,
          time: '2022-02-27', //发布日期
          isSelect: false, //是否显示更多弹窗
          selectList: ['查看', '编辑'],
        },
      ],
      // 发现漫柏查看
      FmMoreSeeClick: () => {
        console.log(123)
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '查看' //显示弹窗
        btnState.dialogType = 'FmSee' //弹窗类型
        btnState.confirmDisplay = true //显示确定和取消按钮
        btnState.dialogWidth = '50%' //设置弹窗宽度
      },
      // 发现漫柏新增数据
      FmNewlyAddNd: {
        FmTjValue: '', //推荐值
        FmTjOption: [
          {
            label: '推荐1',
            value: 1,
          },
          {
            label: '推荐2',
            value: 2,
          },
        ], //推荐option
        imageUrl: '', //新增的图片
        // 轮播上传事件
        LbSuccess: () => {},
        LbBeforeUpload: () => {},
        // 详情图上传事件
        XqSuccess: () => {},
        XqBeforeUpload: () => {},
      },
      // 分页
      FmPaging: {
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

    // 轮播图数据源
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

    // 瀑布流数据源
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

    // 漫柏社区全景图数据源
    const preferred = reactive({
      //   表单数据
      PfForm: {
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
        PfAddNewlyClick: () => {
          btnState.dialogVisible = true //显示弹窗
          btnState.dialogTitle = '新增全景图' //显示弹窗
          btnState.dialogType = 'PfAddPanorama' //弹窗类型
          btnState.confirmDisplay = true //显示确定和取消按钮
          btnState.dialogWidth = '30%' //设置弹窗宽度
        },
      },
      // 漫柏社区全景图列表
      PfList: [
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
      // 漫柏社区查看
      PfMoreSeeClick: () => {
        console.log(123)
        btnState.dialogVisible = true //显示弹窗
        btnState.dialogTitle = '查看' //显示弹窗
        btnState.dialogType = 'FmSee' //弹窗类型
        btnState.confirmDisplay = true //显示确定和取消按钮
        btnState.dialogWidth = '50%' //设置弹窗宽度
      },
      // 全景图新增
      PfNewlyAddNd: {
        imageUrl: '', //新增全景图的图片
        QjSuccess: () => {},
        QjBeforeUpload: () => {},
      },

      // 分页
      PfPaging: {
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
        proxy.$message.success('OK')
      },
    })
    return {
      ...toRefs(tabsState), //tabs数据源
      ...toRefs(findManbai), //发现漫柏数据源
      ...toRefs(rotationMap), //轮播图数据源
      ...toRefs(recommend), // 为你推荐数据源
      ...toRefs(preferred), // 优选房型数据源
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
.popoverLi {
  cursor: pointer;
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
  // 新增发现漫柏
  .FmAddNewlyMain {
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
  .FmSeeMain {
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
      margin-top: 12px;
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
