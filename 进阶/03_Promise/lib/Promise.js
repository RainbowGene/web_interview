
(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  /**
   * @param {} excutor 执行器函数
   */
  function Promise(excutor) {
    // 将当前Promise对象保存
    const self = this
    // 内部属性
    self.status = PENDING // 状态属性
    self.data = undefined  // 存储结果数据的属性
    self.callbacks = []  // 每个元素的结构: {onResolved(){},onRejected(){}}

    function resolve(value) {
      if (self.status !== PENDING) return;
      // 改变状态
      self.status = RESOLVED
      // 保存value数据
      self.data = value
      // 如果有待执行的callback函数，需要先异步执行所有的(onResolved)回调（放入回调队列）
      if (self.callbacks.length > 0) {
        setTimeout(() => { // 放入异步队列(模拟，不够准确)
          self.callbacks.forEach(callbackObj => {  // callbackObj包含了onResolved和onRejected
            callbackObj.onResolved(value)
          })
        }, 0)
      }
    }

    function reject(reason) {
      if (self.status !== PENDING) return;
      self.status = REJECTED
      self.data = reason
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callbackObj => {
            callbackObj.onRejected(reason)
          })
        }, 0)
      }
    }

    // 立即执行 excutor
    try {
      excutor(resolve, reject)
    } catch (error) { // 执行器抛出异常/错误时  Promise对象变为 rejected
      reject(error)
    }
  }


  /**
   * Promise 原型对象的 then 方法：
   *    (1)指定成功和失败的回调函数
   *    (2)返回一个新的Promise对象
   * @param {*} onResolved 
   * @param {*} onRejected 
   */


  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;

    // 指定默认失败的回调 实现 错误/异常穿透
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    // 向后传递成功的value
    onResolved = typeof onResolved === 'function' ? onResolved : value => value

    // 返回一个新的Promise对象
    return new Promise((resolve, reject) => {
      // 封装耦合度高的代码
      function handle(callback) {
        /*
          1，如果抛出异常： 失败   reason 为 err
          2, 如果回调函数执行有返回值（Pormise对象 或者 非Promise对象）
              ①Pormise对象  根据这个Promise的结果决定失败与否，value是这个Promise的结果
              ②非Promise对象 成功，value是返回值
        */
        try {
          const result = callback(self.data)
          // Promise对象
          if (result instanceof Promise) {
            // result.then(
            //   value => { resolve(value) }, // result 成功，将成功的结果作为外部Promise对象的成功数据
            //   reason => { reject(reason) } 
            // )
            result.then(resolve, reject) // 简写上面的4行代码
          }
          else { // 非Promise对象
            resolve(result)
          }
        } catch (error) {
          reject(error) // 捕获异常
        }
      }

      // pending状态，保存回调函数
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      }
      else if (self.status === RESOLVED) { // 异步执行 onResolved 并改变 return Pormise 的状态
        setTimeout(() => {
          handle(onResolved)
        })
      }
      else {
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })
  }

  /**
   * Promise 原型对象的 catch 方法
   *    (1)指定失败的回调函数
   *    (2)返回一个新的Promise对象
   * @param {*} onResolved 
   * @param {*} onRejected 
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  /**
   * Promise 函数对象resolve: 返回指定结果的一个成功的Promise,这个结果不知道是成功与否
   * @param {*} value 
   */
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {  // 是Promise对象:要判断/使用这个对象的结果
        value.then(resolve, reject)
      }
      else {  // 一般值：直接成功
        resolve(value)
      }
    })
  }

  /**
   * Promise 函数对象 reject ：返回指定reason的一个失败的Promise
   * @param {*} value 
   */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)  // 只有失败一种情况
    })
  }

  /**
   * Promise 函数对象 all : 返回一个 Promise ，只要有一个失败就失败，全部执行成功才返回成功
   * @param {Array} promises : Promise对象组成的数组
   */
  Promise.all = function (promises) {

  }
  /**
   * Promise 函数对象 race : 返回的Promise为第一个完成的Promise
   * @param {Array} promises : Promise对象组成的数组
   */
  Promise.race = function (promises) {

  }

  // 向外暴露
  window.Promise = Promise
})(window)