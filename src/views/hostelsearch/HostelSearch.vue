<template>
  <div class="floor-moudle">
    <div class="floor-search">
      <el-col :span="24">
        <span>楼宇查询：</span>
        <el-select v-model="searchType" placeholder="楼号">
          <el-option :key="index" v-for="(val, index) in searchTypeInfo" :label="val.searchLabel" :value="val.searchValue"/>
        </el-select>
        <el-input
          placeholder="请输入内容"
          v-model="searchContent">
        </el-input>
        <el-button @click="searchMethod" type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </div>
    <div class="floor-content">
      <el-table
        :data="getTableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="150">
        </el-table-column>
<!--        <el-table-column-->
<!--          fixed-->
<!--          prop="hosId"-->
<!--          label="ID"-->
<!--          width="160">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="hosNum"
          label="宿舍号"
          width="250">
        </el-table-column>
        <el-table-column
          prop="floorName"
          label="楼号"
          width="240">
        </el-table-column>
        <el-table-column
          prop="floorDetail"
          label="备注"
          width="305">
        </el-table-column>
        <el-table-column
          prop="hosNewStuNum"
          label="已住人数"
          width="240">
        </el-table-column>
        <el-table-column
          prop="hosOldStuNum"
          label="可住人数"
          width="240">
        </el-table-column>
        <el-table-column
          prop="remaining"
          label="剩余人数"
          width="240">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { FloorChangeRule } from 'data/ruleData'
import { searchContentLogic } from 'network/HostelSearch'
import PubSub from 'pubsub-js'
import { mapGetters } from 'vuex'
export default {
  name: 'HostelSearch',
  data () {
    return {
      changeItemData: false,
      rules: FloorChangeRule,
      viewName: '寝室查询',
      addNewFloor: false,
      show: 'block',
      searchType: 'floorName',
      searchTypeInfo: [
        {
          searchLabel: '楼号',
          searchValue: 'floorName'
        }],
      searchContent: ''
    }
  },
  created () {
    // 修改视图名称逻辑 通过pubsub向headerItem通信修改vuex内的视图名称
    PubSub.publish('setViewName', this.viewName)
    // 用vuex更新表格数据复用性高
    this.$store.dispatch('getTableData', this.tableData)
  },
  computed: {
    ...mapGetters({
      getTableData: 'getTableData'
    })
  },
  methods: {
    cancelForm (formName) {
      this.closeForm(formName)
    },
    closeChangeItemData (formName) {
      this.closeForm(formName)
    },
    searchMethod () {
      // 搜索请求
      const searchType = this.searchType
      const searchContent = this.searchContent
      // console.log(searchType + '---' + searchContent)
      // 发起axios请求
      // 如果查询成功则执行将分页组件隐藏
      if (searchContent !== '') {
        this.$router.push('/home/hostelsearch')
        searchContentLogic(this, searchType, searchContent)
        this.show = 'none'
      } else {
        this.$message({
          message: '搜索字段不能为空',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>
  .change-one-form {
    margin-left: 200px;
  }
  .change-one-form div span {
    font-size: 25px;
  }
  .change-one-form div {
    margin-top: 20px;
  }
  .el-form {
    margin-left: 40px;
  }
  .el-button {
    margin-left: 20px;
  }
  .el-select {
    width: 100px;
    margin-right: 20px;
  }
  .el-input {
    width: 200px;
  }
  .el-pagination {
    margin-top: 18px;
    margin-left: 500px;
  }
  .floor-footer {
    background-color: white;
    border-top: #f0f2f5 solid 1px;
    height: 65px;
  }
  .floor-search {
    background-color: white;
    height: 40px;
    border-top: #f0f2f5 solid 1px;
    position: static;
  }
  .floor-search span {
    margin-left: 20px;
  }
  .floor-content {
    height: 500px;
    border: #f0f2f5 solid 1px;
  }
  .floor-moudle {
    border: #f0f2f5 solid 1px;
  }
  .el-page-header {
    background-color: white;
    width: 100%;
    height: 30px;
  }
  .el-table {
    width: 250px;
    /*margin-left: 500px;*/
  }
  .el-col {
    position: fixed;
    height: 40px;
    z-index: 10;
  }
</style>
