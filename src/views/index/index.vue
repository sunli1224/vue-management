<template>
  <el-card class="box-card">
    <el-col :lg="10">
      <ve-pie :settings="chartSettings" :data="chartData"/>
    </el-col>
    <el-col :lg="10">
    <ve-ring :settings="{offsetY: 160}" :data="chartData"/>
    </el-col>
    <el-col :lg="10">
      <ve-line :settings="chartSettings" :data="chartDatas"/>
    </el-col>
    <el-col :lg="10">
      <ve-radar :settings="chartSettings" :data="chartDatas"/>
    </el-col>
  </el-card>
</template>

<script>
import PubSub from 'pubsub-js'
import { rowData, rowDatas } from '../../data/dataConstruction'

export default {
  name: 'index',
  data () {
    return {
      viewName: '数据面板',
      chartSettings: {
        radius: 100,
        offsetY: 160
      },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: rowData
      },
      chartDatas: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: rowDatas
      }
    }
  },
  created () {
    // 修改视图名称逻辑 通过pubsub向headerItem通信修改vuex内的视图名称
    PubSub.publish('setViewName', this.viewName)
    // 用vuex更新表格数据复用性高
    // this.$store.dispatch('getTableData', this.tableData)
    // 在页面加载时读取sessionStorage里的状态信息
  },
  mounted () {
  }
}
</script>

<style scoped>
  .el-col {
    margin-left: 5%;
  }
  .el-card {
    height: 93%;
    margin-left: 2%;
    margin-top: 1%;
  }
  .box-card {
    width: 95%;
  }
</style>
