<template>
    <div class="sidebar">
        <div class="avatar">
            <img src="http://placehold.it/60x60" alt="">
        </div>
        <el-button icon="el-icon-plus">新建文档</el-button>
        <div class="router-list">
            <router-link to="/home">最新文档</router-link>
            <router-link to="/login">我的文件夹</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
    .sidebar {
        transition: width .28s;
        width: 210px !important;
        background-color: #304156;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        padding-right: 10px;
        text-align: center;
        .avatar {
            width: 80px;
            height: 80px;
            margin: 30px auto;
            img {
                width: 100%;
            }
        }
        .router-list {
            text-align: center;
            padding: 10px 0;
            a {
                display: block;
                color: #fff;
                line-height: 30px;
            }
        }
    }
</style>
