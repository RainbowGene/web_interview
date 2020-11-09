/**
 * 装饰者模式
 * 
 * 场景：一个方法已写好，但后来发现并不完全符合业务。没办法大量改动原代码
 */

// 最简单的一个例子
function a() {
  console.log(1)
}

function b() {
  a();
  console.log(2)
}

// 如果我们使用继承（面向对象编程）显得太过笨重

// 实际一点例子：
// 项目所有请求时有一个 loading，可以通过重写请求方法，加入loading方法

dom1.onclick = function () {
  console.log('dosome')
}
// 可以装饰这个方法
var oldFn = dom1.onclick;
dom1.onclick = function () {
  oldFn()
  // 我的处理
}
