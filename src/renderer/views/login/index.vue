<template>
  <div class="login-box">
    <div class="extra">
      <i class="el-icon-minus" @click="min"></i>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="content">
      <div class="project">
        <div class="project-img">
          <svg-icon icon-class="github" size="60px"></svg-icon>
          <p>GitNote</p>
        </div>
        <!--<div class="project-img">-->
          <!--<el-image src="http://placehold.it/80x80"></el-image>-->
          <!--<p>码云</p>-->
        <!--</div>-->
      </div>

      <el-tabs v-model="tabName" class="no-drag" stretch>
        <el-tab-pane label="Token" name="Token">
          <el-form ref="login" :model="form" :rules="formRules">
            <el-form-item prop="token">
              <el-input v-model="form.username" placeholder="Token"></el-input>
              <el-button class="login" round @click="login" icon="el-icon-right"></el-button>
            </el-form-item>
            <p class="tip">由于GITHUB官方会在2020年11月关闭用户名密码方式授权接口，推荐使用Token认证方式。Token生成地址：</p>
            <el-link type="primary">https://github.com/settins/tokens/new</el-link>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Account" name="Account">
          <el-form ref="login" :model="form" :rules="formRules">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
              <el-button class="login" round @click="login" icon="el-icon-right"></el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>


      <div class="tools">
        <div class="left">
          <el-checkbox v-model="isRemember">记住密码</el-checkbox>
          <!--<el-checkbox v-model="isAutoLogin">自动登录</el-checkbox>-->
        </div>
        <div class="right">
          <el-checkbox v-model="isAutoLogin">自动登录</el-checkbox>
          <!--<p v-model="isRemember">找回密码</p>-->
          <!--<p v-model="isAutoLogin">注册账号</p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const {ipcRenderer} = require("electron");

  export default {
    name: "index",
    data() {
      return {
        tabName: "Token",
        form: {
          username: "",
          password: ""
        },
        formRules: {
          token: [
            {required: true, message: "用户名不能为空", trigger: "blur"}
          ],
          username: [
            {required: true, message: "用户名不能为空", trigger: "blur"}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"},
            {min: 6, message: "密码至少为六位数", trigger: "blur"}
          ]
        },
        isRemember: false,
        isAutoLogin: false,
        mainWindow: ""
      };
    },
    methods: {
      login() {
        this.$refs["login"].validate(valid => {
          if (valid) {
            localStorage.user = JSON.stringify(this.form);
            this.$message({
              type: "success",
              message: "登录成功",
              duration: 2000
            });
            ipcRenderer.send("openCalendarWindow");
          }
        });
      },

      close() {
        ipcRenderer.send("close");
      },
      min() {
        ipcRenderer.send("min");
      }
    }
  };
</script>

<style scoped lang="scss">
  .login-box {
    -webkit-app-region: drag;
    position: relative;
    height: 100%;
    overflow: hidden;
    .extra {
      position: fixed;
      top: 0;
      right: 10px;
      i {
        -webkit-app-region: no-drag;
        font-size: 18px;
        padding: 10px;
        cursor: pointer;
        color: #ababab;
      }
    }
    .content {
      height: 100%;
      padding: 30px 30px;
      .project {
        display: flex;
        justify-content: center;
        padding: 0 20px;
        .project-img {
          -webkit-app-region: no-drag;
          display: inline-block;
          margin: 40px auto 40px;
          width: 60px;
          .el-image {
            border-radius: 100%;
          }
          p {
            margin-top: 10px;
            text-align: center;
            font-size: 14px;
          }
        }
      }
      .el-form {
        -webkit-app-region: no-drag;
        margin: 15px 0 20px 0;
        .el-input {
          /deep/ .el-input__inner {
            border: none;
            border-bottom: 1px solid #ccc;
            border-radius: 0;
            font-size: 16px;
            padding: 10px 50px 10px 5px;
          }
        }
        .tip {
          line-height: 18px;
          margin: 10px 0;
        }
        .el-link.el-link--primary {
          font-size: 12px;
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
