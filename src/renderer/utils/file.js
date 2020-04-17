var fs = require('fs')

var path = require('path')

// 递归创建目录 异步方法
export function mkdirs (dirname, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback()
    } else {
      // console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback)
        console.log('在' + path.dirname(dirname) + '目录创建' + dirname + '目录')
      })
    }
  })
}

// 递归创建目录 同步方法
export function mkdirsSync (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
