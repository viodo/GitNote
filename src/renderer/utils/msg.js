import Vue from 'vue'
import {Message} from 'element-ui'

const defDuration = 2000

/**
 * 错误信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function errorMsg (message, duration) {
  return Message({
    message: message || '',
    type: 'error',
    duration: duration || defDuration
  })
}

/**
 * 成功信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function successMsg (message, duration) {
  return Message({
    message: message || '',
    type: 'success',
    duration: duration || defDuration
  })
}

/**
 * 警告信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function warningMsg (message, duration) {
  return Message({
    message: message || '',
    type: 'warning',
    duration: duration || defDuration
  })
}

/**
 * 提示信息提示
 * @param message
 * @param duration
 * @returns {*}
 */
export function infoMsg (message, duration) {
  return Message({
    message: message || '',
    type: 'info',
    duration: duration || defDuration
  })
}

// 复制错误信息
function copyDocument (id) {
  var Url2 = document.getElementById(id)
  Url2.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
}
