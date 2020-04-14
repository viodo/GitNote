<template>
  <div class="app-wrapper">
    <Sidebar></Sidebar>
    <div class="app-main">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Sidebar from "./sidebar"

  export default {
    name: "index",
    components: {Sidebar},
    computed: {
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style scoped lang="scss">
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .app-main {
      min-height: 100%;
      -webkit-transition: margin-left .28s;
      transition: margin-left .28s;
      margin-left: 210px;
      position: relative;
      &>div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
</style>
