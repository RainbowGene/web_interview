/**
 * Promise 是 async/await 的语法基础,js中处理异步的标准形式
 */

// 手写一个 Promise

// class Promise {
//   constructor(executor) { // 构造器
//     let resolve = () => { }
//     let reject = () => { }
//     executor(resolve, reject) //立即执行
//   }
// }

/**
 * 三个状态：
 * pending:初始态,可以转化为 成功态 或 失败态
 * fulfilled 成功态：不可转变其他态，必有一个不可改变 值 value
 * rejected  失败态：不可转变其他态,且必须有一个不可改变的原因（reason）
 */

class Promise {
  constructor(executor) {
    this.state = 'pending'; // 初始状态
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败原因
    let resolve = value => {
      // state改变,resolve调用就会失败
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'fulfilled';
        // 储存成功的值
        this.value = value;
      }
    }
    let reject = reason => {
      // state改变,reject调用就会失败
      if (this.state === 'pending') {
        // reject调用后，state转化为失败态
        this.state = 'rejected';
        // 储存失败的原因
        this.reason = reason;
      }
    }
    try {
      executor(resolve, reject)
    }
    catch{
      reject(err)
    }
  }
  // then 方法 有两个参数onFulfilled onRejected
  then(onFulfilled, onRejected) {
    // 状态为fulfilled，执行onFulfilled，传入成功的值
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    };
    // 状态为rejected，执行onRejected，传入失败的原因
    if (this.state === 'rejected') {
      onRejected(this.reason);
    };
  }
}

