<template>
  <div class="login-box">
    <div class="login-bg">
      <img src="http://placehold.it/400x400" alt="">
    </div>
    <div class="extra">
      <i class="el-icon-close"></i>
    </div>
    <div class="content">
      <div class="project">
        <div class="project-img">
          <!--<el-image src="http://placehold.it/80x80"></el-image>-->
          <svg-icon icon-class="example"></svg-icon>
          <p>GITHUB</p>
        </div>
        <div class="project-img">
          <el-image src="http://placehold.it/80x80"></el-image>
          <p>码云</p>
        </div>
      </div>

      <el-form ref="login" :model="form" :rules="formRules">
        <el-form-item prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password"></el-input>
          <el-button class="login" round @click="login" icon="el-icon-right"></el-button>
        </el-form-item>
      </el-form>
      <div class="tools">
        <div class="left">
          <el-checkbox v-model="isRemember">记住密码</el-checkbox>
          <el-checkbox v-model="isAutoLogin">自动登录</el-checkbox>
        </div>
        <div class="right">
          <p v-model="isRemember">找回密码</p>
          <p v-model="isAutoLogin">注册账号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const { ipcRenderer } = require('electron')

  export default {
    name: 'index',
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        formRules: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, message: '密码至少为六位数', trigger: 'blur'}
          ]
        },
        isRemember: false,
        isAutoLogin: false,
        mainWindow: ""
      }
    },
    methods: {
      login() {
        this.$refs['login'].validate(valid => {
          if (valid) {
            this.$message({type: 'success', message: '登录成功', duration: 2000})
            this.$router.push('/home')
            ipcRenderer.send('changWindowSize')
          }
        })
      },
      createWindow() {
        this.mainWindow = new BrowserWindow({
          height: 600,
          useContentSize: true,
          width: 1200,
          frame: false,
          resizable: false, // 可否缩放
          movable: true // 可否移动
        })
        //
        console.log(this.mainWindow)
        this.mainWindow.loadURL(winURL)
        // this.mainWindow.on('closed', () => {
        //   this.mainWindow = null
        // })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-box {
    -webkit-app-region: drag;
    position: relative;
    height: 100%;
    overflow: hidden;
    .login-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 400px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .extra {

      position: fixed;
      top: 0;
      right: 10px;
      i {
        -webkit-app-region: no-drag;
        font-size: 24px;
        padding: 10px;
        cursor: pointer;
        color: #ababab;
      }
    }
    .content {
      margin-left: 400px;
      height: 100%;
      padding: 20px 30px;
      .project {
        display: flex;
        justify-content: center;
        padding: 0 20px;
        .project-img {
          -webkit-app-region: no-drag;
          display: inline-block;
          margin: 70px auto 70px;
          width: 60px;
          .el-image {
            border-radius: 100%;
          }
          p {
            text-align: center;
            font-size: 14px;
          }
        }
      }
      .el-form {
        -webkit-app-region: no-drag;
        margin-bottom: 20px;
        .el-input {
          /deep/ .el-input__inner {
            border: none;
            border-bottom: 1px solid #ccc;
            border-radius: 0;
            font-size: 16px;
            padding: 10px 50px 10px 5px;
          }
        }
        .login {
          position: absolute;
          top: 0;
          right: 0;
          padding: 6px;
        }
      }
      .tools {
        -webkit-app-region: no-drag;
        position: absolute;
        bottom: 20px;
        width: 220px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        .left {
          float: left;
          .el-checkbox {
            display: block;
            line-height: 30px;
          }
        }
        .right {
          color: #606266;
          cursor: pointer;
          user-select: none;
          float: right;
          display: inline-block;
          padding-left: 10px;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
</style>
