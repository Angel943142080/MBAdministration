<!-- 运营管理 > 漫生活页面 -->
<template>
  <div>
    <div class="box">
      <el-tabs v-model="tabName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="轮播图" name="first"></el-tab-pane>
        <el-tab-pane label="瀑布流" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 选择栏 -->
      <div class="select_box">
        <el-row :gutter="30" align="middle">
          <el-col :span="1">标题</el-col>
          <el-col :span="4">
            <el-input v-model="searchText" placeholder="请输入标题" />
          </el-col>
          <el-col :span="1">状态</el-col>
          <el-col :span="4">
            <el-select
              v-model="states"
              class="m-2"
              placeholder="请选择"
              size="large"
            >
              <el-option
                v-for="item in statesOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
          <el-col :span="10" style="display:flex;justify-content: flex-end;">
            <el-button @click="showTip(4)" type="primary">新增</el-button>
            <el-button @click="showTip(0)">删除</el-button>
            <el-button @click="showTip(3)">排序</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 表格数据 -->
      <div class="tab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" sortable label="排序" />
          <el-table-column prop="img" label="封面" align="center">
            <template #default="scope">
              <el-image
                style="width: 112px; height: 62px;border-radius:6px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fit"
              />
            </template>
          </el-table-column>
          <el-table-column prop="modual" label="标题" align="center" />
          <el-table-column prop="modual" label="链接" align="center" />
          <el-table-column prop="publisher" label="发布人" align="center" />
          <el-table-column
            prop="date"
            sortable
            label="发布日期"
            align="center"
          />
          <el-table-column prop="states" label="状态" align="center">
            <template #default="scope">
              <div v-if="scope.row.states === 0">已发布</div>
              <div v-else>已删除</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="views"
            sortable
            label="浏览量"
            align="center"
          />
          <el-table-column prop="操作" label="操作" align="center">
            <template #default="scope">
              <el-button type="text" @click="showTip(2)">查看</el-button>
              <el-button type="text">编辑</el-button>
              <el-button
                type="text"
                @click="showTip(1)"
                v-if="scope.row.states === 0"
              >
                下架
              </el-button>
              <el-button type="text" @click="showTip(0)" v-else>删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div style="display:flex;justify-content: flex-end;margin-top:100px">
          <el-pagination layout="prev, pager, next" :total="total" />
        </div>
      </div>
    </div>

    <!-- 弹出提示框 -->
    <el-dialog
      v-model="dialogSwitch"
      :title="diaTitle"
      width="40%"
      :before-close="handleClose"
    >
      <!-- 新增 -->
      <div v-if="diaType === 4" class="">
        <edit :mycontent="content" @setContent="resetText($event)" />
        <div style="color:#000000;">
          <el-row :gutter="10">
            <el-col
              :span="6"
              style="font-size:16px;margin-top:15px;color:#000000;font-weight:bold"
            >
              发布设置
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-top:15px">
            <el-col :span="3" :offset="1">添加封面</el-col>
            <el-col :span="9"><upload /></el-col>
          </el-row>
          <el-row
            align="middle"
            :gutter="10"
            style="font-size:16px;margin-top:60px;color:#000000;"
          >
            <el-col :span="3">发布时间</el-col>
            <el-col :span="9">
              <el-date-picker
                v-model="date"
                type="datetime"
                format="YYYY-MM-DD HH:MM"
                placeholder="请选择发布时间"
              />
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 排序 -->
      <div v-if="diaType === 3">
        <el-table
          :data="sortTableData"
          class="sortTable"
          style="width: 100%"
          row-key="id"
        >
          <el-table-column type="index" label="序号" />
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <!-- 删除 -->
      <div v-if="diaType === 0" style="text-align:center">
        <span>确认要删除该信息嘛？</span>
      </div>
      <!-- 下架提示 -->
      <div v-if="diaType === 1" style="text-align:center">
        <span>确认要下架该信息嘛</span>
      </div>
      <!-- 查看 -->
      <div v-show="diaType === 2" style="padding-left:60px;font-size:14px;">
        <el-row style="margin-bottom:15px">
          <el-col :span="4">浏览量</el-col>
          <el-col :span="3" style="color:rgba(255, 124, 0, 100)">102</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col :span="4">标题</el-col>
          <el-col :span="10">这里是新闻标题</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col :span="4">内容详情</el-col>
          <el-col
            :span="10"
            style="color:rgba(255, 124, 0, 100); cursor: pointer;"
          >
            点击查看
          </el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col :span="4">封面</el-col>
          <el-col :span="10">
            <el-image
              style="width: 272px; height: 198px;border-radius:10px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="fit"
            />
          </el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col :span="4">发布人</el-col>
          <el-col :span="10">张三三</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col :span="4">发布日期</el-col>
          <el-col :span="10">2022-02-28</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col :span="4">状态</el-col>
          <el-col :span="10">已发布</el-col>
        </el-row>
      </div>

      <!-- 下方按钮 -->
      <template #footer>
        <span
          class="dialog-footer"
          v-if="diaType === 0 || diaType === 1 || diaType === 3"
        >
          <el-button @click="dialogSwitch = false">取消</el-button>
          <el-button type="primary" @click="dialogSwitch = false">
            确定
          </el-button>
        </span>
        <span class="dialog-footer" v-if="diaType === 4">
          <el-button @click="dialogSwitch = false">取消</el-button>
          <el-button type="primary" @click="dialogSwitch = false">
            保存
          </el-button>
          <el-button @click="dialogSwitch = false">
            发布
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import edit from '@/components/Edit/index.vue' //富文本编辑器
import upload from '@/components/DraggableUpload/index.vue'
import { defineComponent, reactive, toRefs, nextTick } from 'vue'
import Sortable from 'sortablejs' //拖拽插件
export default defineComponent({
  components: {
    edit,
    upload,
  },
  setup() {
    // 富文本内容
    const editData = reactive({
      content: '',
      date: '',
      resetText: e => {
        editData.content = e
      },
    })
    // 提示框操作
    const diaData = reactive({
      dialogSwitch: false, //提示框开关
      diaType: 0,
      diaTitle: '新增',
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
          Sortable.create(tbody, {
            animation: 150,
            ghostClass: 'blue-background-class',
            onEnd({ newIndex, oldIndex }) {
              const currRow = diaData.sortTableData.splice(oldIndex, 1)[0]
              diaData.sortTableData.splice(newIndex, 0, currRow)
            },
          })
        })
      },
      handleClose: () => {
        diaData.dialogSwitch = false
      },
    })
    // 上方tab选择器
    const tabData = reactive({
      tabName: 'first',
      handleClick: () => {
        // console.log(tabData.tabName)
      },
    })

    // 表格数据
    const tableData = reactive({
      tableData: [
        {
          modual: '房源录入',
          publisher: '张兰兰',
          date: '2022-02-12',
          states: 0,
          views: '11230',
        },
        {
          modual: '房源录入',
          publisher: '张兰兰',
          date: '2022-02-12',
          states: 1,
          views: '11230',
        },
        {
          modual: '房源录入',
          publisher: '张兰兰',
          date: '2022-02-12',
          states: 0,
          views: '11230',
        },
        {
          modual: '房源录入',
          publisher: '张兰兰',
          date: '2022-02-12',
          states: 1,
          views: '11230',
        },
      ],
      showTip: e => {
        if (e === 0) {
          diaData.diaTitle = '删除'
        }
        if (e === 1) {
          diaData.diaTitle = '下架'
        }
        if (e === 2) {
          diaData.diaTitle = '查看'
        }
        if (e === 3) {
          diaData.diaTitle = '排序'
          diaData.rowDrop() //排序方法
        }
        if (e === 4) {
          diaData.diaTitle = '新增'
        }
        diaData.diaType = e //提示框提示
        diaData.dialogSwitch = true
      },
    })

    // 状态选择栏数据
    const stateData = reactive({
      searchText: '',
      states: '',
      reset: () => {
        stateData.searchText = ''
        stateData.states = ''
      },
      statesOptions: [
        { id: 1, label: '状态一' },
        { id: 2, label: '状态二' },
      ],
    })

    //  分页数据
    const pageData = reactive({
      total: 100,
    })
    return {
      ...toRefs(editData),
      ...toRefs(diaData),
      ...toRefs(tabData),
      ...toRefs(tableData),
      ...toRefs(stateData),
      ...toRefs(pageData),
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
  .select_box {
    background: #ffffff;
    box-sizing: border-box;
    padding: 18px 26px;
    border-radius: 15px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    ::v-deep .el-input__inner {
      border-radius: 19px;
    }
  }

  .tab {
    margin: 10px 0 0 0;
    background: #ffffff;
    box-sizing: border-box;
    padding: 18px 26px;
    border-radius: 15px;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
  }
}
</style>
