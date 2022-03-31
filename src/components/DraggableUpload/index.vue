<!--
 * @Description: 图片上传组件
 * @Author: Neo
 * @Date: 2019-12-11
 * @LastEditTime: 2021-11-17
 * @LastEditors: Neo
-->
<template>
  <div class="uploadWrapper">
    <!-- draggable=".draggable-item" -->
    <!-- :class="{ single: isSingle, maxHidden: isMaxHidden }"  -->
    <vuedraggable
      class="vue-draggable"
      v-model="imgList"
      tag="ul"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <li
          class="draggable-item"
          :style="{ width: width + 'px', height: height + 'px' }"
        >
          <el-image :src="element" :preview-src-list="[element]"></el-image>
          <div class="shadow" @click="onRemoveHandler(index)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
      </template>
      <!-- <p>{{ element }}</p> -->

      <!-- 上传按钮 -->
      <template v-slot:footer>
        <el-upload
          ref="uploadRef"
          class="uploadBox"
          :style="{ width: width + 'px', height: height + 'px' }"
          action="https://httpbin.org/post"
          :headers="headers"
          accept=".jpg,.jpeg,.png,.gif"
          :show-file-list="false"
          :multiple="!isSingle"
          :limit="limit"
          :before-upload="beforeUpload"
          :on-success="onSuccessUpload"
          :on-exceed="onExceed"
        >
          <i class="el-icon-plus uploadIcon">
            <span class="uploading" v-show="isUploading">正在上传...</span>
            <span
              v-if="!isUploading && limit && limit !== 99 && !isSingle"
              class="limitTxt"
            >
              最多{{ limit }}张
            </span>
          </i>
          <!-- <div style="font-size:7px;color:#a4a4a4;margin-top:10px">
            图片上传格式支持JPEG、JPG、PNG
          </div> -->
        </el-upload>
      </template>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable' // 一款vue拖拽插件
import { defineComponent, reactive, toRefs, watch, computed, ref } from 'vue'

export default defineComponent({
  name: 'ImgUpload',
  components: { vuedraggable },
  props: {
    // 图片数据(图片url组成的数组) 通过v-model传递
    value: {
      type: Array,
      default() {
        return []
      },
    },
    // 限制上传的图片数量
    limit: {
      type: Number,
      default: 99,
    },
    // 限制上传图片的文件大小(kb)
    size: {
      type: Number,
      default: 500,
    },
    // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
    isSingle: {
      type: Boolean,
      default: false,
    },
    // 是否使用图片压缩
    useCompress: {
      type: Boolean,
      default: false,
    },
    // 图片显示的宽度(px)
    width: {
      type: Number,
      default: 100,
    },
    // 图片显示的高度(px)
    height: {
      type: Number,
      default: 100,
    },
  },
  setup(props, content) {
    console.log(props, content, 'props,content')
    const upload = reactive({
      headers: {}, //上传头部信息
      isUploading: false, // 正在上传状态
      isFirstMount: true, // 控制防止重复回显
      // 控制达到最大限制时隐藏上传按钮
      isMaxHidden() {
        return this.imgList.length >= this.limit
      },
      // 上传图片之前
      beforeUpload(file) {
        console.log(file)
      },
      // 上传完单张图片
      onSuccessUpload(res, file, fileList) {
        console.log(res, file, fileList)
      },
      // 移除单张图片
      onRemoveHandler(index) {
        console.log(index)
      },
      // 超限
      onExceed() {},
      onDragStart(e) {
        e.target.classList.add('hideShadow')
      },
      onDragEnd(e) {
        e.target.classList.remove('hideShadow')
      },
    })
    const imgList = computed({
      get() {
        return props.value
      },
      set(val) {
        // 同步v-model
        content.$emit('input', val)
      },
    })
    // const state = reactive({
    //   imgList: [
    //     'https://s0.2mdn.net/simgad/15128749641359755215',
    //     'https://img-blog.csdnimg.cn/20201014180756927.png?x-oss-process=image/resize,m_fixed,h_64,w_64',
    //     'https://img-blog.csdnimg.cn/20201014180756724.png?x-oss-process=image/resize,m_fixed,h_64,w_64',
    //   ],
    // })

    // watch(props.value, (newValue, oldValue) => {
    //   console.log(newValue, oldValue)
    // })
    return {
      ...toRefs(upload), //解构数据
      imgList,
      // ...toRefs(state), //可以拖拽的图片列表
    }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.item {
  width: 200px;
  height: 100px;
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  margin: 10px;
  background-color: #42b983;
  color: #ffffff;
}

::v-deep(.el-upload) {
  width: 100%;
  height: 100%;
}
// 上传按钮
.uploadIcon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  border-radius: 6px;
  font-size: 20px;
  color: #999;
  .limitTxt,
  .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}
// 拖拽
.vue-draggable {
  display: flex;
  flex-wrap: wrap;
  .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    .el-image {
      width: 100%;
      height: 100%;
    }
    .shadow {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      padding: 2px;
      cursor: pointer;
    }
    &:hover {
      .shadow {
        opacity: 1;
      }
    }
  }
  &.hideShadow {
    .shadow {
      display: none;
    }
  }
  &.single {
    overflow: hidden;
    position: relative;
    .draggable-item {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  &.maxHidden {
    ::v-deep .uploadBox {
      width: 200px !important;
      display: none;
    }
  }
}
</style>
