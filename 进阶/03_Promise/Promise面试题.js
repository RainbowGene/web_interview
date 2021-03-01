/**
 * 用Promise实现红绿灯分别1.2.3 秒转化
 */

let t1 = (light, time) => {
  return new Promise((resolve, reject) => {
    console.log(light);
    setTimeout(() => {
      console.log(`${light}灯亮${time / 1000}秒`);
      resolve()
    }, time)
  })
}

let start = () => {
  return new Promise((resolve, reject) => {
    t1('绿', 1000)
      .then(res => {
        return t1('黄', 2000)
      })
      .then(res => {
        return t1('红', 3000)
      }).then(res => {
        console.log('-----');
        start()
      })
  })
}

start()