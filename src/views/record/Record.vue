<template>
  <div class="floor-moudle">
    <div class="floor-search">
      <el-col :span="24">
        <span>记录查询：</span>
        <el-select v-model="searchType" placeholder="学号">
          <el-option :key="index" v-for="(val, index) in searchTypeInfo" :label="val.searchLabel" :value="val.searchValue"/>
        </el-select>
        <el-input
          placeholder="请输入内容"
          @blur="validate"
          v-model="searchContent">
        </el-input>
        <el-button @click="searchMethod" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="addNewFloor = true" type="success" icon="el-icon-edit">添加缺勤记录</el-button>
        <el-button @click="chooseSelection" type="danger"  icon="el-icon-delete">批量删除</el-button>
        <el-button @click="removeSelection" type="warning" icon="el-icon-edit">取消批量选择</el-button>
        <!--导入excel按钮-->
        <el-button @click="createExcel"  type="success">生成excel</el-button>
        <!--弹出层表单-->
        <el-dialog
          title="添加缺勤记录"
          :visible.sync="addNewFloor"
          width="30%"
          @close="$refs['floorForm'].resetFields()"
          center>
          <el-form class="add-form" :model="floorForm" :rules="rules" ref="floorForm" label-width="100px">
            <el-form-item label="学号" prop="stuNum">
              <el-input v-model="floorForm.stuNum">学号</el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="stuName">
              <el-input v-model="floorForm.stuName">姓名</el-input>
            </el-form-item>
            <el-form-item style="width: 10%" label="楼号" prop="floorName">
              <el-select
                @change="searchHos(floorForm.floorName)"
                v-model="floorForm.floorName" placeholder="楼号">
                <el-option :key="index" v-for="(val, index) in getFloorInfoList" :label="val.Label" :value="val.Label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="宿舍号" prop="floorName">
              <el-select style="width: 52%"  v-model="floorForm.hosName" placeholder="宿舍号">
                <el-option :key="index" v-for="(val, index) in getHosList" :label="val.Label" :value="val.Label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="缺勤原因" prop="recordDetail">
              <el-input style="width: 70%" type="textarea" v-model="floorForm.recordDetail">缺勤原因</el-input>
            </el-form-item>
            <el-form-item label="记录时间" prop="recodTime">
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
<!--          prop="recodId"-->
<!--          label="ID"-->
<!--          width="100">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="stuNum"
          label="学生学号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="学生姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="floorName"
          label="楼号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="hosName"
          label="宿舍号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="recordDetail"
          label="缺勤原因"
          width="450">
        </el-table-column>
        <el-table-column
          prop="recodTime"
          label="记录时间"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="removeItem(scope.row)"  type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--修改单个楼宇信息-->
      <el-dialog
        title="修改缺勤记录"
        :visible.sync="changeItemData"
        @close="changeDataClose"
        width="50%"
        center>
        <el-form class="change-form"  :model="floorForm" :rules="rules" ref="floorForm" label-width="100px">
          <HideBtn :judge = 'true' :prop="`stuNum`">
              <el-input slot="hideBtn" placeholder="学号" v-model="floorForm.stuNum">学号</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`stuName`">
            <el-input slot="hideBtn" placeholder="姓名" v-model="floorForm.stuName">姓名</el-input>
          </HideBtn>
          <HideBtn :judge = 'true'  :style="`width: 10%`" :prop="`floorName`">
            <el-select
              slot="hideBtn"
              @change="searchHos(floorForm.floorName)"
              v-model="floorForm.floorName" placeholder="楼号">
              <el-option :key="index" v-for="(val, index) in getFloorInfoList" :label="val.Label" :value="val.Label"></el-option>
            </el-select>
          </HideBtn>
          <HideBtn :judge = 'true'    :prop="`floorName`">
            <el-select slot="hideBtn"  style="width: 20%"  v-model="floorForm.hosName" placeholder="宿舍号">
              <el-option :key="index" v-for="(val, index) in getHosList" :label="val.Label" :value="val.Label"></el-option>
            </el-select>
          </HideBtn>
          <HideBtn :judge = 'true' :style="`width: 30%`"  :prop="`recordDetail`">
            <el-input slot="hideBtn" placeholder="缺勤原因"  style="width: 70%" type="textarea" v-model="floorForm.recordDetail">缺勤原因</el-input>
          </HideBtn>
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
import { RecordChangeRule } from 'data/ruleData'
import { RecordHeader, RecordChangeFilerVal } from 'data/excelData'
import { createExcel } from 'utils/excelUtils'
import { pagingHelperRecordLogic, deleteOneRecordLogic, deleteSomeRecordLogic, searchContentLogic, insertOneRecordLogic, searchHosLogic, changeRecordInfoLogic } from 'network/record'
import { getStoreValue } from 'utils/storage'
import PubSub from 'pubsub-js'
import { mapGetters } from 'vuex'
import HideBtn from 'components/content/hidebtn/HideBtn'
export default {
  name: 'Record',
  components: { HideBtn },
  data () {
    return {
      changeItemData: false,
      rules: RecordChangeRule,
      viewName: '缺勤记录',
      floorForm: {
        stuNum: '',
        stuName: '',
        floorName: '',
        hosName: '',
        recodTime: '',
        recordDetail: ''
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
      OneSelectInfo: {}
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
      getTableData: 'getTableData',
      getPageForm: 'getPageForm',
      getFloorInfoList: 'getFloorInfoList',
      getHosList: 'getHosList'
    })
  },
  mounted () {
    if (getStoreValue('recordPage')) {
      this.handleCurrentChange(getStoreValue('recordPage'))
    } else {
      this.handleCurrentChange(1)
    }
  },
  methods: {
    changeDataClose () {
      this.$refs.floorForm.resetFields()
      PubSub.publish('resetBtn', true)
    },
    searchHos (val) {
      // 根据楼宇查找宿舍
      // alert(val)
      searchHosLogic(this, val)
    },
    createExcel () {
      // excelUtil工具类
      createExcel(this, RecordHeader, RecordChangeFilerVal)
    },
    chooseSelection () {
      // 批量删除
      // console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        var RecordList = []
        this.multipleSelection.forEach(item => {
          RecordList.push(item.recodId)
        })
        deleteSomeRecordLogic(this, RecordList)
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
      // 提交添加表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('提交表单' + this.floorForm.floorName)
          insertOneRecordLogic(this, this.floorForm)
        }
      })
    },
    onChangeSubmit (forName) {
      // 提交修改表单
      this.$refs[forName].validate((valid) => {
        if (valid) {
          console.log(this.OneSelectInfo.recodId)
          // console.log('提交表单' + this.$refs[forName].model.stuNum)
          changeRecordInfoLogic(this, this.OneSelectInfo.recodId, this.floorForm)
          // insertOneRecordLogic(this, this.floorForm)
        }
      })
    },
    validate () {
      console.log('validate')
    },
    handleCurrentChange (val) {
      // 直接跳转到多少也的请求 发起页面跳转axios
      console.log(`当前页数${val}`)
      pagingHelperRecordLogic(this, `${val}`)
    },
    handleClick (val) {
      // 修改记录逻辑
      this.OneSelectInfo = val
      this.changeItemData = true
      // console.log(row.floorId)
    },
    removeItem (row) {
      // 删除记录逻辑
      // console.log(row.recodId)
      deleteOneRecordLogic(this, row.recodId)
    },
    searchMethod () {
      // 搜索请求
      const searchType = this.searchType
      const searchContent = this.searchContent
      // console.log(searchType + '---' + searchContent)
      // 发起axios请求
      // 如果查询成功则执行将分页组件隐藏
      if (searchContent !== '') {
        this.$router.push('/home/record')
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
  .add-form {
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
    z-index: 10;
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
  .change-form {
    padding-left: 20%;
  }
</style>
