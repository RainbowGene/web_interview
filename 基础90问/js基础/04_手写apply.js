/**
 * apply与call类似，区别在于call接收参数列表，而apply接收参数数组
 */

let obj = {
  name: 'Gene'
} 

Function.prototype.myApply = function (thisArg = window, args = []) {
  const fn = Symbol('fn')
  thisArg[fn] = this
  const result = thisArg[fn](...args) // 虽然是数组，依旧要解构
  delete thisArg[fn]
  return result
}

function test() {
  console.log(this.name)
  console.log(arguments) // 打印参数
}

test.myApply(obj, ['起飞'])