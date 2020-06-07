<template>
  <div class="floor-moudle">
    <div class="floor-search">
      <el-col :span="24">
        <span>寝室调换记录查询：</span>
        <el-select style="width: 8%" v-model="searchType" placeholder="学号">
          <el-option :key="index" v-for="(val, index) in searchTypeInfo" :label="val.searchLabel" :value="val.searchValue"/>
        </el-select>
        <el-input
          placeholder="请输入内容"
          v-model="searchContent">
        </el-input>
        <el-button @click="searchMethod" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="addNewFloor = true" type="success" icon="el-icon-edit">添加新记录</el-button>
        <el-button @click="chooseSelection" type="danger"  icon="el-icon-delete">批量删除</el-button>
        <el-button @click="removeSelection" type="warning" icon="el-icon-edit">取消批量选择</el-button>
        <!--导入excel按钮-->
        <el-button @click="createExcel"  type="success">生成excel</el-button>
        <!--弹出层表单-->
        <el-dialog
          title="添加新记录"
          :visible.sync="addNewFloor"
          width="30%"
          @close="$refs['floorForm'].resetFields()"
          center>
          <el-form :model="floorForm" :rules="rules" ref="floorForm" label-width="100px">
            <el-form-item label="学生学号" prop="stuNum">
              <el-input v-model="floorForm.stuNum">学生学号</el-input>
            </el-form-item>
            <el-form-item label="学生姓名" prop="stuName">
              <el-input v-model="floorForm.stuName">学生姓名</el-input>
            </el-form-item>
            <el-form-item label="原宿舍" prop="oldHosName">
              <el-input v-model="floorForm.oldHosName">原宿舍</el-input>
            </el-form-item>
            <el-form-item label="原楼号" prop="oldFloorName">
              <el-input v-model="floorForm.oldFloorName">原楼号</el-input>
            </el-form-item>
            <el-form-item label="现宿舍" prop="newHosName">
              <el-input v-model="floorForm.newHosName">现宿舍</el-input>
            </el-form-item>
            <el-form-item label="现楼号" prop="newFloorName">
              <el-input v-model="floorForm.newFloorName">现楼号</el-input>
            </el-form-item>
            <el-form-item label="调换原因" prop="detail">
              <el-input type="textarea" v-model="floorForm.detail">调换原因</el-input>
            </el-form-item>
            <el-form-item label="记录时间">
              <el-date-picker
                v-model="floorForm.recodTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit(floorForm)">取 消</el-button>
    <el-button type="primary" @click="onsubmit('floorForm')">提交</el-button>
  </span>
        </el-dialog>
      </el-col>
    </div>
    <div class="floor-content">
      <el-table
        :data="getTableData"
        border
        ref="tableFloorForm"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
<!--        <el-table-column-->
<!--          fixed-->
<!--          prop="derId"-->
<!--          label="ID"-->
<!--          width="80">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="stuNum"
          label="学号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="学生姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="oldHosName"
          label="原宿舍"
          width="100">
        </el-table-column>
        <el-table-column
          prop="oldFloorName"
          label="原楼号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="newHosName"
          label="现宿舍"
          width="100">
        </el-table-column>
        <el-table-column
          prop="newFloorName"
          label="现楼号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="detail"
          label="调换原因"
          width="450">
        </el-table-column>
        <el-table-column
          prop="recodTime"
          label="记录时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="removeItem(scope.row)"  type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--修改寝室调换信息-->
      <el-dialog
        title="修改权限信息"
        :visible.sync="changeItemData"
        @close="changeDataClose"
        width="40%"
        center>
        <el-form class="change-form"  :model="floorForm" :rules="rules" ref="floorForm" label-width="100px">
          <el-form-item label="调换原因" prop="detail">
            <el-input type="textarea" v-model="floorForm.detail">调换原因</el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="changeDataClose">重置</el-button>
    <el-button type="primary" @click="onChangeSubmit('floorForm')">提交</el-button>
  </span>
      </el-dialog>
      <div :style="{display: show}" class="floor-footer">
        <el-col :span="10">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="getPageForm.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="getPageForm.total">
          </el-pagination>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import { restObj } from 'utils/objUtils'
import { HostelChangeRule } from 'data/ruleData'
import { HostelChangeOneInput, copyHostelChangeOneInput } from 'data/dataConstruction'
import { HostelChangeHeader, HostelChangeFilerVal } from 'data/excelData'
import { createExcel } from 'utils/excelUtils'
import { getStoreValue } from 'utils/storage'
import { changeDorInfoLogic, pagingHelperDorInfoLogic, delOneInfoLogic, delSomeDorInfoLogic, insertOneDorInfoLogic, searchStuNameLogic } from 'network/dor'
import PubSub from 'pubsub-js'
import { mapGetters } from 'vuex'
export default {
  name: 'HostelChange',
  data () {
    return {
      changeItemData: false,
      rules: HostelChangeRule,
      viewName: '寝室调换记录',
      floorForm: {
        stuNum: '',
        stuName: '',
        oldHosName: '',
        oldFloorName: '',
        newHosName: '',
        newFloorName: '',
        detail: '',
        recodTime: ''
      },
      addNewFloor: false,
      show: 'block',
      searchType: 'stuNum',
      searchTypeInfo: [
        {
          searchLabel: '学号',
          searchValue: 'stuNum'
        },
        {
          searchLabel: '学生姓名',
          searchValue: 'stuName'
        }
      ],
      searchContent: '',
      multipleSelection: [],
      OneSelectInfo: {},
      changeOneInput: HostelChangeOneInput
    }
  },
  created () {
    // 修改视图名称逻辑 通过pubsub向headerItem通信修改vuex内的视图名称
    PubSub.publish('setViewName', this.viewName)
    // 用vuex更新表格数据复用性高
    this.$store.dispatch('getTableData', this.tableData)
  },
  mounted () {
    if (getStoreValue('hosChangePage')) {
      this.handleCurrentChange(getStoreValue('hosChangePage'))
    } else {
      this.handleCurrentChange(1)
    }
  },
  computed: {
    ...mapGetters({
      getTableData: 'getTableData',
      getPageForm: 'getPageForm'
    })
  },
  methods: {
    onChangeSubmit (forName) {
      // 提交修改表单
      this.$refs[forName].validate((valid) => {
        if (valid) {
          changeDorInfoLogic(this, this.OneSelectInfo.derId, this.floorForm)
          // console.log('提交表单' + this.$refs[forName].model.stuNum)
          // changeRecordInfoLogic(this, this.OneSelectInfo.recodId, this.floorForm)
          // changeAuthMangerInfoLogic(this, this.OneSelectInfo.id, this.floorForm)
          // insertOneRecordLogic(this, this.floorForm)
        }
      })
    },
    changeDataClose () {
      // 重置表单数据
      restObj(this)
      PubSub.publish('resetBtn', true)
    },
    createExcel () {
      // excelUtil工具类
      createExcel(this, HostelChangeHeader, HostelChangeFilerVal)
    },
    closeForm (forName) {
      this.changeItemData = false
      this.$refs[forName].resetFields()
      this.changeOneInput = copyHostelChangeOneInput
    },
    chooseSelection () {
      // 批量删除
      // console.log(this.multipleSelection)
      // 批量删除
      // console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        var dorList = []
        this.multipleSelection.forEach(item => {
          dorList.push(item.derId)
        })
        delSomeDorInfoLogic(this, dorList)
      } else {
        this.$message({
          message: '请先选择后，再删除',
          type: 'warning'
        })
      }
    },
    removeSelection () {
      // 取消批量选择
      this.$refs.tableFloorForm.clearSelection()
    },
    handleSelectionChange (val) {
      // 批量选择赋值
      console.log(val)
      this.multipleSelection = val
    },
    cancelSubmit (val) {
      // 取消提交
      console.log('取消提交' + val)
      this.addNewFloor = false
    },
    onsubmit (formName) {
      // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('提交表单' + this.floorForm.floorName)
          insertOneDorInfoLogic(this, this.floorForm)
          // this.addNewFloor = false
        }
      })
    },
    handleCurrentChange (val) {
      // 直接跳转到多少也的请求 发起页面跳转axios
      console.log(`当前页数${val}`)
      pagingHelperDorInfoLogic(this, `${val}`)
    },
    handleClick (val) {
      // 修改记录逻辑
      this.OneSelectInfo = val
      this.changeItemData = true
      // console.log(row.floorId)
    },
    removeItem (row) {
      // 删除记录逻辑
      // console.log(row.floorId)
      delOneInfoLogic(this, row.derId)
    },
    searchMethod () {
      // 搜索请求
      const searchType = this.searchType
      const searchContent = this.searchContent
      // console.log(searchType + '---' + searchContent)
      // 发起axios请求
      // 如果查询成功则执行将分页组件隐藏
      if (searchContent !== '') {
        this.$router.push('/home/hostelchange')
        searchStuNameLogic(this, searchType, searchContent)
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
    height: 71px;
    position:fixed;
    bottom:0;
    width:100%;
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
