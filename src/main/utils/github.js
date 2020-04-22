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
console.log(user,'user--------')
  store.dispatch('getUser', user) // 存入vuex
  store.dispatch('cloneState', '登录成功，开始获取配置文件') // 存入vuex
  user.getProfile((err, profile) => {
    if (!err) {
      store.dispatch('cloneState', '获取配置文件...')
      // console.log('获取基本信息成功')
      accountPath = path.join(os.homedir(), '.gitnote', profile.login)
      repoName = params.username + 'Notebook'
      repoUrl = `https://github.com/${params.username}/${repoName}.git`
      // step1: 判断有没有UserDir/.GitNote/[account]/文件夹
      if (mkdirSync(accountPath)) {
        console.log('账号文件创建成功')
        // step2: 查看该用户是否有[用户名]Note 仓库
        user.listRepos((err, repos) => {
          if (!err) {
            let repoList = repos.filter(repo => repo.name === repoName && repo.owner.login)
            console.log('获取仓库列表成功',repoList.length)
            if (!repoList.length) {
              const repoDef = {
                name: repoName,
                auto_init: true
                // gitignore_template: 'Node',
                // license_template: 'mit'
              }
              store.dispatch('cloneState', '开始创建仓库!')
              user.createRepo(repoDef, (err, repo) => {
                if (!err) {
                  store.dispatch('cloneState', '创建仓库成功，开始克隆仓库!')
                  console.log('创建仓库成功')
                  console.log('开始克隆仓库')
                  // TODO
                  clone(repoUrl, path.join(accountPath, repoName)).then(res => {
                    console.log('克隆仓库成功')
                    store.dispatch('cloneState', '克隆完成!')
                  })
                  return true
                } else {
                  console.log('创建仓库失败')
                  store.dispatch('cloneState', '创建仓库失败!')
                  return false
                }
              })
            } else {
              store.dispatch('cloneState', '开始克隆仓库!')
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
      store.dispatch('cloneState', '获取基本信息失败!')
      console.log('获取基本信息失败', err)
      return false
    }
  })
}
