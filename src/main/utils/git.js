// clone repo
import Git from 'nodegit'

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
