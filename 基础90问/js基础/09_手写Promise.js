

/**
 * Promise/async/Generator实现原理解析
 */

// 1. Promise 的实现原理

// 例：简单应用

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('result')
  }, 1000)
})

// p1.then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })


/**
 *  分析Promise调用流程
 * Promise的构造方法接收一个executor()，在new Promise()时就立刻执行这个executor回调
 * executor()内部的异步任务被放入宏/微任务队列，等待执行
 * then()被执行，收集成功/失败回调，放入成功/失败队列
 * executor()的异步任务被执行，触发resolve/reject，从成功/失败队列中取出回调依次执行
 * 
 * 这是个观察者模式：then收集依赖 -> 触发resolve依赖 -> resolve依赖执行 ->
 */

class MyPromise {
  // 构造方法接收一个回调
  constructor(executor) {
    this._resolveQueue = [] // then收集的执行成功的回调队列
    this._rejectQueue = [] // then收集的执行失败的回调队列

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    let _resolve = (val) => {
      // 从成功队列里取出回调依次执行
      while (this._resolveQueue.length) {
        const callback = this._resolveQueue.shift()
        callback(val)
      }
    }

    let _reject = (val) => {
      while (this._rejectQueue.length) {
        const callback = this._rejectQueue.shift()
        callback(val)
      }
    }

    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject)
  }

  // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
  then(resolveFn, rejectFn) {
    this._resolveQueue.push(resolveFn)
    this._rejectQueue.push(rejectFn)
  }
}

const p2 = new MyPromise((resolve, reject) => { // 这个箭头函数就是传入构造函数的参数（是一个回调函数）
  setTimeout(() => {
    resolve('起飞')
  }, 1000)
})

p2.then(res => {
  console.log(res)
})



