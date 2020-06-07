<template>
  <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b">
    <el-submenu :key="val.index+'xx'" v-for="(val) in getRouters " :index="val.index">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ val.firstMoudleName }}</span>
      </template>
      <el-menu-item-group v-for="(item,index) in val.secondMoudle" :key="index">
        <el-menu-item :route="item.secondMoudleRouter" :index="item.index">{{ item.secondMoudleName }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'Aside',
  data () {
    return {
      getRouters: {}
    }
  },
  computed: {
  },
  mounted () {
    console.log(this.$store.getters.getRouters)
    this.getRouters = this.$store.getters.getRouters
  }
}
</script>

<style scoped>
  i {
    color: white;
  }
</style>
