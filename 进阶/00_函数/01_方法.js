

/**
 *  一，方法
 *    > 在一个对象中绑定一个函数，这个函数被称为这个对象的方法
 * 
 *  方法中的 this 是一个特殊变量，它始终指向当前对象，除非你用其他形式去改变它 apply bind call
 */

// 利用 apply 作为装饰器
// 我们想要计算代码里共使用了多少个 parseInt 方法,如果一个个去找就太low了
// 'use strict';
// var count = 0
// var oldParsetInt = parseInt; // 保存原函数
// // 重写原函数
// window.parseInt = function () {
//   count++
//   return oldParsetInt.apply(null, arguments)
// }

// parseInt('30')
// parseInt('20')
// parseInt('10')

// console.log(count)  // 在浏览器上运行

var a = function () {
  console.log('a')
}

var b = a
a = function () {
  console.log('b')
}
b() // a
a() // b
// 两个函数用 = 赋值的内存地址指向不一样

var obja = {
  name: 'a'
}
var objb = obja
obja.name = 'b'
console.log(objb.name) // b  对象则不行，需要使用拷贝





