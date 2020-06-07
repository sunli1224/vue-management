<template>
  <el-container class="home-container">
    <el-aside width="250px">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <HomeHeader/>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from 'components/common/header/Header'
import Aside from 'components/common/aside/Aside'
import { getNoFloorManagerFloorInfoLogic } from 'network/home'
import HomeHeader from './homeheader/HomeHeader'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    Header,
    Aside
  },
  mounted () {
    getNoFloorManagerFloorInfoLogic(this)
  }
}
</script>

<style scoped>
  .home-container {
    height: 100%;
    width: 100%;
  }
  .el-header {
    background-color: #ffffff;
    padding-left: 0;
    padding-right: 0;
  }

  .el-aside {
    background-color: #304156;
  }

  .el-main {
    background-color: #f0f2f5;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }
</style>
