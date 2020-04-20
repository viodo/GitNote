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
  console.log(params,store,'1111')
  let github = new GitHub({
    username: params.username,
    password: params.password
  })
  let user = github.getUser()
  store.dispatch('getUser',user) // 存入vuex
  user.getProfile((err, profile) => {
    if (!err) {
      console.log('获取基本信息成功')
      let accountPath = path.join(os.homedir(), '.GitNote', profile.login)
      let repoName = params.username + 'Notebook'
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
                name: params.username + 'Notebook',
                auto_init: true,
                gitignore_template: 'Node',
                license_template: 'mit'
              }
              let repoUrl = `https://github.com/${params.username}/${repoName}.git`
              user.createRepo(repoDef, (err, repo) => {
                if (!err) {
                  console.log('创建仓库成功')
                  console.log('开始克隆仓库')
                  // TODO
                  clone(repoUrl, accountPath)
                  return true
                } else {
                  console.log('创建仓库失败')
                  return false
                }
              })
            } else {
              console.log('开始克隆仓库')
              // TODO
              clone(repoUrl, accountPath)
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
