<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-23 15:16:12
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="home">
    <header>
      <div class="title">
        <p>关键指标</p>
      </div>
      <el-row class="ul">
        <el-col :span="6">
          <div class="li odd">
            <div>注册会员</div>
            <p>2523</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="li even">
            <div>今日新增</div>
            <p>77</p>
            <div>
              日
              <span>&uarr;</span>
              79.07%
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="li odd">
            <div>签约会员</div>
            <p>2387</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="li even">
            <div>今日新增签约会员</div>
            <p>67</p>
            <div>
              日
              <span>↑</span>
              52.27%
            </div>
          </div>
        </el-col>
      </el-row>
    </header>
    <!-- tab 折线图 echarts -->
    <div class="tabs">
      <el-tabs
        v-model="tabPosition"
        type="border-card"
        @tab-click="handleClick"
        style="margin-bottom: 30px"
      >
        <el-tab-pane label="小时指标" name="houl">小时指标</el-tab-pane>
        <el-tab-pane label="注册会员" name="register">
          <el-row>
            <el-col :span="20">
              <div id="register"></div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="进入新增" name="getInto">进入新增</el-tab-pane>
        <el-tab-pane label="签约会员" name="signContract">签约会员</el-tab-pane>
        <el-tab-pane label="新增签约" name="newlyAdded">新增签约</el-tab-pane>
      </el-tabs>
    </div>

    <!-- 房源信息 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="15">
          <div id="housingResources"></div>
        </el-col>
        <!-- 待租房源 -->
        <el-col :span="9">
          <div id="toBeRented"></div>
        </el-col>
      </el-row>
    </div>
    <!-- 爱好分布 -->
    <div class="hobby">
      <el-row :gutter="10">
        <el-col :span="15">
          <div class="hobbyDistribution">
            <div class="hobbyTitle">爱好分布</div>
            <ul>
              <li>
                <div>篮球</div>
                <div>21%</div>
              </li>
              <li>
                <div>电竞</div>
                <div>58%</div>
              </li>
              <li>
                <div>美食</div>
                <div>40%</div>
              </li>
              <li>
                <div>足球</div>
                <div>5%</div>
              </li>
              <li>
                <div>数码科技</div>
                <div>13%</div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="9">
          <!-- 待租房源 -->
          <div id="signContract"></div>
        </el-col>
      </el-row>
    </div>
    <!-- 年龄分布 -->
    <div class="ageBox">
      <el-row :gutter="10">
        <!-- 年龄柱状图 -->
        <el-col :span="15">
          <div id="age"></div>
        </el-col>
        <!-- 性别饼状图 -->
        <el-col :span="9">
          <div id="gender"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'home',
  setup() {
    const echarts = getCurrentInstance().proxy.$echarts
    const tabPosition = ref('register') //默认tabs

    onMounted(() => {
      // 注册会员DOM
      let register = echarts.init(document.getElementById('register'))
      // 房源信息DOM
      let housingResources = echarts.init(
        document.getElementById('housingResources')
      )
      // 待租房源DOM
      let toBeRented = echarts.init(document.getElementById('toBeRented'))
      // 签约饼状图
      let signContract = echarts.init(document.getElementById('signContract'))
      // 年龄柱状图
      let age = echarts.init(document.getElementById('age'))
      // 性别饼状图
      let gender = echarts.init(document.getElementById('gender'))

      // 注册会员折线图
      const registerOption = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['今天', '昨天', '7天前', '30天前'],
          bottom: 0,
          selected: {
            昨天: false,
            '7天前': false,
            '30天前': false,
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '12%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          // data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '今天',
            type: 'line',
            stack: 'Total',
            // data: [120, 132, 101, 134, 90, 230, 210],
            data: [
              {
                value: ['2022-2-22 10:12', 684],
              },
              {
                value: ['2022-2-22 11:11', 200],
              },
              {
                value: ['2022-2-22 12:11', 300],
              },
            ],
          },
          {
            name: '昨天',
            type: 'line',
            stack: 'Total',
            data: [
              {
                value: ['2022-2-21 7:12', 1084],
              },
              {
                value: ['2022-2-21 10:12', 84],
              },
              {
                value: ['2022-2-21 22:12', 184],
              },
            ],
          },
          {
            name: '7天前',
            type: 'line',
            stack: 'Total',
            data: [
              {
                value: ['2022-2-15 6:12', 1084],
              },
              {
                value: ['2022-2-17 12:12', 2084],
              },
              {
                value: ['2022-2-19 18:12', 384],
              },
            ],
          },
          {
            name: '30天前',
            type: 'line',
            stack: 'Total',
            data: [
              {
                value: ['2022-1-21 2:12', 10],
              },
              {
                value: ['2022-1-12 9:12', 222],
              },
              {
                value: ['2022-1-10 23:12', 587],
              },
            ],
          },
        ],
      }
      // 房源信息柱状图
      const housingResourcesOption = {
        title: {
          text: '房源信息',
          left: 10,
          top: 10,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          top: 10,
          data: ['房源', '已租'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['精选双人房', '智慧主题房', '白领精致房', '雅致行政房'],
        },
        series: [
          {
            name: '房源',
            type: 'bar',
            data: [29034, 104970, 131744, 630230],
            itemStyle: {
              normal: {
                color: '#5087EC',
              },
            },
          },
          {
            name: '已租',
            type: 'bar',
            data: [31000, 121594, 134141, 681807],
            itemStyle: {
              normal: {
                color: '#68BBC4',
              },
            },
          },
        ],
      }
      // 待租房源饼状图
      const toBeRentedOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['房源', '待租房源'],
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: 1548, name: '房源' },
              { value: 735, name: '待租房源' },
            ],
            itemStyle: {
              normal: {
                color: function(params) {
                  // console.log(params)
                  //自定义颜色
                  var colorList = ['#5087EC', '#68BBC4']
                  return colorList[params.dataIndex]
                },
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      // 签约饼状图
      const signContractOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: ['签约', '预约'],
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: 335, name: '签约' },
              { value: 734, name: '预约' },
            ],
            itemStyle: {
              normal: {
                color: function(params) {
                  // console.log(params)
                  //自定义颜色
                  var colorList = ['#E4C477', '#D97559']
                  return colorList[params.dataIndex]
                },
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      // 年龄柱状图
      const ageOption = {
        title: {
          text: '年龄分布',
          left: 10,
          top: 10,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '未知',
              '0-17岁',
              '18-24岁',
              '25-29岁',
              '30-34岁',
              '35-39岁',
              '40岁以上',
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            show: false,
          },
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      }
      // 性别饼状图
      const genderOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          top: 10,
          left: 'center',
          data: ['男', '女', '其他'],
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: 1548, name: '男' },
              { value: 735, name: '女' },
              { value: 510, name: '其他' },
            ],
            itemStyle: {
              normal: {
                color: function(params) {
                  // console.log(params)
                  //自定义颜色
                  var colorList = ['#5087EC', '#68BBC4', '#58A55C']
                  return colorList[params.dataIndex]
                },
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }

      register.setOption(registerOption) //注册会员折线图
      housingResources.setOption(housingResourcesOption) //房源信息柱状图
      toBeRented.setOption(toBeRentedOption) //待租房源饼状图
      signContract.setOption(signContractOption) //签约饼状图
      age.setOption(ageOption) //年龄柱状图
      gender.setOption(genderOption) //性别饼状图
      // 调整折线图宽度
      let clientWidth =
        document.getElementsByClassName('tabs')[0].clientWidth - 30 //获取父元素宽度并赋值折线图
      // console.log(clientWidth)
      if (register) {
        register.resize({ width: `${clientWidth}px` })
      }
    })
    const handleClick = (tab, event) => {
      // console.log(tab)
      let label = tab.props.label
      if (label === '注册会员') {
        let register = echarts.init(document.getElementById('register'))
        let clientWidth =
          document.getElementsByClassName('tabs')[0].clientWidth - 30 //获取父元素宽度并赋值折线图
        // console.log(clientWidth)
        if (register) {
          register.resize({ width: `${clientWidth}px` })
        }
      }
    }

    return {
      tabPosition: tabPosition.value, //tab值
      handleClick, //tab事件
    }
  },
})
</script>

<style lang="scss" scoped>
.home {
  color: $mainColor;
  background-color: #f4f7ff;
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  header {
    .title {
      background-color: #ffffff;
      padding: 9px 15px;
      color: rgba(16, 16, 16, 100);
    }
    .ul {
      margin-top: 14px;
      .li {
        box-sizing: border-box;
        background-color: #ffffff;
        height: 153px;
        border: 1px solid rgba(238, 238, 238, 100);
        color: #000000;
        padding: 32px 30px 25px 30px;
        span {
          color: rgba(255, 0, 0, 100);
          font-weight: 600;
          font-size: 18px;
        }
      }
      .odd {
        p {
          font-size: 48px;
          line-height: 70px;
          margin-top: 6px;
          font-weight: 600;
        }
      }
      .even {
        p {
          font-size: 30px;
          line-height: 44px;
          margin-top: 6px;
          font-weight: 600;
        }
      }
    }
  }

  .tabs {
    margin-top: 11px;
    ::v-deep(.is-top) {
      color: #101010;
    }
    ::v-deep(.is-active) {
      color: #ffffff;
      background-color: #447ed9;
    }
    ::v-deep(.el-tabs__item):hover {
      color: none;
    }
  }
  //注册会员折线图
  #register {
    width: 84vw;
    height: 311px;
  }
  // 房源信息柱状图
  #housingResources {
    height: 311px;
    background-color: #ffffff;
  }
  // 待租房源饼状图
  #toBeRented {
    height: 311px;
    background-color: #ffffff;
  }
  // 签约饼状图
  #signContract {
    height: 311px;
    background-color: #ffffff;
  }
  #age {
    height: 311px;
    background-color: #ffffff;
  }
  #gender {
    height: 311px;
    background-color: #ffffff;
  }
  // 爱好分布
  .hobby {
    margin-top: 10px;
    .hobbyDistribution {
      background-color: #ffffff;
      padding: 16px 14px;
      height: 311px;
      box-sizing: border-box;
      .hobbyTitle {
        font-weight: 600;
        font-size: 17px;
        color: #484848;
      }
      ul {
        display: flex;
      }
      li {
        list-style: none;
        color: #101010;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        div:nth-of-type(2) {
          margin-top: 6px;
        }
      }
      li:nth-of-type(1) {
        width: 5vw;
        height: 5vw;
        background-color: #a4ffe7;
        margin-top: 24px;
        margin-left: 10%;
      }
      li:nth-of-type(2) {
        width: 7vw;
        height: 7vw;
        background-color: #ffa4d6;
        margin-top: 77px;
        margin-left: 3%;
      }
      li:nth-of-type(3) {
        width: 8vw;
        height: 8vw;
        background-color: #ffec59;
        margin-left: 3%;
      }
      li:nth-of-type(4) {
        width: 4vw;
        height: 4vw;
        background-color: #ecc781;
        margin-top: 149px;
        margin-left: 3%;
      }
      li:nth-of-type(5) {
        width: 8vw;
        height: 8vw;
        background-color: #a286f9;
        margin-top: 42px;
        margin-left: 3%;
      }
    }
  }
  // 年龄canvas
  .ageBox {
    margin-top: 10px;
  }
}
</style>
