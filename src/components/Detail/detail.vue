<template>
  <div>
    <el-dialog
      title="会员详情"
      v-model="visible"
      :width="width"
      @close="onClose"
      :top="top"
    >
      <div>
        <div class="main_wrap">
          <div class="item">
            <el-row>
              <el-col :span="18">
                <el-row align="middle">
                  <el-col :span="6">
                    <el-image
                      style="width: 73px; height: 73px;border-radius:50%"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      fit="fit"
                    />
                  </el-col>
                  <el-col :span="18">
                    <el-row :gutter="10">
                      <el-col :span="24">Arron Lee</el-col>
                    </el-row>
                    <el-row :gutter="10" style="margin-top:5px">
                      <el-col :span="12">User ID:00001</el-col>
                      <el-col :span="12" style="margin-top:5px;">
                        性别：男
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row style="margin-top:0px">
                  <el-col :span="3" :offset="2">状态：</el-col>
                  <el-col :span="2">冻结</el-col>
                  <el-col :span="3"><el-switch v-model="value" /></el-col>
                  <el-col :span="3">正常</el-col>
                </el-row>
              </el-col>
              <el-col :span="5">
                <div v-show="states === 0" class="states">
                  已签约
                </div>
                <div v-show="states === 1" class="states">
                  未签约
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;" align="middle">
              <el-col :span="4">租房期限：</el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                />
              </el-col>
              <el-col :span="4">
                <el-button>更新</el-button>
              </el-col>
            </el-row>
            <el-row style="margin-top:13px;">
              <el-col :span="4">电子合约:</el-col>
              <el-col :span="20">
                <upload />
              </el-col>
            </el-row>
            <el-row align="middle" style="margin-top:20px;">
              <el-col :span="17">
                <el-row align="middle">
                  <el-col :span="6">新合约房租:</el-col>
                  <el-col :span="5">
                    <el-input v-model="input" placeholder="请输入" />
                  </el-col>
                  <el-col :span="2" :offset="1">/月</el-col>
                </el-row>
                <el-row style="margin-top:10px;" align="middle">
                  <el-col :span="6">公司:</el-col>
                  <el-col :span="10">
                    <el-input v-model="company" placeholder="请输入" />
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button>更新</el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-button type="primary">新合约推送提醒</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row align="middle" style="margin-top:13px;">
              <el-col :span="4">注册日期</el-col>
              <el-col :span="10">
                <el-input v-model="input" placeholder="Please input" />
              </el-col>
            </el-row>
            <el-row align="middle" style="margin-top:13px;">
              <el-col :span="4">用户积分</el-col>
              <el-col :span="10">
                <el-input v-model="input" placeholder="Please input" />
              </el-col>
              <el-col :span="4" :offset="1">
                <el-button type="primary" @click="openRecord(7)">
                  详情
                </el-button>
              </el-col>
            </el-row>
            <el-row align="middle" style="margin-top:13px;">
              <el-col :span="4">用户手机</el-col>
              <el-col :span="10">
                <el-input v-model="input" placeholder="Please input" />
              </el-col>
              <el-col :span="4" :offset="1">
                <el-button type="primary">查看</el-button>
              </el-col>
            </el-row>
            <el-row align="middle" style="margin-top:13px;">
              <el-col :span="3">房间号</el-col>
              <el-col :span="4">A308</el-col>
              <el-col :span="3">房型</el-col>
              <el-col :span="4">温馨型</el-col>
              <el-col :span="4" :offset="1">
                <el-button type="primary">更新</el-button>
              </el-col>
            </el-row>
            <el-row class="mt-15" v-if="states === 1">
              <el-col :span="21">
                <div class="cost_wrap">
                  <div class="d-f jc-sb">
                    <div class="d-f">
                      <div class="mr-20">水电费</div>
                      <div class="mr-20">2021-05-15 至 2021-06-15</div>
                    </div>
                    <div>历史水电费</div>
                  </div>
                  <div class="d-f jc-sb ai-c mt-24">
                    <div class="">水费</div>
                    <div class="fee_box ">0.00</div>
                    <div class="">电费</div>
                    <div class="fee_box">0.00</div>
                    <div class="">物业费</div>
                    <div class="fee_box ">0.00</div>
                    <div>水电费</div>
                  </div>
                  <div class="d-f ai-c jc-sb mt-24">
                    <div>支付状态：未结清/已结清</div>
                    <el-button type="primary">
                      推送账单
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top:30px;">
              <el-col :span="7">
                <el-button class="my_btn" @click="openRecord(1)">
                  历史租约
                </el-button>
              </el-col>
              <el-col :span="7">
                <el-button class="my_btn">历史开门记录</el-button>
              </el-col>
              <el-col :span="7">
                <el-button class="my_btn" @click="openRecord(3)">
                  实名信息
                </el-button>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="7" v-show="states === 0">
                <el-button class="my_btn" @click="openRecord(4)">
                  我邀请的会员
                </el-button>
              </el-col>
              <el-col :span="7" v-show="states === 1">
                <el-button class="my_btn">
                  新合约推送提醒
                </el-button>
              </el-col>
              <el-col :span="7">
                <el-button class="my_btn" @click="openRecord(5)">
                  支付记录
                </el-button>
              </el-col>
              <el-col :span="7">
                <el-button class="my_btn">报修记录</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <div style="margin-top: 20px" v-if="states === 0">
        <el-table :data="data" style="width: 100%">
          <el-table-column type="index" label="序号" />
          <el-table-column prop="room" label="房间号" />
          <el-table-column prop="name" label="入住会员" />
          <el-table-column prop="num" label="会员数" />
          <el-table-column label="租期">
            <template #default="scope">
              {{ scope.row.date }} 至 {{ scope.row.endDate }}
            </template>
          </el-table-column>
          <el-table-column label="房间类型">
            <template #default="scope">
              <div v-show="scope.row.type === 0">温馨型</div>
              <div v-show="scope.row.type === 1">白领精致型</div>
              <div v-show="scope.row.type === 2">土豪型</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row justify="end" style="margin-top: 20px" v-if="states === 0">
        <el-col :span="4">
          <el-button type="info">添加房间</el-button>
        </el-col>
      </el-row>
      <template #footer>
        <el-row align="bottom">
          <el-col :span="12">
            <div style="text-align:left">会员备注信息</div>
            <div style="margin-top: 10px">
              <el-input
                size="large"
                v-model="remarks"
                :autosize="{ minRows: 4 }"
                type="textarea"
                placeholder="请输入"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <span class="dialog-footer" v-show="confirmDisplay">
              <el-button size="mini" @click="onClose">取 消</el-button>
              <el-button size="mini" type="primary" @click="onConfirm">
                提交
              </el-button>
            </span>
          </el-col>
        </el-row>
      </template>
    </el-dialog>

    <!-- 二级弹窗 -->
    <!-- 支付记录 -->
    <pay-record
      :id="10"
      :dialogVisible="payPop"
      @updateSwitch="closeRecord"
      title="arrron 支付记录"
    />
    <!-- 实名信息 -->
    <person-info
      :id="10"
      :dialogVisible="infoPop"
      title="arrron的实名信息"
      @updateSwitch="closeRecord"
    />
    <!-- 邀请的会员 -->
    <invite
      :id="10"
      :dialogVisible="memPop"
      title="arrron邀请的会员"
      @updateSwitch="closeRecord"
    />
    <!-- 租约 -->
    <lease
      :id="10"
      :dialogVisible="rentPop"
      title="历史租约"
      @updateSwitch="closeRecord"
    />
    <!-- 积分详情 -->
    <integral
      :id="10"
      :dialogVisible="integralPop"
      title="积分详情"
      @updateSwitch="closeRecord"
    />
    <!-- 添加房间
    <integral
      :id="10"
      :dialogVisible="integralPop"
      title="添加房间"
      @updateSwitch="closeRecord"
    /> -->
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, watch } from 'vue'
import upload from '@/components/DraggableUpload/index.vue' //上传组件
import payRecord from '@/components/Payrecord/index.vue' //支付记录
import personInfo from '@/components/Personinfo/index.vue' //实名信息
import invite from '@/components/Invite/index.vue' //邀请的会员
import lease from '@/components/Lease/index.vue' //历史租约
import integral from '@/components/Integral/index.vue' //积分详情
export default defineComponent({
  components: {
    upload,
    payRecord,
    personInfo,
    invite,
    lease,
    integral,
  },
  name: 'Dialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    confirmDisplay: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '60%',
    },
    top: {
      type: String,
      default: '15vh',
    },
  },
  setup(props, content) {
    const { dialogVisible, title, confirmDisplay } = toRefs(props)
    const state = reactive({
      value: true,
      date: '', //日期
      visible: dialogVisible.value,
      title: title.value,
      states: 1, //是否签约
      remarks: '这个客户胡搅蛮缠，不好处理',
      confirmDisplay: confirmDisplay.value,
      data: [
        {
          room: 'A305',
          name: 'arron',
          num: 1,
          date: '2012-05-15',
          endDate: '2012-08-14',
          type: 0,
        },
        {
          room: 'A305',
          name: 'arron',
          num: 1,
          date: '2012-05-15',
          endDate: '2012-08-14',
          type: 1,
        },
        {
          room: 'A305',
          name: 'arron',
          num: 1,
          date: '2012-05-15',
          endDate: '2012-08-14',
          type: 2,
        },
      ],
    })

    watch(
      [dialogVisible, title, confirmDisplay],
      ([newDialogVisible, newTitle, newConfirmDisplay]) => {
        state.visible = newDialogVisible
        state.title = newTitle
        state.confirmDisplay = newConfirmDisplay
      },
      { immediate: true }
    )

    const onClose = () => {
      content.emit('updateSwitch', false) //关闭开关
    }

    const onConfirm = () => {
      content.emit('on-confirm', '子组件的值')
    }

    //打开不同的记录弹窗
    const sPop = reactive({
      integralPop: false, //积分详情
      payPop: false, //支付记录
      servicePop: false, //报修记录
      infoPop: false, //实名信息
      rentPop: false, //历史租约信息
      doorPop: false, //历史开门信息
      memPop: false, //我邀请的会员
      openRecord: e => {
        if (e === 1) {
          sPop.rentPop = true
          return
        }
        if (e === 3) {
          sPop.infoPop = true
          return
        }
        if (e === 4) {
          sPop.memPop = true
          return
        }
        if (e === 5) {
          sPop.payPop = true
          return
        }
        if (e === 7) {
          sPop.integralPop = true
          return
        }
      },
      closeRecord: e => {
        if (e === 1) {
          sPop.rentPop = false
          return
        }
        if (e === 3) {
          sPop.infoPop = false
          return
        }
        if (e === 4) {
          sPop.memPop = false
          return
        }
        if (e === 5) {
          sPop.payPop = false
          return
        }
        if (e === 7) {
          sPop.integralPop = false
          return
        }
      },
    })

    return {
      ...toRefs(state),
      ...toRefs(sPop),
      onClose,
      onConfirm,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.el-dialog) {
  border-radius: 15px;
}
.main_wrap {
  display: flex;
  .item {
    width: 50%;
    &:last-child {
      box-sizing: border-box;
      padding: 0 0 0 50px;
    }
    .states {
      width: 100px;
      height: 100px;
      background: #3f9dff;
      color: #ffffff;
      font-size: 14px;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      &:last-child {
        background: #bbbbbb;
      }
    }
    .my_btn {
      width: 130px !important;
      height: 57px;
      font-size: 14px !important;
      background: #2a2a2a;
      color: rgba(253, 253, 253, 100);
      border-radius: 4px;
      border: none;
    }
    .cost_wrap {
      background: #2a2a2a;
      color: #ffffff;
      border-radius: 10px;
      padding: 20px;
      .fee_box {
        padding: 5px 20px 5px 5px;
        background: #ffffff;
        color: rgba(136, 136, 136, 100);
      }
    }
  }
}
</style>
