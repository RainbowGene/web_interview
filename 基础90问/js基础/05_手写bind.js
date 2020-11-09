/**
 * 手写bind
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 
 * 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 */

// Function.prototype.myBind = function (thisArg, ...args) {
//   return () => {
//     this.apply(thisArg, args)
//   }
// }

/**
 * 上面的代码忽视了三点
 *  - bind()除了this还接收其他参数，bind()返回的函数也接收参数，这两部分的参数都要传给返回的函数
 *  - new会改变this指向：如果bind绑定后的函数被new了，那么this指向会发生改变，指向当前函数的实例
 *  - 没有保留原函数在原型链上的属性和方法
 */

Function.prototype.myBind = function (thisArg, ...args) {
  let self = this
  // new 优先级
  let fbound = function () {
    self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
  }
  // 继承原型上的属性和方法
  fbound.prototype = Object.create(self.prototype)

  return fbound
}

// 开始测试
const obj = { name: '你在噶什么？' }

function foo(args) {
  console.log(this.name, ...args)
}

foo.myBind(obj, ['a', 'n'])()
