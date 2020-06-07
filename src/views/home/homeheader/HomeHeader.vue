<template>
  <div>
  <el-page-header @back="goBack" :content="getViewName"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeHeader',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getViewName: 'getViewName'
    })
  },
  methods: {
    goBack () {
      this.$router.go(-2)
      setTimeout(() => {
        history.go(0)
      }, 50)
    }
  }
}
</script>

<style scoped>
  div {
    height: 30px;
  }
  .el-page-header {
    border: #f0f2f5 solid 1px;
    background-color: white;
    width: 100%;
    height: 30px;
    position: fixed;
    z-index: 1;
  }
</style>
