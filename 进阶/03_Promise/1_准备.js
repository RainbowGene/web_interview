/**
 * 区别 实例对象 与 函数对象
 * 
 *  函数对象: 将函数作为对象使用时，简称为函数对象
 *  实例对象：new 函数产生的对象
 * 
 */

function Fn() {  // 函数

}

const fn = new Fn()   // fn为实例对象(即对象)， Fn此时为构造函数
console.log(Fn.prototype) // Fn 为函数对象
Fn.bind({})  // Fn 函数对象的 bind 方法
$('#text') // $ 为函数
$.get('/test')  // $ 为函数对象


/**
 *  两种类型的回调函数: 同步回调 和 异步回调
 *   同步回调:立即执行  例子： 数组遍历相关的回调函数(forEach)/Promise的excutor函数
 *   异步回调：先放入队列,等待执行 例子： 网络请求 / Promise的then/catch / 计时器
 */

for (let i = 0; i < 5; i++) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i)
    }, 1000);
  }).then(res => {
    console.log(res)
  })
}

function f1(i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(i)
      resolve(i)
    }, 1000);
  })
}

function f2() {
  console.log('f2')
}

// f1(10).then(res => {
//   f2()
// })




/**
 * 错误处理 Error
 * 
 *  1. 错误的类型
 *    Error:所有错误的父类型
 *    ReferenceError:引用变量不存在
 *    RangeError: 数值取值不在允许范围内
 *    SyntaxError: 语法错误
 *    TypeError: 类型错误
 * 
 *  2. 错误处理
 *    捕获错误:try ... catch
 *    抛出错误 throw error
 * 
 *  3. 错误对象
 *    message:错误相关信息
 *    stack : 函数调用栈记录信息
 */

try {
  let a = null
  console.log('-----' + a.age)
} catch (error) {
  console.log(error.message)
}

// 手动抛出错误
function something() {
  if (Date.now() % 2 === 1) {
    console.log('当前时间为奇数，可以工作')
  }
  else {
    throw new Error('当前时间为偶数，无法执行')
  }
}

// 捕获
try {
  something()
} catch (error) {
  console.log(error.message)
}
