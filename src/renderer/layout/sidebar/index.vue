<template>
    <div class="sidebar drag">
        <div class="avatar no-drag">
            <img src="http://placehold.it/60x60" alt="">
        </div>
        <el-button class="no-drag" icon="el-icon-plus">新建文档</el-button>
        <div class="router-list no-drag">
            <router-link to="/home">最新文档</router-link>
            <div class="item" @contextmenu="rightClick(1)">我的文件夹</div>
            <div class="item" @click="logut">退出</div>
        </div>
    </div>
</template>

<script>
  const {ipcRenderer, remote} = require('electron')

  export default {
    name: 'index',
    data() {
      return {
        isShowMember:false,
        menu:null,
      }
    },
    mounted() {
      this.targetId = this.id;
      notificationCenter.on("onClosePop", this.onClosePop);
      this.initMenu();
      ipcRenderer.send('changWindowSize')
    },
    methods: {
      rightClick: function(id) {
        const that = this
        // 需要用到 electron
        const { Menu, MenuItem } = remote
        // 右键菜单
        const menu = new Menu()
        menu.append(new MenuItem({
          label: 'delete',
          click: function() {
            // 执行remove方法，不能直接使用 this.removeItem
            that.removeItem(id)
          }
        }))
        // 第二个菜单
        // menu.append( ... )
        // 展示出来
        menu.popup(remote.getCurrentWindow())
      },
      logut() {
        localStorage.removeItem('user')
        ipcRenderer.send('resetLoginSize')
        this.$router.push('/')

      }
    }
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
            a,.item {
                display: block;
                color: #fff;
                line-height: 30px;
            }
        }
    }
</style>
