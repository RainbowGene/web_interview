

new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('失败的数据')
  }, 1000)
}).then(res => {
  console.log(res)
}, err => {
  console.log(err);
}).catch(err => {
  console.log(err);
})

//  我想产生一个成功值为1的Promise对象
// const p1 = new Promsie((resolve, reject) => {
//   resolve(1)
// })

// 上述代码等同于
const p1 = Promise.resolve(1)  // 语法糖
p1.then(res => {
  console.log(res);
})

// 也有
const j2 = Promise.reject(2)  // 失败值为 2
// j2.then(null, reason => {
//   console.log(reason);
// })
// j2.catch(err => {
//   console.log(err);
// })


/**
 * Promise all : 接收一个由多个 Promise 对象组成的数组
 */


const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const j2 = Promise.reject(2)
const pAll = Promise.all([p1, p2, j2])
pAll.then(res => {
  console.log('全部成功', res);
}).catch(err => {
  console.log('有一个或者多个失败', err); // 2
})

/**
 * Promise race : 接收一个由多个Promise对象组成的数组，谁先完成用谁的
 */

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 3000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})
const j2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('j2')
  }, 1000)
})
const pRace = Promise.race([p1, j2, p2])
pRace.then(res => {
  console.log('正确值拿到第一', res);
}).catch(err => {
  console.log('错误值拿到第一', err);
})


