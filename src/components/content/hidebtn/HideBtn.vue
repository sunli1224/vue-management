<template>
  <span v-if="judgeReal">
    <el-form-item prop="prop">
    <slot name="hideBtn"/>
    <el-button type="text" @click="judgeReal = false">移除</el-button>
    </el-form-item>
  </span>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  name: 'HideBtn',
  data () {
    return {
      judgeReal: this.judge
    }
  },
  props: {
    judge: {
      type: Boolean,
      require: true,
      default () {
        return true
      }
    },
    prop: {
      type: String,
      require: true,
      default () {
        return ''
      }
    }
  },
  mounted () {
    PubSub.subscribe('resetBtn', (msg, data) => {
      this.judgeReal = data
    })
  }
}
</script>

<style scoped>
  .el-button {
    margin-left: 1%;
    /*margin-top: -60%;*/
  }
  .el-form-item {
    padding-top: 2%;
  }
</style>
