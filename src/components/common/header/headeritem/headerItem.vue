<template>
    <div id="header-item">
      <div v-if="postion === 'left'">
        <slot name="header-left">
          <div class="home-header-item">
            <div class="header-title">
              <i class="iconfont icon-caidan"/>
              <span>{{ getViewName }}</span>
            </div>
          </div> <!--左侧-->
        </slot>
      </div>
      <div v-if="postion === 'right'">
        <!--外层弹窗-->
        <el-drawer
          :title="`个人中心`"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleCloses">
          <el-tooltip  effect="dark" content="点我修改头像" placement="top">
          <el-avatar class="admin-img"  :size="180" src="https://empty" @error="errorHandler">
              <img @click="innerChangeImg = true"  :src="getUserInfo.imge"/>
          </el-avatar>
          </el-tooltip>
          <div class="admin-msg">
            <span class="admin-name">{{ getUserInfo.username }}</span>
            <div class="admin-msg-info">
              <div>
                <span class="admin-msg-phone">角色：{{ getUserInfo.name }}</span>
              </div>
              <div>
                <span class="admin-msg-phone">电话号码：{{ getUserInfo.phone }}</span>
              </div>
              <div>
                <span class="admin-msg-email">邮箱：{{ getUserInfo.email }}</span>
              </div>
              <div>
                <span class="admin-msg-updateInfo">账号最新修改时间： {{ getUserInfo.updated }}</span>
              </div>
              <div>
                <span class="admin-msg-createTime">账号创建时间：{{ getUserInfo.created }}</span>
              </div>
            </div>
          </div>
          <div class="demo-drawer__footer">
            <el-button type="success" @click="innerDrawer = true" >修改个人信息</el-button>
            <el-button type="primary" @click="closeMoudle">退出个人中心</el-button>
          </div>
          <!--修改个人头像内层弹窗-->
          <el-drawer
            title="修改头像"
            :append-to-body="true"
            :before-close="handleClosess"
            :visible.sync="innerChangeImg">
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              accept="image/png,image/jpeg"
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
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-drawer>
          <!--内层弹窗-->
          <el-drawer
            title="修改个人信息"
            :append-to-body="true"
            :before-close="handleClose"
            :visible.sync="innerDrawer">
            <el-form
              status-icon
              :rules="rules"
              ref="adminForm"
              :model="adminForm">
              <el-form-item v-if="showPhone" label="手机号" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="adminForm.phone">手机号</el-input>
                <el-button type="text" @click="showPhone = false">移除</el-button>
              </el-form-item>
              <el-form-item v-if="showEmail" label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="adminForm.email">邮箱</el-input>
                <el-button type="text" @click="showEmail = false">移除</el-button>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="cancelForm('adminForm')">取 消</el-button>
              <el-button type="primary" @click="submitForm('adminForm')">提交</el-button>
            </div>
          </el-drawer>
        </el-drawer>
        <slot name="header-right-img">
          <div  class="header-right">
            <span @click="drawer = true">
            <el-avatar   :size="50" src="https://empty" @error="errorHandler">
              <el-tooltip class="item" effect="dark" content="点我打开个人中心" placement="bottom">
              <img :src="getUserInfo.imge"/>
              </el-tooltip>
            </el-avatar>
            </span>
            <el-dropdown>
  <span class="el-dropdown-link">
    <i class="iconfont icon-arrow_down_full"></i>
  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a @click="removeToken">注销</a></el-dropdown-item>
                <el-dropdown-item><a @click="changePass = true" >修改密码</a></el-dropdown-item>
                <el-dropdown-item><a @click="$router.push('/home/Student')">首页</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--修改密码-->
            <el-dialog title="修改密码"
                       :visible.sync="changePass"
                       :center="true"
               >
              <el-form :rules="passRules" status-icon style="margin-left: 20%" :model="form" ref="form">
                <el-form-item label="旧密码" label-width="100px" prop="oldPass">
                  <el-input type="password" v-model="form.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" label-width="100px" prop="newPass">
                  <el-input type="password" v-model="form.newPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" label-width="100px" prop="reNewPass">
                  <el-input type="password" v-model="form.reNewPass" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="reSetCancel('form')">重 置</el-button>
                <el-button type="primary" @click="submitPassForm('form')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </slot>
      </div>
    </div>
</template>

<script>
import { PersonalUserInfoRule } from 'data/ruleData'
import { validateOldPass, validateNewPass } from 'utils/validateData'
import { clearStoreValue } from 'utils/storage'
import { updateUserInfoLogic, updatePassLogic, updateImgLogic } from 'network/PersonalCenter'
import { clearAll } from 'utils/sessionStorage'
import { mapGetters } from 'vuex'
import PubSub from 'pubsub-js'
export default {
  name: 'header-item',
  data () {
    var validateReNewPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      }
      if (value !== this.form.newPass) {
        return callback(new Error('两次密码输入不一致'))
      }
      if (value === this.form.oldPass) {
        return callback(new Error('新密码必须不一致'))
      }
      return callback()
    }
    return {
      showPhone: true,
      showEmail: true,
      innerChangeImg: false,
      form: {
        oldPass: '',
        newPass: '',
        reNewPass: ''
      },
      changePass: false,
      loading: true,
      innerDrawer: false,
      drawer: false,
      direction: 'rtl',
      formLabelWidth: '100px',
      adminForm: {
        phone: '',
        email: ''
      },
      passRules: {
        oldPass: [
          {
            validator: validateOldPass,
            trigger: 'blur'
          }
        ],
        newPass: [
          {
            validator: validateNewPass,
            trigger: 'blur'
          }
        ],
        reNewPass: [
          {
            validator: validateReNewPass,
            trigger: 'blur'
          }
        ]
      },
      rules: PersonalUserInfoRule,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [{ name: '', url: '' }]
    }
  },
  props: {
    postion: {
      type: String,
      require: true,
      default () {
        return 'left'
      }
    }
  },
  created () {
    // 修改视图名称
    PubSub.subscribe('setViewName', (msg, data) => {
      this.$store.dispatch('setViewName', data)
    })
  },
  computed: {
    ...mapGetters({
      getViewName: 'getViewName',
      getUserInfo: 'getUserInfo'
    })
  },
  methods: {
    // 上传文件之前判断文件类型
    beforeUpload (file) {
      console.log('检测类型')
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片必须是JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    // 上传文件个数超过定义的数量
    handleExceed (files, fileList) {
      this.$message({
        type: 'info',
        message: '最多只能上传一个图片',
        duration: 6000
      })
    },
    uploadSuccess (file) {
      const formData = new FormData()
      formData.append('id', this.$store.getters.getUserInfo.id)
      formData.append('imageFile', file.file)
      // this.filesList = formData
      // this.fileName = file.file.name
      updateImgLogic(this, formData)
    },
    handleRemove (file, fileList) {
      this.$message({
        type: 'info',
        message: '已删除原有图片',
        duration: 6000
      })
    },
    removeToken () {
      clearStoreValue('token')
      clearAll()
      this.$router.push('/login')
    },
    submitPassForm (forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          // 获取表单数据
          // console.log(this.form)
          updatePassLogic(this, this.form)
          // 使用axios进行表单提交
        }
      })
      this.changePass = false
      this.$refs[forName].resetFields()
    },
    reSetCancel (formName) {
      this.$refs[formName].resetFields()
      this.changePass = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUserInfoLogic(this, this.adminForm)
        } else {
          // console.log('error submit!!')
          return false
        }
      })
      this.$refs[formName].resetFields()
    },
    cancelForm (formName) {
      this.innerDrawer = false
      this.showPhone = true
      this.showEmail = true
      this.$refs[formName].resetFields()
    },
    errorHandler () {
      return true
    },
    handleCloses (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
      // this.$refs.form.resetFields()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
      this.showPhone = true
      this.showEmail = true
      this.$refs.adminForm.resetFields()
      this.adminForm.email = ''
      this.adminForm.phone = ''
    },
    handleClosess (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closeMoudle () {
      this.drawer = false
    }
  }
}
</script>

<style scoped>
  .upload-demo {
    margin-left: 100px;
    margin-top: 50px;
  }
  .el-form {
    margin-top: 50px;
  }
  .el-form-item {
    margin-top: 50px;
  }
  .el-input {
    width: 400px;
  }
  .demo-drawer__footer {
    margin-left: 170px;
    margin-top: 100px;
  }
  .admin-msg-phone {
    margin-left: -10px;
  }
  .admin-msg-email {
    margin-left: -10px;
  }
  .admin-msg-updateInfo {
    margin-left: -10px;
  }
  .admin-msg-createTime {
    margin-left: -10px;
  }
  .admin-msg-info div {
    margin-top: 20px;
  }
  .admin-msg-info {
    margin-top: 40px;
    margin-left: -60px;
  }
  .admin-msg {
    margin-left: 260px;
  }
  .admin-name {
    font-weight: bolder;
    font-size: 20px;
  }
  .admin-img {
    margin-left: 200px;
  }
  .user-name {
    margin-left: 10px;
  }
  .header-title span {
    margin-top: 20px;
    margin-left: 15px;
    color: darkslategray;
    font-size: 20px;
    font-weight: bolder;
  }
  .icon-caidan {
    margin-left: 10px;
    font-size: 30px;
  }
  .header-right {
    margin-top: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #3c3f41;
  }
  .icon-caidan {
    margin-left: 10px;
    font-size: 30px;
  }
</style>
