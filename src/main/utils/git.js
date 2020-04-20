// clone repo
import Git from 'nodegit'

/**
 * 克隆仓库
 * @param url  仓库url
 * @param path 克隆地址
 * @returns {Promise<unknown>}
 */
export function clone (url, path) {
  return new Promise((resolve, reject) => {
    Git.Clone(url, path).then(function (repo) {
      // Use a known commit sha from this repository.
      console.log('克隆完成')
      resolve(repo)
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
}

/**
 * commitAndCommit
 * @param path
 */
export function commitAndCommit (path) {
  Git.Repository.open(path).then(repo => {

  })
}
