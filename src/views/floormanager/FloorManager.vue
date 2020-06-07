<template>
  <div class="floor-moudle">
    <div class="floor-search">
      <el-col :span="24">
        <span>楼宇管理员查询：</span>
        <el-select style="width: 10%" v-model="searchType" placeholder="楼号">
          <el-option :key="index" v-for="(val, index) in searchTypeInfo" :label="val.searchLabel" :value="val.searchValue"/>
        </el-select>
        <el-input
          placeholder="请输入内容"
          @blur="validate"
          v-model="searchContent">
        </el-input>
        <el-button @click="searchMethod" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="addNewFloor = true" type="success" icon="el-icon-edit">添加楼宇管理员</el-button>
        <el-button @click="chooseSelection" type="danger"  icon="el-icon-delete">批量删除</el-button>
        <el-button @click="removeSelection" type="warning" icon="el-icon-edit">取消批量选择</el-button>
        <!--导入excel按钮-->
        <el-button @click="createExcel"  type="success">生成excel</el-button>
        <!--弹出层表单-->
        <el-dialog
          title="添加楼宇管理员"
          :visible.sync="addNewFloor"
          width="30%"
          @close="$refs['floorForm'].resetFields()"
          center>
          <el-form :model="floorForm" :rules="rules" ref="floorForm" label-width="100px">
            <el-form-item label="员工姓名" prop="empName">
              <el-input v-model="floorForm.empName">员工姓名</el-input>
            </el-form-item>
            <el-form-item label="员工编号" prop="empNum">
              <el-input v-model="floorForm.empNum">员工编号</el-input>
            </el-form-item>
            <el-form-item style="width: 10%" label="性别" prop="empSex">
              <el-select  v-model="floorForm.empSex" placeholder="性别">
                <el-option :key="index" v-for="(val, index) in getPersonSex" :label="val.Label" :value="val.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="empAge">
              <el-input v-model="floorForm.empAge">年龄</el-input>
            </el-form-item>
            <el-form-item style="width: 40%" label="员工职位" prop="empPosition">
              <el-select  v-model="floorForm.empPosition" placeholder="员工职位">
                <el-option :key="index" v-for="(val, index) in getPersonPosition" :label="val.Label" :value="val.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 10%" label="楼号" prop="floorName">
              <el-select  v-model="floorForm.floorName" placeholder="楼号">
                <el-option :key="index" v-for="(val, index) in getFloorInfoList" :label="val.Label" :value="val.Label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="empAddress">
              <el-input v-model="floorForm.empAddress">地址</el-input>
            </el-form-item>
            <el-form-item label="电话" prop="empPhone">
              <el-input v-model="floorForm.empPhone">电话</el-input>
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
<!--          prop="empId"-->
<!--          label="ID"-->
<!--          width="120">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="empNum"
          label="员工工号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="empName"
          label="员工姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="empSex"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="empAge"
          label="年龄"
          width="150">
        </el-table-column>
        <el-table-column
          prop="empPosition"
          label="职位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="empPhone"
          label="手机号"
          width="240">
        </el-table-column>
        <el-table-column
          prop="empAddress"
          label="住址"
          width="240">
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
      <!--修改员工信息-->
      <el-dialog
        title="修改员工信息"
        :visible.sync="changeItemData"
        @close="changeDataClose"
        width="30%"
        center>
        <el-form class="change-form"  :model="floorForm"  ref="floorForm" label-width="100px">
          <HideBtn :judge = 'true' :prop="`empName`">
            <el-input slot="hideBtn" placeholder="员工姓名" v-model="floorForm.empName">员工姓名</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`empAddress`">
            <el-select slot="hideBtn"  v-model="floorForm.empSex" placeholder="性别">
              <el-option :key="index" v-for="(val, index) in getPersonSex" :label="val.Label" :value="val.value"></el-option>
            </el-select>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`empNum`">
            <el-input slot="hideBtn" placeholder="编号" v-model="floorForm.empNum">编号</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`empAge`">
            <el-input slot="hideBtn" placeholder="年龄" v-model="floorForm.empAge">年龄</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`empPosition`">
            <el-select slot="hideBtn"  v-model="floorForm.empPosition" placeholder="员工职位">
              <el-option :key="index" v-for="(val, index) in getPersonPosition" :label="val.Label" :value="val.value"></el-option>
            </el-select>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`empPhone`">
            <el-input slot="hideBtn" placeholder="手机号" v-model="floorForm.empPhone">手机号</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`empAddress`">
            <el-input slot="hideBtn" placeholder="住址" v-model="floorForm.empAddress">住址</el-input>
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
import HideBtn from 'components/content/hidebtn/HideBtn'
import { FloorMannagerChangeRule } from 'data/ruleData'
import { floorManagerHeader, floorManagerFilerVal } from 'data/excelData'
import { createExcel } from 'utils/excelUtils'
import { getStoreValue } from 'utils/storage'
import { changeFloorManagerInfoLogic, pagingHelperempLogic, deleteOneRecordLogic, deleteAllRecordLogic, searchContentLogic, insertOneFloorInfoLogic } from 'network/floorManager'
import PubSub from 'pubsub-js'
import { mapGetters } from 'vuex'
export default {
  name: 'FloorManager',
  components: {
    HideBtn
  },
  data () {
    return {
      changeItemData: false,
      rules: FloorMannagerChangeRule,
      viewName: '楼宇管理员管理',
      floorForm: {
        empName: '',
        empPhone: '',
        empNum: '',
        empSex: '',
        empAge: '',
        empAddress: '',
        empPosition: '',
        floorName: ''
      },
      addNewFloor: false,
      show: 'block',
      searchType: 'empNum',
      searchTypeInfo: [
        {
          searchLabel: '楼宇管理员工号',
          searchValue: 'empNum'
        },
        {
          searchLabel: '楼宇管理员姓名',
          searchValue: 'empName'
        }
      ],
      searchContent: '',
      multipleSelection: [],
      floorManagerCollections: [
        {
          empId: 1,
          empLabel: '张三'
        },
        {
          empId: 2,
          empLabel: '李四'
        }
      ],
      OneSelectInfo: {}
    }
  },
  created () {
    // 修改视图名称逻辑 通过pubsub向headerItem通信修改vuex内的视图名称
    PubSub.publish('setViewName', this.viewName)
    // 用vuex更新表格数据复用性高
    this.$store.dispatch('getTableData', this.tableData)
  },
  mounted () {
    if (getStoreValue('empPage')) {
      this.handleCurrentChange(getStoreValue('empPage'))
    } else {
      this.handleCurrentChange(1)
    }
  },
  computed: {
    ...mapGetters({
      getTableData: 'getTableData',
      getPageForm: 'getPageForm',
      getPersonSex: 'getPersonSex',
      getPersonPosition: 'getPersonPosition',
      getFloorInfoList: 'getFloorInfoList'
    })
  },
  methods: {
    onChangeSubmit (forName) {
      // 提交修改表单
      this.$refs[forName].validate((valid) => {
        if (valid) {
          console.log(this.OneSelectInfo.recodId)
          // console.log('提交表单' + this.$refs[forName].model.stuNum)
          // changeRecordInfoLogic(this, this.OneSelectInfo.recodId, this.floorForm)
          changeFloorManagerInfoLogic(this, this.OneSelectInfo.empId, this.floorForm)
          // insertOneRecordLogic(this, this.floorForm)
        }
      })
    },
    changeDataClose () {
      this.$refs.floorForm.resetFields()
      PubSub.publish('resetBtn', true)
    },
    createExcel () {
      // excelUtil工具类
      createExcel(this, floorManagerHeader, floorManagerFilerVal)
    },
    chooseSelection () {
      // 批量删除
      // console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        var empIdList = []
        this.multipleSelection.forEach(item => {
          empIdList.push(item.empId)
        })
        deleteAllRecordLogic(this, empIdList)
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
          // console.log('提交表单' + this.floorForm.empName)
          insertOneFloorInfoLogic(this, this.floorForm)
        }
      })
    },
    validate () {
      console.log('validate')
    },
    handleCurrentChange (val) {
      // 直接跳转到多少也的请求 发起页面跳转axios
      console.log(`当前页数${val}`)
      pagingHelperempLogic(this, `${val}`)
    },
    handleClick (val) {
      // 修改记录逻辑
      this.OneSelectInfo = val
      this.changeItemData = true
      // console.log(row.floorId)
    },
    removeItem (row) {
      // 删除记录逻辑
      // console.log(row.empId)
      deleteOneRecordLogic(this, row.empId)
    },
    searchMethod () {
      // 搜索请求
      const searchType = this.searchType
      const searchContent = this.searchContent
      // console.log(searchType + '---' + searchContent)
      // 发起axios请求
      // 如果查询成功则执行将分页组件隐藏
      if (searchContent !== '') {
        this.$router.push('/home/floormanager')
        searchContentLogic(this, searchType, searchContent)
        this.show = 'none'
      } else {
        this.$message({
          message: '搜索字段不能为空',
          type: 'warning'
        })
      }
      // 搜索结束后清除input内容
      this.searchContent = ''
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
    margin-left: 80px;
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
    z-index: 10;
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
    padding-left: -4%;
  }
</style>
