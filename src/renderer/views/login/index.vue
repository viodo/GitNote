<template>
    <div class="login-box">
        <div class="login-bg">
            <img src="http://placehold.it/400x400" alt="">
        </div>
        <div class="extra">
            <i class="el-icon-setting"></i>
            <i class="el-icon-close"></i>
        </div>
        <div class="content">
            <el-image class="avatar" src="http://placehold.it/80x80"></el-image>
            <el-form ref="login" :model="form" :rules="formRules">
                <el-form-item prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-checkbox v-model="isRemember">记住密码</el-checkbox>
                <el-checkbox v-model="isAutoLogin">自动登录</el-checkbox>
            </div>
            <el-button type="primary" @click="login"> 登 录</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                form: {
                    username: "",
                    password: ""
                },
                formRules: {
                    username: [
                        {required: true, message: "用户名不能为空", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"},
                        {min: 6, message: "密码至少为六位数", trigger: "blur"}
                    ]
                },
                isRemember: false,
                isAutoLogin: false
            }
        },
        methods: {
            login() {
                this.$refs['login'].validate(valid => {
                    if (valid) {
                        this.$message({type: "success", message: "登录成功", duration: 2000})
                        this.$router.push('/home')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-box {
        position: relative;
        height: 100%;
        overflow: hidden;
        .login-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 500px;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .extra {
            position: fixed;
            top: 0;
            right: 20px;
            i {
                font-size: 20px;
                padding: 10px;
                cursor: pointer;
                margin: 10px 0;
                &.el-icon-close {
                    font-size: 24px;
                    position: relative;
                    top: 2px;
                }
            }
        }
        .content {
            margin-left: 500px;
            height: 100%;
            padding: 20px 40px;
            .avatar {
                display: block;
                margin: 60px auto 60px;
                width: 120px;
            }
            .el-form {
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
            }

            .el-button {
                width: 100%;
                margin: 20px 0;
                padding: 15px 0;
                font-size: 16px;
            }
        }
    }
</style>