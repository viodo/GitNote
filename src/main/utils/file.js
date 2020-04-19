import fs from 'fs'
import path from 'path'

/**
 * 递归创建目录
 * @param dirname
 * @returns {boolean}
 */
export function mkdirSync (dirname) {
  if (fs.existsSync(dirname)) {
    console.log('目录已存在')
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      console.log('目录创建成功', dirname)
      return true
    }
  }
}
