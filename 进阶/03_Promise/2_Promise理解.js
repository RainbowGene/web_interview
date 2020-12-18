/**
 *  1. What is Promise ?   
 *     抽象理解： js中异步编程的新解决方案
 *     具体理解： （1）一个构造函数  （2）Promise对象用于封装一个异步操作并且获取其结果
 * 
 *     状态改变: pendding => resolved   pendding => rejected
 *              只有这两种改变方式，且有各自的结果数据
 *      
 *     基本流程：见下方 <使用>
 * 
 *  2. Why Promise ?  
 *     (1) 指定回调函数的方式更加灵活
 *         传统： 异步任务启动前就指定了成功/失败的回调
 *         Promise : 启动异步任务 => 返回 Promise 对象 => 给Promise对象绑定回调函数
 *        
 *     (2) 支持链式调用解决回调地狱
 *         回调函数嵌套调用导致不利于阅读 / 不便于异常处理
 *         解决方案： Promise   终极解决方案：async/await
 * 
 *  3. How to use the Promise ?  
 *     
 */

// <使用>
// 1. 创建对象
const p = new Promise((resolve, reject) => { // 执行器函数
  // 2. 异步操作
  setTimeout(() => {
    const time = Date.now()
    if (time % 2 === 0) {
      resolve('success,time=' + time) // 3.1 成功调用 resolve(value)
    } else {
      reject('error,time=' + time) // 3.2 失败调用 reject(reason)
    }
  }, 1000);
})

p.then(value => { // onResolved 函数 接收得到的value
  console.log(`成功的回调${value}`)
}, reason => { // onRejected 函数 接收得到的reason
  console.log(`失败的回调${reason}`)
})


// 回调地狱场景
$.ajax({
  http: 'post',
  data: obj,
  type: 'json',
  success: (res) => { // 请求成功
    // 第二次请求
    $.ajax({
      http: 'get',
      data: data.id,
      type: 'json',
      success: (res) => {
        // 第三次请求...
      },
      error: (err) => {

      }
    })
  },
  error: (err) => {

  }
})

// 使用Promise
axios({
  http: 'post',
  data: obj
}).then(res1 => {
  return axios({
    http: 'get',
    data: { id: res1.id }
  })
}).then(res2 => {
  return axios({
    http: 'post',
    data: res2.id
  })
}).catch(err => {
  // 统一处理:任何一个then发生错误都会来到这里
})

 