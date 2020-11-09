/**
 * call bind apply : 用来重定义 this
 */

// 三种基本用法

// 例1
let name = 'Gene', age = 23;
let obj = {
  name: 'heh',
  objAge: this.age,
  myFun: function () {
    console.log(this.name + '年龄：' + this.age)
  }
}

obj.myFun() // heh年龄：undefined   this指向对象

// 例2
let nickname = "ClycleGene"
function shows() {
  console.log(this.nickname)
}

// shows()

let db = {
  name: '彩虹',
  age: 18
}

obj.myFun.call(db) // 调用obj中的方法，call传入对象(this指向该对象)
obj.myFun.apply(db)
obj.myFun.bind(db)()

// 上述打印均为 彩虹年龄：18

// bind 返回一个新函数，只有调用它才会执行

/**
 * 传参
 */
let obj2 = {
  name: 'heh',
  objAge: this.age,
  myFun: function (fm, to) {
    console.log(this.name + '年龄：' + this.age + ',来自:' + fm + ',去往' + to)
  }
}

obj2.myFun.call(db, '荆州', '深圳')
obj2.myFun.apply(db, ['荆州', '深圳'])
obj2.myFun.bind(db, '荆州', '深圳')()
obj2.myFun.bind(db, ['荆州'], ['深圳'])()
obj2.myFun.bind(db, ['荆州', '深圳'])() // 彩虹年龄：18,来自:荆州,深圳,去往undefined

// 前四个打印都为 彩虹年龄：18,来自:荆州,去往深圳

/**
 * 从结果看出
 * call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
 *  - call的参数直接放入，用逗号分离
 *  - apply只接受一个数组，其中放入所有参数
 *  - bind除了返回是一个函数，参数形式与call一样
 */

/**
 * 进入正题：手写一个 call
 * 
 * call 的原理比较简单，由于函数的this指向它的直接调用者，我们变更调用者即完成this的指向
 */

// 实例
const objc = {
  name: 'XZbiss'
}

function foo() {
  console.log(this.name)
}

objc.foo = foo  // 变更调用者
objc.foo()

// 基于以上原理，我们来手写一个 call  
// Function.prototype.myCall = function (thisArg, ...args) {
//   thisArg.fn = this // this 指向调用call的对象，即我们要改变this指向的函数
//   return thisArg.fn(...args)
// }

// 还有一些细节要处理
Function.prototype.myCall = function (thisArg = window, ...args) { // 如果没有传入对象则默认为window
  //如果是上面的myCall，传入的对象中已有fn属性则会受影响
  const fn = Symbol('fn') // 声明一个独有的Symbol属性
  thisArg[fn] = this
  const result = thisArg[fn](...args) // 执行函数并接收结果
  delete thisArg[fn] // 删除声明的fn属性
  return result // 返回结果
}

// 测试
foo.myCall(objc) // XZbiss
   
// objc.fn()