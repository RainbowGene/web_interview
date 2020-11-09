/**
 * 防抖：时间间隔内多次触发同一个函数，只执行一次
 * 原理:设置一个定时器，约定xx毫秒后再触发事件处理,每次触发都会重置计时器，直到计时器xx毫秒内无第二次操作
 */

function debounce(func, wait) {
  let timeout = null
  return function () {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout) // 先关闭再开始重新定义计时器
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

let add = debounce(() => {
  console.log('起飞')
}, 5000)

add()
add()
add()

// 只执行了一次 起飞   5s 内的回调函数只执行一次
// 执行的是最后一次