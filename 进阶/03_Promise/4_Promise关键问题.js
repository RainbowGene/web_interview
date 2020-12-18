/**
 * 1. 如何改变 Promise 的状态
 *    (1) pendding 因为 resolve(val) 变为 resolved 状态
 *    (2) pendding 因为 reject(err) 变为 rejectd 状态
 *    (1) pendding 因为 抛出异常 throw new Error() 变为 resolved 状态
 *
 * 2. 一个Promise指定多个成功/失败的回调函数，都会调用吗？
 *    当Promise改变成对应状态时都会调用
 * 
 * 
 * 3. 改变Promise状态和指定回调函数 谁先谁后?
 *    (1) 都有可能，正常情况是 先 指定回调 再 改变状态，也可以反之
 *    (2) 如何先改状态后指定回调
 *        ①在执行器中直接resolve() / reject()
 *        ②延迟调用 then
 *    (3) 什么时候得到数据
 *        ①如果先指定回调，状态发生改变时得到数据
 *        ②先改变的状态，指定回调时得到数据
 */

// 正常情况是 先 指定回调 再 改变状态
new Promise((resolve, reject) => {
  setTimeout(() => { // 异步请求
    resolve(1)  // 后改变状态并有数据
  }, 1000);
}).then(res => {  // 先指定了回调,保存当前指定回调函数

})

// 先 改变状态  再 指定回调 
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('改变了状态');
    resolve(1)
  }, 1000)
})
setTimeout(() => {
  console.log('执行了回调');
  p.then(res => {
    console.log(res);
  })
}, 3000)

// 先  指定回调 再  改变状态
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
    console.log('改变了状态');
  }, 1000)
})
setTimeout(() => {
  p.then(res => {
    console.log(res);
    console.log('执行了回调');
  })
}, 3000)

// 或者直接去掉定时器,没有了异步任务   
new Promise((resolve, reject) => {
  resolve(1)
  console.log('改变了状态');
}).then(res => {
  console.log(res);
  console.log('执行了回调');
})


/**
 * 4. Promise.then() 返回的新 Promise 的结果状态由什么决定?
 *    (1) 简单表达: 由 then() 指定回调函数执行的结果决定
 *    (2) 详细表达：
 *         1. 抛出异常：新Promise 变为 rejected(reason) reason为异常
 *         2. 非Promise对象的任意值：新Promise 变为 resolved(value) value为该值
 *         2. Promise对象：新Promise 变为 resolved(value) 为原Promise的结果
 *         
 */

new Promise((resolve, reject) => {
  reject(1)
  resolve(1)
}).then(res => {
  console.log('onResolve()1', res);
}, err => {
  console.log('onReject()1', err);
}).then(res => {
  console.log('onResolve()2', res);
}, err => {
  console.log('onReject()2', err);
})
/*
打印 onResolve()1 1
    onResolve()2 undefined

改为 reject(1) 打印
    onReject()1 1
    onResolve()2 undefined
 */

// 链式调用 后面的 then接收的是前面一个then

new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log('onResolve()1', res);
  // return 2 
  // return Promise.resolve(3)
  return Promise.reject(4)
}, err => {
  console.log('onReject()1', err);
}).then(res => {
  console.log('onResolve()2', res);
}, err => {
  console.log('onReject()2', err);
})


/**
 * 5. Promise 如何串联多个操作任务?
 *    链式调用 then()
 */

setTimeout(() => {
  console.log(3);
}, 0)
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
  }, 0)
  resolve(1)
}).then(res => {
  console.log(4); // 
})
console.log(2); // 

// 2 4 3 1 

// 一个接一个的执行 : 将异步操作封装到 新的 Promise中
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行任务1(异步)');
    resolve(1)
  }, 1000)
}).then(res => {
  console.log('任务1的结果', res);
  console.log('执行任务2(同步)');
  return 2
}).then(res => {
  console.log('任务2的结果', res);

  return new Promise((resolve, reject) => {
    // 任务3异步
    setTimeout(() => {
      console.log('执行任务3');
      resolve(3)
    }, 1000)
  })
}).then(res => {
  console.log('任务3的结果', res);
})

/*
  执行任务1(异步)
  任务1的结果 1
  执行任务2(同步)
  任务2的结果 2
  执行任务3
  任务3的结果 3
 */



/**
 * 6. Promise 的异常穿透
 *    (1) then链式调用时，可以在最后只指定一个 .catch 失败的回调(前面任何错误，都会直接跳到该回调)
 *
 *
 * 7. 中断 Promise 链
 *    (1) 中断后不再执行后面的链式调用
 *    (2) 办法：在回调函数中 返回一个 pendding 状态的 Promise 对象
 */