/**
 *  1. async 函数： 返回值为 Promise 对象，结果由async函数执行的返回值决定
 *  2. await 表达式 ： 右侧表达式一般是Promise对象
 *        ① Promise对象：返回的就是成功值
 *        ② 如果是其他值，则该值为await的返回值
 * 
 *   * 注意：await必须写在async函数中，而async函数中可以没有 await
 *           如果 await 中的 Promise 出错了回抛出异常，需要通过try...catch... 捕获
 */

async function a() {
  // return 1
  // throw 2
  return Promise.reject(1)
}
const b = a()

b.then(value => {
  console.log('success:', value);
}, reason => {
  console.log('err:', reason);
})

// await

function fn1(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2)
    }, 1000)
  })
}

async function fn2(num) {
  const value = await fn1(num)
  console.log('value', value);
}

fn2(4)
