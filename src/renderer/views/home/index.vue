<template>
  <div class="home">
    <div class="list">
      <div class="list-hd">
        <i class="list-back el-icon-plus" @click="pathBack"></i>
        <el-input v-model="searchText" placeholder="搜索..." prefix-icon="el-icon-search">
        </el-input>
        <el-dropdown trigger="click" class="list-setting">
                            <span class="el-dropdown-link"><i class="el-icon-menu"></i><i
                                    class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="list-bd widget-scroller widget-scroller-wrap">
        <ul>
          <li class="list-li file-item selected" v-for="(item,index) in list" :key="index" @click="openDir(item)">
            <div class="title">
                <i class="folder-icon el-icon-folder-opened" v-if="item.type === 'dir'"></i>
                <i class="folder-icon el-icon-document" v-else></i>
                {{item.name}}
            </div>
            <div class="date-size">
              <span class="file-date">2020-01-01</span>
              <span class="file-size">202k</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="item-num" @click="init">总共 1 项</div>
    </div>
    <div class="note-container">
      <div class="hd">
        <el-input class="title" v-model="title" placeholder="无标题笔记"></el-input>
        <div class="toolbar">
          <el-button>保存</el-button>
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import os from 'os'
  import fs from 'fs'
  import path from 'path'
  export default {
    name: 'index',
    data () {
      return {
        searchText: '',
        title: ''
      }
    },
    computed: {
      list () {
        return this.$store.state.dir.list
      }
    },
    mounted () {
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
      init () {
        console.log(this.$store.state, 'list')
        console.log(this.$store.state.dir.list, 'list')
      },
      //  展开文件夹
      openDir(data) {
        console.log(data)
        this.dirList = []
        if (data.type == 'dir' && data.name !== '我的文件夹') {
          let root = path.join(os.homedir(), '.config')
          let filesList = this.treeData[0].children
          this.findFileDisplay(filesList, data.name, root)
          this.fileDisplay(this.filePath, this.dirList)
          this.$store.dispatch('setDirList', this.dirList)
        }
      },
      //  遍历文件夹
      fileDir(dirPath, arr) {
        let filesList = fs.readdirSync(dirPath), j = 0;
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
      //  遍历文件及文件夹
      fileDisplay(dirPath, arr) {
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
      // 组装目录路径
      findFileDisplay(filesList, name, dirPath) {
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
      pathBack() {
        let arr = this.filePath.split('\\')
        arr.pop()
        this.filePath = arr.join('\\')
        this.dirList = []
        this.fileDisplay(this.filePath, this.dirList)
        this.$store.dispatch('setDirList', this.dirList)
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .list {
    position: relative;
    width: 280px;
    height: 100%;
    border-right: 1px solid #e0e1e5;
    background-color: #fff;
    &-hd {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e0e1e5;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .list-back {
        position: absolute;
        top: 22px;
        left: 15px;
        font-size: 16px;
      }
      .el-input {
        position: relative;
        top: 0;
        margin: 0 60px 0 50px;
        .el-input__inner {
          display: block;
          border: 1px solid rgba(148, 157, 166, 0.36);
          border-radius: 40px;
          line-height: 28px;
          padding: 4px 4px 4px 36px;
          height: 28px;
        }
        .el-input__prefix {
          line-height: 0;
        }
      }
      .list-setting {
        cursor: pointer;
        position: absolute;
        top: 0px;
        right: 16px;
        display: inline-block;
      }
    }
    &-bd {
      position: absolute;
      top: 61px;
      bottom: 30px;
      left: 0px;
      right: 0px;
      overflow: hidden;
      &.widget-scroller-wrap {
        overflow-y: auto;
        width: 100%;
        height: calc(100% - 91px);
        outline: none;
        .list-li {
          position: relative;
          padding: 15px 20px;
          border-bottom: 1px solid #e0e1e5;
          overflow: hidden;
          .title {
            height: 22px;
            position: relative;
          }
          .date-size {
            color: #c2c2c2;
            margin-top: 6px;
            height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .file-date {
              vertical-align: middle;
            }
            .file-size {
              margin-left: 15px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-num {
      position: absolute;
      bottom: 0;
      border-top: 1px solid #E0E1E5;
      width: 100%;
      box-sizing: border-box;
      line-height: 30px;
      padding-left: 20px;
      color: #393939;
    }
  }

  /deep/ .note-container {
    position: absolute;
    left: 281px;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    overflow: hidden;
    .hd {
      position: relative;
      padding: 0 20px;
      height: 60px;
      border-bottom: 1px solid #e0e1e5;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-shrink: 0;
      flex-shrink: 0;
      .title {
        width: 100%;
        display: inline-block;
        background-color: transparent;
        border: 0 none;
        font-size: 18px;
        color: #393939;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 19px 160px 19px 0;
        .el-input__inner {
          border: none;
        }
      }
      .toolbar {
        position: absolute;
        right: 50px;
        top: 15px;
      }
    }
  }
</style>
