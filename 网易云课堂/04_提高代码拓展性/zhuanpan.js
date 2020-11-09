
// 业务模块：初始化 => 运动效果 => 运动控制
// 描述：请求会奖品信息展示，然后请求抽奖api，此期间匀速转动，得到最终奖项缓慢转动

let time = 150 // 跳转时间间隔
let timer = null // 定时器
let domArr = []  // 奖项数组
let father = document.getElementById('container') // 父容器
let nowStop = 0; // 当前跑动圈数
let finalNum = Math.floor(Math.random() * 10)  // 1-10之间的随机数，用于决定最后停止的位置
let stopnum = 40 + finalNum;  // 第四圈中停歇

// 观察者:实现后续越跑越慢
var Observer = {
  _message: {},
  regist: function (type, fn) {
    // 订阅消息
    if (!this._message[type]) {
      this._message[type] = [fn]
    }
    else {
      this._message[type].push(fn)
    }
  },
  fire: function (type) {
    // 触发
    var len = this._message[type].length;
    for (var i = 0; i < len; i++) {
      this._message[type][i].call(this);
    }
  },
  remove: function () {
    var i = this._message[type].length - 1;
    for (; i >= 0; i--) {
      this._message[type][i] === fn && this._message[type].splice(i, 1)
    }
  }
}

// 初始化dom
function init() {
  function _init() { // 样式渲染
    let dom = document.createElement('div')
    dom.setAttribute('class', 'div2')
    father.appendChild(dom)
    domArr.push(dom)
  }
  for (let i = 0; i < 10; i++) {
    _init()
  }

  // 注册事件:每转一圈速度缓慢下来
  Observer.regist('runOver', function () {
    time += 50
    // 增加时间后重启定时器
    runner('stop')
    runner('run')
  })

  // Observer.regist('messend', function () { // 注册:发送请求商品接口 事件
  //   runner('keep')
  // })

  // Observer.regist('messageback', function () { // 注册:请求商品接口完毕 事件
  //   runner('run')
  // })

  // // 模拟发送请求
  // sendMsg(function () {
  //   runner('run')
  // })

  runner('run') // 启动
}

init()

// 开始跑动
function runner(command) {
  // 运行效果
  function runmode(domstop) {
    if (domstop === 0) {
      domArr[9].setAttribute('class', 'div2')
    }
    else {
      domArr[domstop - 1].setAttribute('class', 'div2') // 移除上一个选中效果
    }
    domArr[domstop].setAttribute('class', 'div2 divon')
  }

  // 控制模块
  function runcontroll(command) {
    if (command == 'run') {
      clearInterval(timer)
      timer = setInterval(function () {
        let domstop = nowStop % 10
        if (domstop == 0 && nowStop != 0) {
          Observer.fire('runOver') // 触发事件
        }
        runmode(domstop)
        if (nowStop > stopnum) { // 已跑动总索引>设定的最大索引
          clearInterval(timer);
        }
        nowStop++
      }, time)
    }
    else if (command == 'stop') { // 手动停止
      clearInterval(timer)
    }
    // else if (command == 'keep') { // 请求期间匀速转动
    //   clearInterval(timer)
    //   let keepCounter = 0
    //   timer = setInterval(function () {
    //     let domstop = keepCounter % 10;
    //     runmode(domstop)
    //     keepCounter++
    //   }, time)
    // }
  }

  runcontroll(command)
}

// 模拟请求接口
// function sendMsg(fn) {
//   Observer.fire('messend') // 触发请求期间事件
//   setTimeout(function () {
//     fn();
//   }, 4000)
// }


/**
 * 观察者是怎么解耦的
 *
 * 首先各个模块只做自己的事情，统一由观察者调度
 */