// 防抖，立即执行
function debounce (context, time, succMsg, failMsg, func, ...args) {
  let timer = null
  let can = true
  return function () {
    clearTimeout(timer)
    if (can) {
      func(...args)
      if (succMsg.trim().length) {
        context.$message({message: succMsg, type: 'success'})
      }
      can = false
    } else {
      if (failMsg.trim().length) {
        context.$message({message: failMsg, type: 'warning'})
      }
    }
    timer = setTimeout(() => {
      can = true
    }, time)
  }
}

export default {
  debounce
}
