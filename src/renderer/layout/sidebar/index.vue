<template>
    <div class="sidebar">
        <router-link to="/home">首页</router-link>
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
    width: 210px!important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    padding-left: 20px;
    a {
        color: #fff;
    }
}
</style>