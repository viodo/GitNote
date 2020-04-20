<template>
    <div class="sidebar drag">
        <div class="avatar no-drag">
            <img src="http://placehold.it/60x60" alt="">
        </div>
        <el-button class="no-drag" icon="el-icon-plus">新建文档</el-button>
        <div class="router-list">
            <router-link class="item no-drag" to="/home">最新文档</router-link>
            <el-tree :data="treeData" class="no-drag"
                    :props="treeProps"
                    accordion
                    node-key="id"
                     :expand-on-click-node="false"
                    @node-click="treeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }" @contextmenu="rightClick(node,data)">
          <i class="folder-icon el-icon-folder-opened" v-if="data.type === 'dir'"></i>
          <i class="folder-icon el-icon-document" v-else></i>
          <span>{{ node.label }}</span>
        </span>
            </el-tree>
        </div>
        <div class="logout no-drag" @click="logut">重新登录</div>
    </div>
</template>

<script>
  import os from 'os'
  import fs from 'fs'
  import path from 'path'
  import GitHub from 'github-api'
  const {ipcRenderer, remote} = require('electron')

  export default {
    name: 'index',
    data () {
      return {
        isShowMember: false,
        menu: null,
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'name'
        },
        dirList: [],
        filePath: ''
      }
    },
    mounted () {
      this.init()
      this.targetId = this.id

      // 设置根目录
      var root = path.join(os.homedir(), '.config')
      this.treeData = [{
        type: 'dir',
        name: '我的文件夹',
        children: []
      }]
      // 调用函数遍历根目录，同时传递 文件夹路径和对应的数组
      // 请使用同步读取
      this.fileDir(root, this.treeData[0].children)
    },
    methods: {
      init() {

      },
      //  右键菜单
      rightClick (node, data) {
        console.log(node, data)
        const that = this, {Menu, MenuItem} = remote // 需要用到 electron
        const menu = new Menu() // 右键菜单
        menu.append(new MenuItem({
          label: '新建',
          click: function () {
            console.log('click')
          }
        }))
        // 第二个菜单
        menu.append(new MenuItem({
          label: '重命名',
          click: function () {
            console.log('click')
          }
        }))
        // 第三个菜单
        menu.append(new MenuItem({
          label: '删除',
          click: function () {
            console.log('click')
          }
        }))
        // 展示出来
        menu.popup(remote.getCurrentWindow())
      },
      //  查询该文件夹下的内容
      treeClick (data, node, self) {
        // console.log(data, node, self)
        this.dirList = []
        if (data.type == 'dir' && data.name !== '我的文件夹') {
          let root = path.join(os.homedir(), '.config')
          let filesList = this.treeData[0].children
          this.findFileDisplay(filesList, data.name, root)
          this.fileDisplay(this.filePath, this.dirList)
          this.$store.dispatch('setDirList', this.dirList)
        }
      },
      //  遍历文件及文件夹
      fileDisplay (dirPath, arr) {
        var filesList = fs.readdirSync(dirPath)
        for (var i = 0; i < filesList.length; i++) {
          // 描述此文件/文件夹的对象
          var fileObj = {}
          fileObj.name = filesList[i]
          // 拼接当前文件的路径(上一层路径+当前file的名字)
          var filePath = path.join(dirPath, filesList[i])
          // 根据文件路径获取文件信息，返回一个fs.Stats对象
          var stats = fs.statSync(filePath)
          if (stats.isDirectory()) {
            // 如果是文件夹
            fileObj.type = 'dir'
            fileObj.children = []
            arr.push(fileObj)
            // 递归调用
            this.fileDisplay(filePath, arr[i].children)
          } else {
            // //不是文件夹,则添加type属性为文件后缀名
            fileObj.type = path.extname(filesList[i]).substring(1)
            arr.push(fileObj)
          }
        }
      },
      //  遍历文件夹
      fileDir (dirPath, arr) {
        let filesList = fs.readdirSync(dirPath), j = 0
        for (let i = 0; i < filesList.length; i++) {
          // 拼接当前文件的路径(上一层路径+当前file的名字)
          let filePath = path.join(dirPath, filesList[i])
          // 根据文件路径获取文件信息，返回一个fs.Stats对象
          let stats = fs.statSync(filePath)
          if (stats.isDirectory()) {
            let fileObj = {}
            fileObj.name = filesList[i]
            fileObj.type = 'dir'
            fileObj.children = []
            arr.push(fileObj)
            // 递归调用
            this.fileDir(filePath, arr[j].children)
            j++
          }
        }
      },
      // 组装目录路径
      findFileDisplay (filesList, name, dirPath) {
        for (var i = 0; i < filesList.length; i++) {
          // 拼接当前文件的路径(上一层路径+当前file的名字)
          if (filesList[i].type == 'dir') {
            var filePath = path.join(dirPath, filesList[i].name)
            if (filesList[i].name == name) {
              this.filePath = filePath
            } else {
              if (filesList[i].children) {
                this.findFileDisplay(filesList[i].children, name, filePath)
              }
            }
          }
        }
      },
      logut () {
        localStorage.removeItem('user')
        // ipcRenderer.send('close')
        ipcRenderer.send('toLogin')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "~@/styles/variables.scss";

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
            text-align: left;
            padding: 10px 10px;
            height: calc(100vh - 204px);
            overflow-y: auto;
            .item {
                display: block;
                color: #686868;
                line-height: 30px;
                padding-left: 25px;
            }
            /deep/ .el-tree {
                color: #686868;
                background-color: inherit;
                .folder-icon {
                    color: #f6ce62;
                    font-size: 16px;
                }
                .custom-tree-node {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .el-tree-node:focus > .el-tree-node__content {
                    color: #fff;
                    background-color: $--color-primary;
                }
            }
        }
        .logout {
            border-top: 1px solid #E0E1E5;
            width: 100%;
            box-sizing: border-box;
            line-height: 30px;
            padding: 0  20px;
            color: #393939;
            cursor: pointer;
        }
    }
</style>
