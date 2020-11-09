/**
 * 适配器模式:关注接口
 * 
 * 场景：一个对象的api/参数 不方便其他对象调用
 */

function dog() {

}

dog.prototype.shout = function () {
  console.log('走')
}
dog.prototype.run = function () {
  console.log('跑')
}
function brid() {

}

brid.prototype.shout = function () {
  console.log('走')
}
brid.prototype.fly = function () {
  console.log('飞')
}

// 我们想让狗可以飞，并且不改动以上类,创建一个中间方法（适配器）

function dogAdapter(dogob) {
  this.dog = dogob
}

dogAdapter.prototype = new brid()
dogAdapter.prototype.fly()

// 例2
// 公司之前jquery，后来要换成自己研发的框架A
// $.css 对应  A.c  $.on 对应  A.o 等，一个个去改显然不现实

// 创建适配器
function myA() {
  A.call(this)
}
myA.prototype = A.prototype;  // 仅供理解：myA继承了A
// 定义
myA.prototype.css = function () {
  A.c.call(this, arguments)
}
myA.prototype.on = function () {
  A.on.call(this, arguments)
}
window.$ = myA