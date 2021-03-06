/**
 * class 版本的 Promise 手写
 */

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {
  constructor(excutor) {
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

  then(onResolved, onRejected) {
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

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  // static 给类对象添加方法 ， 不加就是给实例对象添加方法
  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {  // 是Promise对象:要判断/使用这个对象的结果
        value.then(resolve, reject)
      }
      else {  // 一般值：直接成功
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)  // 只有失败一种情况
    })
  }

  static all(promises) {
    const values = new Array(promises.length)  // 保存所有成功数据的数组
    let resolvedCount = 0 // 成功数量计数
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(  // 由于p可能不是Promise对象而是一般值：①使用instance判断 ②Promise.resolve(p)包裹
          value => {
            resolvedCount++;
            // 所有成功才能 resolve, 而且按promises 的顺序 push
            values[index] = value // 这样才不会导致先成功的先push

            // 全部成功
            if (resolvedCount === promises.length) {
              resolve(values)
            }
          },
          reason => { // 一个失败全部GG
            reject(reason)  // 因为状态只能改一次，这个Promise的结果不会被后来的覆盖
          })
      })
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => { // 一旦有成功，直接返回该Promise
            resolve(value)
          },
          reason => {
            reject(reason)
          })
      })
    })
  }

  static resolveDelay(value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {  // 是Promise对象:要判断/使用这个对象的结果
          value.then(resolve, reject)
        }
        else {  // 一般值：直接成功
          resolve(value)
        }
      }, time)
    })
  }

  static rejectDelay(reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)  // 只有失败一种情况
      }, time)
    })
  }
}