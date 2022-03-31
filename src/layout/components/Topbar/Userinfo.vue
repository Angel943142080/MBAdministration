<!--
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * 
 *        佛曰:  
 *                写字楼里写字间，写字间里程序员；  
 *                程序人员写程序，又拿程序换酒钱。  
 *                酒醒只在网上坐，酒醉还来网下眠；  
 *                酒醉酒醒日复日，网上网下年复年。  
 *                但愿老死电脑间，不愿鞠躬老板前；  
 *                奔驰宝马贵者趣，公交自行程序员。  
 *                别人笑我忒疯癫，我笑自己命太贱；  
 *                不见满街漂亮妹，哪个归得程序员？
 * 
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-09-18 15:39:30
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 -->

<template>
  <el-dropdown trigger="click">
    <div class="userinfo">
      <template v-if="!userinfo">
        <i class="el-icon-user" />
        admin
      </template>
      <template v-else>
        <img class="avatar" :src="userinfo.avatar" />
        {{ userinfo.name }}
      </template>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="personalDataClick">个人资料</el-dropdown-item>
        <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
        <lock-modal />
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <Dialog
    v-model:dialogVisible="dialogVisible"
    :confirmDisplay="confirmDisplay"
    :title="dialogTitle"
    :width="dialogWidth"
    :top="dialogTop"
    @on-confirm="onConfirm"
  >
    <div class="personalData">
      <el-row justify="center">
        <el-col :span="5">
          <el-avatar
            :size="70"
            :src="
              'https://img0.baidu.com/it/u=2895625925,2395286370&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
            "
          ></el-avatar>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="3">账号</el-col>
        <el-col :span="5" v-show="!editBtn">
          <div>{{ xinxi.accountNumber }}</div>
        </el-col>
        <el-col :span="5" v-show="editBtn">
          <el-input
            v-model="xinxi.accountNumber"
            placeholder="请输入账号"
          ></el-input>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="3">姓名</el-col>
        <el-col :span="5" v-show="!editBtn">
          <div>{{ xinxi.fullName }}</div>
        </el-col>
        <el-col :span="5" v-show="editBtn">
          <el-input
            v-model="xinxi.fullName"
            placeholder="请输入姓名"
          ></el-input>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="3">性别</el-col>
        <el-col :span="5" v-show="!editBtn">
          <div>{{ xinxi.genderRadio === 1 ? '男' : '女' }}</div>
        </el-col>
        <el-col :span="5" v-show="editBtn">
          <el-radio-group v-model="xinxi.genderRadio">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="3">手机号</el-col>
        <el-col :span="5" v-show="!editBtn">
          <div>{{ xinxi.phoneNumber }}</div>
        </el-col>
        <el-col :span="5" v-show="editBtn">
          <el-input
            v-model="xinxi.phoneNumber"
            placeholder="请输入手机号"
          ></el-input>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="3">密码</el-col>
        <el-col :span="5" v-show="!editBtn">
          <div>{{ xinxi.password }}</div>
        </el-col>
        <el-col :span="5" v-show="editBtn">
          <el-input
            v-model="xinxi.password"
            placeholder="请输入密码"
          ></el-input>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="3">加入日期</el-col>
        <el-col :span="5">
          <div>2022-02-21</div>
        </el-col>
      </el-row>
      <div class="btnBox" v-show="!editBtn">
        <el-button @click="editBtnClick" type="success">编辑</el-button>
      </div>
      <div class="btnBox" v-show="editBtn">
        <el-button @click="cancelClick">取消</el-button>
        <el-button @click="preservationClick" type="success">保存</el-button>
      </div>
    </div>
  </Dialog>
</template>
<script>
import { defineComponent, reactive, getCurrentInstance, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useUserinfo } from '@/components/Avatar/hooks/useUserinfo'
import LockModal from './LockModal.vue'

export default defineComponent({
  components: {
    LockModal,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()

    const { userinfo } = useUserinfo()

    // 退出
    const logout = () => {
      // 清除token
      store.dispatch('app/clearToken')
      router.push('/login')
    }
    // 个人资料
    const personalState = reactive({
      personalDataClick: () => {
        btnState.dialogVisible = true //打开弹窗
        btnState.dialogTitle = '个人资料' //头部标题
      },
      xinxi: {
        accountNumber: 'zhangsansan', //账号
        fullName: '张三三', //姓名
        genderRadio: 1, //性别
        phoneNumber: '18261986632', //手机号
        password: '123456', //密码
      },
      xinxiString: '', //存储原始信息
      editBtn: false, //是否编辑
      // 点击编辑
      editBtnClick: () => {
        personalState.editBtn = !personalState.editBtn
        personalState.xinxiString = JSON.stringify(personalState.xinxi) //记录原始数据
        console.log(personalState.editBtn)
      },
      // 点击取消
      cancelClick: () => {
        personalState.editBtn = !personalState.editBtn
        personalState.xinxi = JSON.parse(personalState.xinxiString) //记录原始数据
      },
      // 点击保存
      preservationClick: () => {
        personalState.editBtn = !personalState.editBtn
      },
    })
    // 按钮/弹窗数据源
    const btnState = reactive({
      isDialogType: '', //弹窗类型  新增/设置角色/设置新密码/编辑/查看
      dialogVisible: false, //是否显示弹窗
      confirmDisplay: false, //隐藏弹窗的确定、取消按钮
      dialogTitle: '', //弹窗头部标题
      dialogWidth: '50%', //弹窗宽度
      dialogTop: '15vh', //弹窗顶部距离
      // 点击确定
      onConfirm: value => {
        // console.log('父组件打印:', value)
        btnState.dialogVisible = false
        proxy.$message.success('发布成功')
      },
    })

    return {
      userinfo, //个人信息
      logout, //退出登录
      ...toRefs(personalState), //个人资料
      ...toRefs(btnState),
    }
  },
})
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 0 16px;
  line-height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #f5f5f5;
  }
  .el-icon-user {
    font-size: 20px;
    margin-right: 8px;
  }
  .avatar {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}

// 个人资料
.personalData {
  .el-row {
    margin-top: 35px;
    .el-col:nth-of-type(1) {
      text-align: center;
      display: flex;
      align-items: center;
    }
  }
  .btnBox {
    float: right;
  }
}
</style>
