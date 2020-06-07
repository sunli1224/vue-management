<template>
   <div id="wrap" class="login_container">
     <canvas id="canvas"/>
     <div class="login_box">
       <div class="avatar_box">
         <img src="../../assets/logo.png">
       </div>
       <el-form ref="loginForm" status-icon :rules="rules" :model="loginForm" label-width="0px" class="login_form">
         <!--用户名-->
         <el-form-item prop="username" :error="userMsg">
           <el-input v-model="loginForm.username"  placeholder="用户名" auto-complete="off">
             <i slot="prefix" class="iconfont icon-ren"></i>
           </el-input>
         </el-form-item>
         <!--密码-->
         <el-form-item prop="password" :error="passMsg">
           <el-input v-model="loginForm.password" type="password" placeholder="密码" auto-complete="off">
             <i slot="prefix" class="iconfont icon-mima"></i>
           </el-input>
         </el-form-item>
         <!--按钮区域-->
         <el-form-item class="btns">
           <el-button v-loading.fullscreen.lock="LoadingJudge" type="primary" @click="submitForm('loginForm')">登录</el-button>
           <el-button @click="resetForm('loginForm')">重置</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>

<script>
import { userNameValidate, passWordValidate } from 'utils/validateData'
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
import { checkLoginInfo } from '../../network/login'
import { setStoreKeyValue } from '../../utils/storage'
export default {
  name: 'Login',
  data () {
    return {
      userMsg: '',
      passMsg: '',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            validator: userNameValidate,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: passWordValidate,
            trigger: 'blur'
          }
        ]
      },
      LoadingJudge: false
    }
  },
  computed: {
  },
  mounted () {
    window.onload = function () {
      const canvas = document.querySelector('canvas')
      if (typeof canvas.getContext === 'undefined') {
        return
      }
      const ctx = canvas.getContext('2d')

      function fitCanvasSize () {
        canvas.width = document.documentElement.clientWidth
        canvas.height = document.documentElement.clientHeight
      }
      fitCanvasSize()
      window.onresize = fitCanvasSize

      var balls = []

      function rand (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      var Ball = function () {
        this.r = rand(10, 18)
        this.x = rand(0 + this.r, canvas.width - this.r)
        this.y = rand(0 + this.r, canvas.height - this.r)
        this.vx = rand(-3, 3)
        this.vy = rand(-3, 3)
        this.opacity = Math.random()
        this.draw = function () {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
          var color = ctx.createRadialGradient(this.x, this.y, this.r * 0.7, this.x, this.y, this.r)
          color.addColorStop(0.6, '#fffbff')
          color.addColorStop(1, '#2e9dff')
          ctx.shadowColor = '#2e9dff'
          ctx.shadowBlur = this.r * 1.3
          ctx.fillStyle = color
          ctx.globalAlpha = this.opacity
          ctx.closePath()
          ctx.fill()
        }
        this.move = function () {
          if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.vx *= -1
          }
          if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.vy *= -1
          }
          this.x += this.vx
          this.y += this.vy
        }
      }

      function density () {
        var i
        for (i = 0; i < 100; i++) {
          balls.push(new Ball())
        }
      }
      density()

      function update () {
        var i
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (i = 0; i < 100; i++) {
          balls[i].draw()
          balls[i].move()
        }
        setTimeout(function () {
          update()
        }, 30)
      }
      update()
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
    history.go(0)
  },
  created () {
  },
  methods: {
    axiosRequest (username, password) {
      checkLoginInfo(username, password).then(res => {
        // console.log('请求数据')
        // console.log(res)
        if (res.code === 200) {
          // 保存token
          // 将用户名信息以及用户的权限和角色信息封装到vuex中
          console.log(res.data.userInfo)
          this.$store.dispatch('setUserStatus', res.data.userInfo).then(r => {
            setStoreKeyValue('token', res.data.token)
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push('/home/Student')
          })
          this.loginForm.username = ''
          this.loginForm.password = ''
        } else {
          if (res.data === 'username') {
            this.userMsg = res.message
            this.$message({
              message: '登录失败',
              type: 'warning'
            })
          } else {
            this.passMsg = res.message
            this.$message({
              message: '登录失败',
              type: 'warning'
            })
          }
        }
        this.LoadingJudge = false
        this.loginForm.username = ''
        this.loginForm.password = ''
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const username = this.$refs[formName].model.username
          const password = this.$refs[formName].model.password
          this.LoadingJudge = true
          this.axiosRequest(username, password)
        } else {
          this.$message({
            message: '登录失败',
            type: 'warning'
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    width: 100%;
  }

  #wrap {
    height: 100%;
    width: 100%;
  }

  canvas {
    position:absolute;
    height: 100%;
    width: 100%;
    z-index:-2;
    display: block;
    background: #0b222c;
  }
  .login_container {
    /*background-color: powderblue;*/
    /*height: 100%;*/
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 25px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .avatar_box {
    height: 130px;
    width: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  .avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
