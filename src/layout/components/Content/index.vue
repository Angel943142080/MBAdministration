<!--
 * _______________#########_______________________ 
 * ______________############_____________________ 
 * ______________#############____________________ 
 * _____________##__###########___________________ 
 * ____________###__######_#####__________________ 
 * ____________###_#######___####_________________ 
 * ___________###__##########_####________________ 
 * __________####__###########_####_______________ 
 * ________#####___###########__#####_____________ 
 * _______######___###_########___#####___________ 
 * _______#####___###___########___######_________ 
 * ______######___###__###########___######_______ 
 * _____######___####_##############__######______ 
 * ____#######__#####################_#######_____ 
 * ____#######__##############################____ 
 * ___#######__######_#################_#######___ 
 * ___#######__######_######_#########___######___ 
 * ___#######____##__######___######_____######___ 
 * ___#######________######____#####_____#####____ 
 * ____######________#####_____#####_____####_____ 
 * _____#####________####______#####_____###______ 
 * ______#####______;###________###______#________ 
 * ________##_______####________####______________ 
 * 
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-21 12:46:17
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 -->

<template>
  <router-view v-slot="{ Component }">
    <!-- mode="out-in" -->
    <transition name="slide-left" mode="out-in">
      <keep-alive :include="cacheList">
        <component :is="Component" :key="key" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const cacheList = computed(() => store.state.tags.cacheList)
    const key = computed(() => route.fullPath)
    // console.log(key)
    return {
      cacheList,
      key,
    }
  },
})
</script>

<style scoped>
.slide-left-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-left-enter-to {
  transform: translateX(0px);
}

.slide-left-leave-from {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.1s;
}
</style>
