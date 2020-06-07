<template>
    <div class="stu-moudle">
      <div class="stu-search">
        <el-col :span="24">
          <span>学生查询：</span>
          <el-select v-model="searchType" placeholder="学号">
            <el-option :key="index" v-for="(val, index) in searchTypeInfo"  :label="val.searchLabel" :value="val.searchValue"/>
          </el-select>
          <el-input
            placeholder="请输入内容"
            v-model="searchContent">
          </el-input>
          <el-button @click="searchMethod" type="primary" icon="el-icon-search">搜索</el-button>
          <el-button @click="chooseSelection" type="danger"  icon="el-icon-delete">批量删除</el-button>
          <el-button @click="removeSelection" type="warning" icon="el-icon-edit">取消批量选择</el-button>
          <!--导入excel按钮-->
          <el-button @click="createExcel"  type="success">生成excel</el-button>
          <el-button @click="getFile" type="primary" icon="el-icon-search">下载上传样例表</el-button>
          <el-button @click="uploadExcel = true" type="danger"  icon="el-icon-delete">添加学生信息</el-button>
          <el-drawer
            title="上传并批量添加用户"
            :append-to-body="true"
            :before-close="handleClosess"
            :visible.sync="uploadExcel">
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              :multiple="false"
              :file-list="fileList"
              :limit="1"
              :http-request="uploadSuccess"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
            >
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
            </el-upload>
            <el-button class="upload-excel" @click="addAllMethod" type="primary" icon="el-icon-search">批量添加</el-button>
          </el-drawer>
        </el-col>
      </div>
      <div class="stu-content">
        <el-table
          :data="getTableData"
          border
          ref="tableStudentForm"
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
<!--          <el-table-column-->
<!--            fixed-->
<!--            prop="stuId"-->
<!--            label="ID"-->
<!--            width="50">-->
<!--          </el-table-column>-->
          <el-table-column
            prop="stuName"
            label="姓名"
            width="140">
          </el-table-column>
          <el-table-column
            prop="stuNum"
            label="学号"
            width="140">
          </el-table-column>
          <el-table-column
            prop="stuSex"
            label="性别"
            width="140">
          </el-table-column>
          <el-table-column
            prop="stuProfession"
            label="专业"
            width="140">
          </el-table-column>
          <el-table-column
            prop="stuClass"
            label="班级"
            width="140">
          </el-table-column>
          <el-table-column
            prop="stuSess"
            label="届数"
            width="140">
          </el-table-column>
          <el-table-column
            prop="stuPhoneNumber"
            label="电话号码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="hosNum"
            label="宿舍号"
            width="140">
          </el-table-column>
          <el-table-column
            prop="floorName"
            label="楼号"
            width="140">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="delOneSelection(scope.row)"  type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--修改单个楼宇信息-->
        <el-dialog
          title="修改学生信息记录"
          :visible.sync="changeItemData"
          @close="changeDataClose"
          width="50%"
          center>
          <el-form class="change-form"  :model="stuInfoForm" :rules="rule" ref="stuInfoForm" label-width="100px">
            <HideBtn :judge = 'true' :prop="`stuNum`">
              <el-input slot="hideBtn" placeholder="学号" v-model="stuInfoForm.stuNum">学号</el-input>
            </HideBtn>
            <HideBtn :judge = 'true' :prop="`stuName`">
              <el-input slot="hideBtn" placeholder="姓名" v-model="stuInfoForm.stuName">姓名</el-input>
            </HideBtn>
            <HideBtn :judge = 'true' :prop="`stuSex`">
              <el-select slot="hideBtn"  v-model="stuInfoForm.stuSex" placeholder="性别">
                <el-option :key="index" v-for="(val, index) in getPersonSex" :label="val.Label" :value="val.value"></el-option>
              </el-select>
            </HideBtn>
            <HideBtn :judge = 'true' :prop="`stuProfession`">
              <el-input slot="hideBtn" placeholder="专业" v-model="stuInfoForm.stuProfession">专业</el-input>
            </HideBtn>
            <HideBtn :judge = 'true' :prop="`stuClass`">
              <el-input slot="hideBtn" placeholder="班级" v-model="stuInfoForm.stuClass">班级</el-input>
            </HideBtn>
            <HideBtn :judge = 'true' :prop="`stuSess`">
              <el-input slot="hideBtn" placeholder="届数" v-model="stuInfoForm.stuSess">届数</el-input>
            </HideBtn>
            <HideBtn :judge = 'true' :prop="`stuPhoneNumber`">
              <el-input slot="hideBtn" placeholder="手机号" v-model="stuInfoForm.stuPhoneNumber">手机号</el-input>
            </HideBtn>
          </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="changeDataClose">重置</el-button>
    <el-button type="primary" @click="onChangeSubmit('stuInfoForm')">提交</el-button>
  </span>
        </el-dialog>
        <div :style="{display: show}" class="stu-footer">
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
import { stuHeader, stuFilerVal } from 'data/excelData'
import { createExcel } from 'utils/excelUtils'
import PubSub from 'pubsub-js'
import { mapGetters } from 'vuex'
import { addAllLogic, uploadOneLogic, changeStuInfoLogic, pageHelperAxiosLogic, deleteOneRecordLogic, deleteAllRecordLogic, searchServiceLogic } from 'network/student'
import { getStoreValue } from 'utils/storage'
import { StuInfoRule } from 'data/ruleData'
export default {
  name: 'Student',
  components: {
    HideBtn
  },
  data () {
    return {
      fileList: [{ name: '', url: '' }],
      uploadExcel: false,
      OneSelectInfo: {},
      rule: StuInfoRule,
      stuInfoForm: {
        stuName: '',
        stuNum: '',
        stuSex: '',
        stuProfession: '',
        stuClass: '',
        stuSess: '',
        stuPhoneNumber: ''
      },
      changeItemData: false,
      multipleSelection: [],
      show: 'block',
      searchType: 'stuNum',
      searchTypeInfo: [
        {
          searchLabel: '学号',
          searchValue: 'stuNum'
        },
        {
          searchLabel: '姓名',
          searchValue: 'stuName'
        }
      ],
      searchContent: '',
      viewName: '学生管理'
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
    // 请求第一页分页数据
    if (getStoreValue('stuPage')) {
      this.handleCurrentChange(getStoreValue('stuPage'))
    } else {
      this.handleCurrentChange(1)
    }
  },
  computed: {
    ...mapGetters({
      getTableData: 'getTableData',
      getPersonSex: 'getPersonSex',
      getPageForm: 'getPageForm'
    })
  },
  methods: {
    handleRemove (file, fileList) {
      this.$message({
        type: 'info',
        message: '已删除原有Excel文件',
        duration: 6000
      })
    },
    handleExceed (files, fileList) {
      this.$message({
        type: 'info',
        message: '最多只能上传一份Excel文件',
        duration: 6000
      })
    },
    // 上传文件之前判断文件类型
    beforeUpload (file) {
      console.log('检测类型')
      const isExcel1 = file.type === 'application/vnd.ms-excel'
      const isExcel2 = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      // const isLt2M = file.size / 1024 / 1024 < 2

      if (!isExcel1 && !isExcel2) {
        this.$message.error('上传图片必须是Excel格式!')
      }
      return (isExcel1 || isExcel2)
    },
    uploadSuccess (file) {
      const formData = new FormData()
      // formData.append('id', this.$store.getters.getUserInfo.id)
      formData.append('excelFile', file.file)
      // this.filesList = formData
      // this.fileName = file.file.name
      // 上传axios
      uploadOneLogic(this, formData)
      // updateImgLogic(this, formData)
    },
    addAllMethod () {
      addAllLogic(this)
    },
    handleClosess (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getFile () {
      // 触发文件地址，下载文件
      window.open('http://qa17s84ln.bkt.clouddn.com/123.xlsx?', '_blank')
    },
    onChangeSubmit (forName) {
      // 提交修改表单
      this.$refs[forName].validate((valid) => {
        if (valid) {
          console.log(this.OneSelectInfo.recodId)
          // console.log('提交表单' + this.$refs[forName].model.stuNum)
          // changeRecordInfoLogic(this, this.OneSelectInfo.recodId, this.floorForm)
          changeStuInfoLogic(this, this.OneSelectInfo.stuId, this.stuInfoForm)
          // insertOneRecordLogic(this, this.floorForm)
        }
      })
    },
    changeDataClose () {
      this.$refs.stuInfoForm.resetFields()
      PubSub.publish('resetBtn', true)
    },
    createExcel () {
      // excelUtil工具类
      createExcel(this, stuHeader, stuFilerVal)
    },
    chooseSelection () {
      // 批量删除
      // console.log(this.multipleSelection)
      if (this.multipleSelection.length > 0) {
        var stuList = []
        this.multipleSelection.forEach(item => {
          stuList.push(item.stuNum)
        })
        deleteAllRecordLogic(this, stuList)
      } else {
        this.$message({
          message: '请先选择后，再删除',
          type: 'warning'
        })
      }
    },
    removeSelection () {
      // 取消批量选择
      this.$refs.tableStudentForm.clearSelection()
    },
    handleSelectionChange (val) {
      // 批量选择赋值
      console.log(val)
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      console.log(`当前页数${val}`)
      // axios分页请求
      pageHelperAxiosLogic(this, `${val}`)
    },
    delOneSelection (row) {
      // 删除记录逻辑
      // console.log('删除记录' + row.stuNum)
      deleteOneRecordLogic(this, row.stuNum)
    },
    handleClick (val) {
      // 修改记录逻辑
      // console.log(row.stuId)
      this.OneSelectInfo = val
      this.changeItemData = true
    },
    cancelForm (formName) {
      this.closeForm(formName)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.$refs[formName].model)
          console.log('submit!!')
        } else {
          console.log('error submit!!')
        }
      })
      this.closeForm(formName)
    },
    searchMethod () {
      // 搜索请求
      // searchType: '',
      // searchContent: '',
      const searchType = this.searchType
      const searchContent = this.searchContent
      // console.log(searchType + '---' + searchContent)
      if (searchContent !== '') {
        this.$router.push('/home/Student')
        console.log(searchType + '---' + searchContent)
        searchServiceLogic(this, searchType, searchContent)
        this.show = 'none'
      } else {
        this.$message({
          message: '搜索字段不能为空',
          type: 'warning'
        })
      }
      // 发起axios请求
      // 如果查询成功则执行将分页组件隐藏
      // 搜索结束后清除input内容
      this.searchContent = ''
    }
  }
}
</script>

<style scoped>
  .change-one-form {
    margin-left: 250px;
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
  .stu-footer {
    background-color: white;
    border-top: #f0f2f5 solid 1px;
    height: 71px;
    position:fixed;
    bottom:0;
    width:100%;
    z-index: 10;
  }
  .stu-search {
    background-color: white;
    height: 40px;
    border-top: #f0f2f5 solid 1px;
    position: static;
  }
  .el-col {
    position: fixed;
    height: 40px;
    z-index: 10;
  }
  .stu-search span {
    margin-left: 20px;
  }
  .stu-content {
    height: 500px;
    border: #f0f2f5 solid 1px;
  }
  .stu-moudle {
    border: #f0f2f5 solid 1px;
  }
  .el-page-header {
  background-color: white;
  width: 100%;
  height: 30px;
  }
  .el-table {
    width: 250px;
  }
  .change-form {
    padding-left: 25%;
  }
  .upload-demo {
    margin-left: 100px;
    margin-top: 50px;
  }
  .upload-excel {
    margin-left: 60%;
    margin-top: -10%;
  }
</style>
