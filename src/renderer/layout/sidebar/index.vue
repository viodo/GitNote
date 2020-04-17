<template>
  <div class="sidebar drag">
    <div class="avatar no-drag">
      <img src="http://placehold.it/60x60" alt="">
    </div>
    <el-button class="no-drag" icon="el-icon-plus">新建文档</el-button>
    <div class="router-list no-drag">
      <router-link to="/home">最新文档</router-link>
      <div class="item">我的文件夹</div>
      <!--el-icon-document-->
      <el-tree
              :data="treeData"
              :props="treeProps"
              accordion
              node-key="id"
              :expand-on-click-node="false"
              @node-click="treeClick" @contextmenu="rightClick(1)">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i class="el-icon-plus"></i>
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
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
        isShowMember: false,
        menu: null,
        treeData: [{
          label: '我的文件夹',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],
        treeProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
      this.targetId = this.id
    },
    methods: {
      rightClick(id) {
        const that = this, {Menu, MenuItem} = remote // 需要用到 electron
        const menu = new Menu() // 右键菜单
        menu.append(new MenuItem({
          label: 'delete',
          click: function () {
            // 执行remove方法，不能直接使用 this.removeItem
            that.removeItem(id)
          }
        }))
        // 第二个菜单
        // menu.append( ... )
        // 展示出来
        menu.popup(remote.getCurrentWindow())
      },
      //
      treeClick() {

      },
      logut() {
        localStorage.removeItem('user')
        ipcRenderer.send('close')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">

  .sidebar {
    transition: width .28s;
    width: 210px !important;
    background-color: #f5f5f5;
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
      a, .item {
        display: block;
        color: #fff;
        line-height: 30px;
      }
      /deep/ .el-tree {
        color: #ffffff;
        background-color: inherit;
        .el-tree-node__content:hover {
          background-color: #000;
        }

        .el-tree-node:focus > .el-tree-node__content {
          background-color: #000;
        }
      }
    }
  }
</style>
