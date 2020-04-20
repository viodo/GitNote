import GitHub from 'github-api'
import path from 'path'
import os from 'os'
import {mkdirSync} from './file'
import {clone} from './git'
import store from '../../renderer/store'
/**
 * 登录
 * @param params
 */
export function login (params) {
  console.log(params, store, '1111')
  let github = new GitHub({
    username: params.username,
    password: params.password
  })
  let user = github.getUser()
  let accountPath
  let repoName
  let repoUrl

  store.dispatch('getUser', user) // 存入vuex
  user.getProfile((err, profile) => {
    if (!err) {
      console.log('获取基本信息成功')
      accountPath = path.join(os.homedir(), '.gitnote', profile.login)
      repoName = params.username + 'Notebook'
      repoUrl = `https://github.com/${params.username}/${repoName}.git`
      // step1: 判断有没有UserDir/.GitNote/[account]/文件夹
      if (mkdirSync(accountPath)) {
        console.log('账号文件创建成功')
        // step2: 查看该用户是否有[用户名]Note 仓库
        user.listRepos((err, repos) => {
          if (!err) {
            console.log('获取仓库列表成功')
            let repoList = repos.filter(repo => repo.name === repoName && repo.owner.login)
            if (!repoList.length) {
              const repoDef = {
                name: repoName,
                auto_init: true,
                gitignore_template: 'Node',
                license_template: 'mit'
              }              
              user.createRepo(repoDef, (err, repo) => {
                if (!err) {
                  console.log('创建仓库成功')
                  console.log('开始克隆仓库')
                  // TODO
                  clone(repoUrl, path.join(accountPath, repoName)).then(res => {
                    console.log('克隆仓库成功')
                  })
                  return true
                } else {
                  console.log('创建仓库失败')
                  return false
                }
              })
            } else {
              console.log('开始克隆仓库')
              console.log(repoUrl)
              // TODO
              clone(repoUrl, path.join(accountPath, repoName)).then(res => {
                console.log('克隆仓库成功')
              })
              return true
            }
          } else {
            console.log('获取仓库列表失败', err)
            return false
          }
        })
      }
      return true
    } else {
      console.log('获取基本信息失败', err)
      return false
    }
  })
}
