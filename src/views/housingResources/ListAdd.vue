<!-- 门店录入 > 新增房源页面 -->
<template>
  <div class="box">
    <div class="content">
      <!-- 表单 -->
      <el-row class="form" :gutter="50">
        <el-form style="width: 100%" :inline="true" class="demo-form-inline">
          <el-col :span="5">
            <el-form-item label="房源名称">
              <el-input
                v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                v-model="storeName"
                placeholder="请输入房源名称"
              ></el-input>
              <div v-show="dialogTitle == '查看'">张三房源</div>
            </el-form-item>
          </el-col>

          <el-col v-show="dialogTitle == '查看'" :span="5">
            <el-form-item label="浏览量">
              <div>156895</div>
            </el-form-item>
          </el-col>

          <el-col :span="5" class="priceBox">
            <el-form-item label="价格">
              <div
                v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                style="display: flex"
              >
                <el-input v-model="price" placeholder="请输入价格"></el-input>
                <div style="width: 50px; margin-left: 8px">元起</div>
              </div>
              <div v-show="dialogTitle == '查看'">{{ price }}元起</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话咨询">
              <el-input
                v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                v-model="telephone"
                placeholder="请输入电话"
              ></el-input>
              <div v-show="dialogTitle == '查看'">{{ telephone }}</div>
            </el-form-item>
          </el-col>

          <div class="releaseHeaderBox">
            <el-form-item v-show="dialogTitle == '查看'" label="发布人">
              <div>张三三</div>
            </el-form-item>
            <el-form-item
              v-show="dialogTitle == '查看'"
              label="发布时间"
              style="margin-left: 48px"
            >
              <div>2022-02-28</div>
            </el-form-item>
          </div>
        </el-form>
      </el-row>
      <!-- 房源封面展示 -->
      <div class="storeBox">
        <el-row class="storeContent">
          <el-col :span="2" class="stortTitle">
            <div>房源封面展示</div>
          </el-col>
          <el-col :span="20">
            <el-tabs
              action="https://jsonplaceholder.typicode.com/posts/"
              v-model="tabExhibitionValue"
              type="card"
              class="demo-tabs"
              @tab-click="tabExhibitionChange"
            >
              <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
              <!-- <el-tab-pane label="VR" name="VR">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="VRhandleSuccess"
                  :before-upload="VRbeforeUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="VRavatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <plus />
                  </el-icon>
                </el-upload>
              </el-tab-pane> -->
              <el-tab-pane label="视频" name="video">
                <el-upload
                  v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="VRhandleSuccess"
                  :before-upload="VRbeforeUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="VRavatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <plus />
                  </el-icon>
                </el-upload>
                <div v-show="dialogTitle == '查看'" class="seeImg">
                  <img
                    src="https://t8.baidu.com/it/u=1641279112,691389091&fm=167&app=3000&size=w560&q=81&n=0&f=PNG&fmt=auto?sec=1647018000&t=061968072d041223ad59479175ec85ab"
                    alt=""
                  />
                </div>
              </el-tab-pane>
              <el-tab-pane label="图片" name="picture">
                <el-upload
                  v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="VRhandleSuccess"
                  :before-upload="VRbeforeUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="VRavatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <plus />
                  </el-icon>
                </el-upload>
                <div v-show="dialogTitle == '查看'" class="seeImg">
                  <img
                    src="https://t8.baidu.com/it/u=1641279112,691389091&fm=167&app=3000&size=w560&q=81&n=0&f=PNG&fmt=auto?sec=1647018000&t=061968072d041223ad59479175ec85ab"
                    alt=""
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
      <!-- 房源详情图 -->
      <!-- <div @dblclick="storeDetailsClick">123</div> -->
      <div class="storeBox">
        <el-row class="storeContent">
          <el-col :span="2" class="stortTitle">
            <div>房源详情图</div>
          </el-col>
          <el-col :span="20">
            <el-tabs
              v-model="tabDetailsValue"
              type="card"
              class="demo-tabs storeDetailsTabs"
              @dblclick="storeDetailsClick"
              @tab-click="tabDetailsChange"
            >
              <el-tab-pane
                v-for="item in tabDetailsList"
                :key="item"
                :label="item.label"
                :name="item.name"
              >
                <el-upload
                  v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="VRhandleSuccess"
                  :before-upload="VRbeforeUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="VRavatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <plus />
                  </el-icon>
                </el-upload>
                <div v-show="dialogTitle == '查看'" class="seeImg">
                  <img
                    src="https://t8.baidu.com/it/u=1641279112,691389091&fm=167&app=3000&size=w560&q=81&n=0&f=PNG&fmt=auto?sec=1647018000&t=061968072d041223ad59479175ec85ab"
                    alt=""
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
      <!-- 图片拖动 -->
      <!-- <draggableUpload v-model:value="imgList"></draggableUpload> -->
      <div class="positionBox">
        <!-- 面积 -->
        <el-row class="facilitiesBox">
          <el-col class="title" :span="2">
            <div>面积</div>
          </el-col>
          <el-col :span="20" style="display: flex; align-items: center">
            <div v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'">
              <el-input
                style="width: 120px; margin-right: 6px"
                v-model="measureValue"
                placeholder="请输入面积"
              ></el-input>
              <span>m²</span>
            </div>
            <div v-show="dialogTitle == '查看'">
              200
              <span>m²</span>
            </div>
          </el-col>
        </el-row>
        <!-- 关联门店 -->
        <el-row class="facilitiesBox">
          <el-col class="title" :span="2">
            <div>关联门店</div>
          </el-col>
          <el-col :span="20" style="display: flex; align-items: center">
            <el-select
              v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
              v-model="relationValue"
              placeholder="请选择关联门店"
            >
              <el-option
                v-for="item in relationOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
            <div v-show="dialogTitle == '查看'">漫柏未来人才社区</div>
          </el-col>
        </el-row>
        <!-- 配套设施 -->
        <el-row class="facilitiesBox">
          <el-col class="title" :span="2">
            <div>配套设施</div>
          </el-col>
          <el-col :span="20">
            <div
              v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
              class="positionSeach"
            >
              <el-input
                v-model="facilitiesValue"
                class="w-50 m-2"
                placeholder="请添加配套设施"
                suffix-icon="Search"
              />
              <el-button type="primary" @click="facilitiesBtnAdd">
                添加
              </el-button>
              <el-button @click="facilitiesBtnDelete">删除</el-button>
            </div>
            <div :class="joinTime ? 'seeCheckboxContent' : 'checkboxContent'">
              <el-checkbox-group
                v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                v-model="facilitiesCheckValue"
                @change="facilitiesCheckChange"
              >
                <el-checkbox
                  v-for="item in facilitiesCheckList"
                  :key="item"
                  :label="item.label"
                  :value="item.label"
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
              <ul class="ul" v-show="dialogTitle == '查看'">
                <li v-for="item in facilitiesCheckList" :key="item">
                  {{ item.label }}
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>

        <!-- 其他房型 -->
        <el-row class="facilitiesBox">
          <el-col class="title" :span="2">
            <div>其他房型</div>
          </el-col>
          <el-col :span="20">
            <div :class="joinTime ? 'seeCheckboxContent' : 'checkboxContent'">
              <el-checkbox-group
                v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
                v-model="labelCheckValue"
                @change="labelCheckChange"
              >
                <el-checkbox
                  v-for="item in labelCheckList"
                  :key="item"
                  :label="item.label"
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
              <ul class="ul" v-show="dialogTitle == '查看'">
                <li v-for="item in labelCheckList" :key="item">
                  {{ item.label }}
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 发布按钮 -->
      <div
        class="releaseBox"
        v-show="dialogTitle === '新增人员' || dialogTitle == '编辑'"
      >
        <div>
          <el-button @click="saveDraftClick">保存草稿</el-button>
          <el-button type="success" @click="releaseClick">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import { jsonp } from 'vue-jsonp'
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  watch,
  onMounted,
} from 'vue'

export default defineComponent({
  props: {
    dialogTitle: {
      type: String,
      defalut: false,
    },
    newlyAddedState: {
      type: Object,
      defalut: {},
    },
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() //获取实例
    console.log(props, 'props')
    //   表单数据
    const form = reactive({
      storeName: '', //门店名称名称
      price: '', //价格
      telephone: '', //电话咨询
    })
    // 房源展示
    const storeExhibition = reactive({
      tabExhibitionValue: ref('video'), //默认tabs
      imageUrl: '', //上传的图片
      tabExhibitionChange: tab => {
        // console.log(tab.props)
      }, //监听tabs变化
      VRbeforeUpload: file => {
        console.log(file)
      }, //VR上传文件之前
      VRhandleSuccess: (response, file, fileList) => {
        console.log(response, file, fileList)
      },
    })
    // 房源详情图
    const storeDetails = reactive({
      tabDetailsValue: ref('休息区'), //默认tabs
      //门店详情tabs列表
      tabDetailsList: [
        {
          label: '休息区',
          name: '休息区',
          content: 'Tab 1 content',
        },
        {
          label: '娱乐圈',
          name: '娱乐圈',
          content: 'Tab 2 content',
        },
        {
          label: '接待区',
          name: '接待区',
          content: 'Tab 3 content',
        },
        // {
        //   label: '+',
        //   name: '+',
        //   content: 'Tab 3 content',
        // },
      ],
      //监听tabs变化
      tabDetailsChange: tab => {
        // console.log(tab.props)
        if (tab.props.label === '+') {
          storeDetails.tabDetailsList.splice(
            storeDetails.tabDetailsList.length - 1,
            0,
            {
              label: `待修改${storeDetails.tabDetailsList.length}`,
              name: `待修改${storeDetails.tabDetailsList.length}`,
            }
          )
        }
      },
      //上传文件之前
      VRbeforeUpload: file => {
        console.log(file, 'file')
      },
      //上传成功
      VRhandleSuccess: (response, file, fileList) => {
        console.log(response, file, fileList)
      },
      // 门店详情双击tab修改
      storeDetailsClick: e => {
        if (props.dialogTitle === '查看') return //查看状态return
        // console.log(e.target, 123)
        let ariaControls = e.target.getAttribute('aria-controls')
        // 检查是否双击的是tab-item
        if (ariaControls) {
          let input = document.createElement('input')
          let tabLi = e.target
          // console.log(tabLi.innerHTML)
          input.value = tabLi.innerHTML.match(/(\S*)</)
            ? tabLi.innerHTML.match(/(\S*)</)[1]
            : tabLi.innerHTML //截取文字内容
          // console.log(input.value)
          // console.log(storeDetails.tabDetailsList)
          var tabindex = storeDetails.tabDetailsList
            .map(item => item.label)
            .indexOf(`${input.value}`) //获取当前索引
          // console.log(storeDetails.tabDetailsList)
          // console.log(tabindex)
          // 监听输入框失去焦点
          input.onblur = () => {
            // console.log(input.value, tabLi.firstChild)
            let value = input.value
            tabLi.removeChild(tabLi.firstChild)
            tabLi.innerHTML = value
            // console.log(value, tabindex)
            // console.log(storeDetails.tabDetailsList)
            storeDetails.tabDetailsList[tabindex].label = value //失去焦点更新数组对应的lable数据
            // tabLi.className += 'is-active'
            // console.log(tabLi)
          }
          tabLi.replaceChild(input, tabLi.firstChild)
        }
      }, //tab的双击事件
    })
    // 面积和关联门店
    const relationState = reactive({
      measureValue: '', //面积
      relationValue: '', //关联门店值
      relationOption: [
        {
          label: '门店1',
          value: 1,
        },
        {
          label: '门店2',
          value: 2,
        },
      ], //关联门店option
    })
    // 配套设施
    const facilitiesCheckbox = reactive({
      facilitiesValue: '', //配套设施输入框值
      facilitiesCheckValue: [], //多选框选中的值
      facilitiesCheckList: [
        {
          label: '健身房',
          message: 'Please select at least one activity type',
        },
        {
          label: '瑜伽房',
          message: 'Please select at least one activity type',
        },
        {
          label: '书吧',
          message: 'Please select at least one activity type',
        },
        {
          label: '咖啡厅',
          message: 'Please select at least one activity type',
        },
        {
          label: '共享厨房',
          message: 'Please select at least one activity type',
        },
        {
          label: '共享办公',
          message: 'Please select at least one activity type',
        },
        {
          label: '篮球场',
          message: 'Please select at least one activity type',
        },
      ], //多选框列表
      // 监听配套设施多选框变化
      facilitiesCheckChange: e => {
        console.log(e, facilitiesCheckbox)
      },
      // 点击添加配套设施
      facilitiesBtnAdd: () => {
        let inputValue = facilitiesCheckbox.facilitiesValue
        if (!inputValue) return
        console.log(inputValue)
        facilitiesCheckbox.facilitiesCheckList.push({
          label: inputValue,
          message: 'Please select at least one activity type',
        }) //添加标签
        facilitiesCheckbox.facilitiesValue = '' //清空输入框
      },
      // 删除配套设施
      facilitiesBtnDelete: () => {
        let currentList = facilitiesCheckbox.facilitiesCheckList
        let deleteList = facilitiesCheckbox.facilitiesCheckValue
        // console.log(currentList)
        // console.log(deleteList)
        currentList.map((item, index) => {
          deleteList.map((li, i) => {
            if (item.label === li) {
              currentList.splice(index, 1)
            }
          })
        })
        console.log(currentList)
      },
    })

    // 其他房型
    const labelCheckbox = reactive({
      labelSeachValue: '', //配套设施输入框值
      labelCheckValue: [], //多选框选中的值
      labelCheckList: [
        {
          label: '精选双人房',
          message: 'Please select at least one activity type',
        },
        {
          label: '智慧主题房',
          message: 'Please select at least one activity type',
        },
        {
          label: '白领精致房',
          message: 'Please select at least one activity type',
        },
        {
          label: '雅致行政房',
          message: 'Please select at least one activity type',
        },
      ], //多选框列表
      labelCheckChange: e => {
        console.log(e, labelCheckbox)
      },
    })

    const state = reactive({
      imgList: [
        'https://s0.2mdn.net/simgad/15128749641359755215',
        'https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64',
        'https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64',
      ],
    })
    // 检查tabs是否可编辑
    console.log(props.dialogTitle, 'props.dialogTitle')
    if (props.dialogTitle === '查看')
      storeDetails.tabDetailsList.push({
        label: '+',
        name: '+',
        content: 'Tab 3 content',
      })

    // 按钮数据源
    const btnState = reactive({
      isNewlyAdded: false, //是否是新增状态
      // 点击发布
      releaseClick: () => {
        console.log(proxy)
        context.emit('release') //调用父组件方法 隐藏弹窗
      },
      // 点击保存草稿
      saveDraftClick: () => {
        console.log(proxy)
        proxy.$message.success('保存草稿成功')
      },
    })
    onMounted(() => {
      // 监听新增/查看弹窗变化  调整界面
      watch(
        () => props.dialogTitle,
        (currenDialogTitle, prevDialogTitle) => {
          // currenDialogTitle  查看模式  新增模式  编辑
          let length = storeDetails.tabDetailsList.length
          if (currenDialogTitle === '查看') {
            // 查看
            if (storeDetails.tabDetailsList[length - 1].label == '+') {
              storeDetails.tabDetailsList.pop()
            }
          } else if (currenDialogTitle === '新增人员') {
            if (storeDetails.tabDetailsList[length - 1].label !== '+') {
              // 新增
              storeDetails.tabDetailsList.push({
                label: '+',
                name: '+',
                content: 'Tab 3 content',
              })
            }
          } else if (currenDialogTitle === '编辑') {
            if (storeDetails.tabDetailsList[length - 1].label !== '+') {
              // 新增
              storeDetails.tabDetailsList.push({
                label: '+',
                name: '+',
                content: 'Tab 3 content',
              })
            }
          }
        },
        { immediate: true }
      )
    })

    return {
      ...toRefs(form), //表单数据
      ...toRefs(storeExhibition), //门店展示
      ...toRefs(storeDetails), //门店详情图
      ...toRefs(relationState), //关联门店
      ...toRefs(facilitiesCheckbox), //配套设施
      ...toRefs(labelCheckbox), //标签介绍
      ...toRefs(state),
      ...toRefs(btnState),
      // joinTime: states.joinTime, //当前页面状态
    }
  },
})
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 22px 40px 22px;
  background-color: #f4f7ff;
  min-height: 100%;
  .content {
    background-color: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    padding: 20px 31px 37px 26px;
    // 筛选表单
    .form {
      background-color: #ffffff;
      width: 100%;
      padding-left: 14px;
      .priceBox {
        display: flex;
        align-items: center;
        margin-right: 20px;
        ::v-deep(.el-form-item) {
          margin-bottom: 0px;
        }
      }
      .btnBox {
        float: right;
      }

      .releaseHeaderBox {
        float: right;
      }
    }
    // 门店上传信息
    .storeBox {
      margin: 15px 0 0 0px;
      padding: 14px 13px;
      box-shadow: 0px 0px 6px 0px rgba(183, 183, 183, 100);
      border-radius: 10px;
      overflow: hidden;
      ::v-deep(.el-form-item) {
        margin-bottom: 0px;
      }
      //   .storeContent {
      //     display: flex;
      //     align-items: center;
      //   }
      .stortTitle {
        margin-top: 10px;
        margin-right: 20px;
      }
      //   tabs
      .demo-tabs {
        ::v-deep(.is-top) {
          color: #101010;
        }
        ::v-deep(.el-tabs__header) {
          border-bottom: none;
        }
        ::v-deep(.is-active) {
          color: #ffffff;
          background-color: #447ed9;
        }
        ::v-deep(.el-tabs__item) {
          border-bottom: solid 1px #e4e7ed;
        }
        ::v-deep(.el-tabs__item):hover {
          color: none;
        }
      }
      // 上传文件
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
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .seeImg {
      img {
        width: 266px;
        height: 153px;
        border-radius: 10px;
      }
    }
    // 位置内容
    .positionBox {
      margin: 15px 0 0 0px;
      padding: 14px 13px 42px 13px;
      box-shadow: 0px 0px 6px 0px rgba(183, 183, 183, 100);
      border-radius: 10px;
      overflow: hidden;

      .title {
        margin: 10px 15px 0 0;
      }
      .positionSeach {
        width: 450px;
        display: flex;
        ::v-deep(.el-button--primary) {
          background-color: #447ed9;
        }
        ::v-deep(.el-input) {
          width: 300px;
          margin-right: 20px;
        }
      }
      // 腾讯地图
      #container {
        width: 300px;
        border-radius: 15px;
        overflow: hidden;
        margin: 7px 0px 25px;
        // 隐藏相关控件
        ::v-deep(.rotate-circle) {
          display: none;
        }
        ::v-deep(.tmap-zoom-control) {
          display: none;
        }
        ::v-deep(.tmap-scale-control) {
          display: none;
        }
        ::v-deep(.logo-text) {
          display: none;
        }
      }
    }
    // 配套设施
    .facilitiesBox {
      margin-top: 25px;
      ::v-deep(.el-button--primary) {
        background-color: #447ed9;
      }

      .checkboxContent {
        margin-top: 12px;
        ::v-deep(.el-button--primary) {
          background-color: #447ed9;
        }
      }
      .seeCheckboxContent {
        margin-top: 12px;
      }
    }

    .ul {
      display: flex;
      li {
        list-style: none;
        margin-left: 20px;
        &:nth-of-type(1) {
          margin-left: 0px;
        }
      }
    }

    // 发布按钮
    .releaseBox {
      margin: 38px 0 0;
      div {
        float: right;
        button:nth-of-type(1) {
          margin-right: 40px;
        }
      }
    }
  }
}
</style>
