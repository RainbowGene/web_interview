/**
 * 防抖是延迟执行，而节流是间隔执行，函数节流即每隔一段时间就执行一次，实现原理为设置一个定时器，
 * 约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器，和防抖的区别在于，防抖每次触发事
 * 件都重置定时器，而节流在定时器到时间后再清空定时器
 */

function throttle(func, wait = 1000) {
  let timeout = null
  return function () {
    let context = this
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

let add = throttle(() => {
  console.log('节流')
}, 5000)

add()

// 5s 后打印了