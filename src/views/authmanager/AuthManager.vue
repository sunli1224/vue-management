<template>
  <div class="floor-moudle">
    <div class="floor-search">
      <el-col :span="24">
        <span>用户查询查询：</span>
        <el-select style="width: 10%" v-model="searchType" placeholder="用户名">
          <el-option :key="index" v-for="(val, index) in searchTypeInfo" :label="val.searchLabel" :value="val.searchValue"/>
        </el-select>
        <el-input
          placeholder="请输入内容"
          @blur="validate"
          v-model="searchContent">
        </el-input>
        <el-button @click="searchMethod" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="addNewFloor = true" type="success" icon="el-icon-edit">添加用户</el-button>
        <el-button @click="chooseSelection" type="danger"  icon="el-icon-delete">批量删除</el-button>
        <el-button @click="removeSelection" type="warning" icon="el-icon-edit">取消批量选择</el-button>
        <!--导入excel按钮-->
        <el-button @click="createExcel"  type="success">生成excel</el-button>
        <!--弹出层表单-->
        <el-dialog
          title="添加用户"
          :visible.sync="addNewFloor"
          width="30%"
          @close="$refs['floorForm'].resetFields()"
          center>
          <el-form :model="floorForm" :rules="rules" ref="floorForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="floorForm.username">用户名</el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="floorForm.password">密码</el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="floorForm.email">邮箱</el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="floorForm.phone">手机号</el-input>
            </el-form-item>
            <el-form-item style="width: 40%" label="角色" prop="name">
              <el-select  v-model="floorForm.name" placeholder="角色">
                <el-option :key="index" v-for="(val, index) in getPerSonRole" :label="val.Label" :value="val.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" prop="created">
              <el-date-picker
                v-model="floorForm.created"
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
<!--          prop="id"-->
<!--          label="ID"-->
<!--          width="100">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="username"
          label="用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="200">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="250">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户角色"
          width="150">
        </el-table-column>
        <el-table-column
          prop="created"
          label="用户创建时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="updated"
          label="用户更新时间"
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
      <!--修改权限信息-->
      <el-dialog
        title="修改权限信息"
        :visible.sync="changeItemData"
        @close="changeDataClose"
        width="33%"
        center>
        <el-form class="change-form"  :model="floorForm" :rules="rules" ref="floorForm" label-width="100px">
          <HideBtn :judge = 'true' :prop="`username`">
            <el-input slot="hideBtn" placeholder="用户名" v-model="floorForm.username">用户名</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`password`">
            <el-input type="password" slot="hideBtn" placeholder="密码" v-model="floorForm.password">密码</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`email`">
            <el-input  slot="hideBtn" placeholder="邮箱" v-model="floorForm.email">邮箱</el-input>
          </HideBtn>
          <HideBtn :judge = 'true' :prop="`phone`">
            <el-input  slot="hideBtn" placeholder="手机号" v-model="floorForm.phone">手机号</el-input>
          </HideBtn>
          <HideBtn :judge = 'true'  :style="`width: 10%`" :prop="`floorName`">
            <el-select slot="hideBtn"  v-model="floorForm.name" placeholder="角色">
              <el-option :key="index" v-for="(val, index) in getPerSonRole" :label="val.Label" :value="val.value"></el-option>
            </el-select>
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
import { restObj } from '../../utils/objUtils'
import HideBtn from 'components/content/hidebtn/HideBtn'
import { UserInfoRule } from 'data/ruleData'
import { AuthManagerHeader, AuthManagerFilerVal } from 'data/excelData'
import { createExcel } from 'utils/excelUtils'
import { changeAuthMangerInfoLogic, pagingUserInfoLogic, delOneUserInfoLogic, delSomeUserInfoLogic, searchUserInfoLogic, insertOneUserInfoLogic } from 'network/authManager'
import { getStoreValue } from 'utils/storage'
import PubSub from 'pubsub-js'
import { mapGetters } from 'vuex'
export default {
  name: 'AuthManager',
  components: {
    HideBtn
  },
  data () {
    return {
      changeItemData: false,
      rules: UserInfoRule,
      viewName: '权限管理',
      floorForm: {
        username: '',
        password: '',
        email: '',
        phone: '',
        name: '',
        created: ''
      },
      addNewFloor: false,
      show: 'block',
      searchType: 'username',
      searchTypeInfo: [
        {
          searchLabel: '用户名',
          searchValue: 'username'
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
  mounted () {
    if (getStoreValue('authManagerPage')) {
      this.handleCurrentChange(getStoreValue('authManagerPage'))
    } else {
      this.handleCurrentChange(1)
    }
  },
  computed: {
    ...mapGetters({
      getTableData: 'getTableData',
      getPageForm: 'getPageForm',
      getPerSonRole: 'getPerSonRole'
    })
  },
  methods: {
    onChangeSubmit (forName) {
      // 提交修改表单
      this.$refs[forName].validate((valid) => {
        if (valid) {
          // console.log('提交表单' + this.$refs[forName].model.stuNum)
          // changeRecordInfoLogic(this, this.OneSelectInfo.recodId, this.floorForm)
          changeAuthMangerInfoLogic(this, this.OneSelectInfo.id, this.floorForm)
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
      createExcel(this, AuthManagerHeader, AuthManagerFilerVal)
    },
    chooseSelection () {
      if (this.multipleSelection.length > 0) {
        var userList = []
        this.multipleSelection.forEach(item => {
          userList.push(item.id)
        })
        delSomeUserInfoLogic(this, userList)
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
      this.$refs.floorForm.resetFields()
      this.addNewFloor = false
    },
    onsubmit (formName) {
      // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('提交表单' + this.floorForm.empName)
          insertOneUserInfoLogic(this, this.floorForm)
        }
      })
    },
    validate () {
      console.log('validate')
    },
    handleCurrentChange (val) {
      // 直接跳转到多少也的请求 发起页面跳转axios
      console.log(`当前页数${val}`)
      pagingUserInfoLogic(this, `${val}`)
    },
    handleClick (val) {
      // 修改记录逻辑
      this.OneSelectInfo = val
      this.changeItemData = true
      // console.log(row.floorId)
    },
    removeItem (row) {
      // 删除记录逻辑
      // console.log(row.id)
      delOneUserInfoLogic(this, row.id)
    },
    searchMethod () {
      // 搜索请求
      const searchType = this.searchType
      const searchContent = this.searchContent
      // console.log(searchType + '---' + searchContent)
      // 发起axios请求
      // 如果查询成功则执行将分页组件隐藏
      if (searchContent !== '') {
        this.$router.push('/home/authmanager')
        searchUserInfoLogic(this, searchType, searchContent)
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
    padding-left: -5%;
  }
</style>
