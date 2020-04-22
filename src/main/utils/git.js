// clone repo
import Git from 'nodegit'

/**
 * 克隆仓库
 * @param url  仓库url
 * @param path 克隆地址
 * @returns {Promise<unknown>}
 */
export function clone(url, path) {
  return new Promise((resolve, reject) => {
    console.log(url, path)
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
 * commitAndPush
 *
 * @param repoUrl  仓库地址
 * @param gitPath  .git文件夹地址
 * @param filePath 新增文件的相对路径
 * @param username 用户名
 * @param password 密码
 * @param email    邮箱
 */
export function commitAndPush(repoUrl, gitPath, filePath, username, password, email) {
  let repo
  let index
  let oid
  let remote
  Git.Repository.open(gitPath).then(repoResult => {
    repo = repoResult
    return repo.refreshIndex()
  }).then(indexResult => {
    index = indexResult
  }).then(() => {
    return index.addByPath(filePath)
  }).then(() => {
    return index.write()
  }).then(() => {
    return index.writeTree()
  }).then(oidResult => {
    oid = oidResult
    return Git.Reference.nameToId(repo, 'HEAD')
  }).then(head => {
    return repo.getCommit(head)
  }).then(parent => {
    let author = Git.Signature.now(username, email)
    let committer = Git.Signature.now(username, email)
    return repo.createCommit('HEAD', author, committer, 'message', oid, [parent])
  }).then(() => {
    return Git.Remote.createAnonymous(repo, repoUrl)
  }).then(remoteResult => {
    remote = remoteResult
    return remote.push(
      ['refs/heads/master:refs/heads/master'],
      {
        callbacks: {
          credentials: function (url, userName) {
            return Git.Cred.userpassPlaintextNew(username, password)
          }
        }
      }
    )
  }).done(number => {
    console.log('提交成功', number)
  })
}

/**
 * 更新仓库
 *
 * @param repoPth 仓库地址(绝对地址)
 * @param username 用户名
 * @param password 密码
 */
export function pull(repoPth, username, password) {
  let repository
  // Open a repository that needs to be fetched and fast-forwarded
  Git.Repository.open().then(function (repo) {
    repository = repo
    return repository.fetchAll({
      callbacks: {
        credentials: function (url, userName) {
          return Git.Cred.userpassPlaintextNew(username, password)
        },
        certificateCheck: function () {
          return 0
        }
      }
    })
  }).then(function () {
    return repository.mergeBranches('master', 'origin/master')
  }).done(function () {
    console.log('Done!')
  })
}
