/**
 * new
 * 步骤:1.一个新对象创建
 *      2.该对象的_proto_属性指向该构造函数的原型，即 Fn.prototype
 *      3.将执行上下文（this）绑定到新创建的对象中
 *      4.如果构造函数有返回值，那么这个返回值将取代第一步中创建的对象
 */

function New(Fn, ...arg) {
  // 一个新的对象被创建
  const result = {};
  // 该对象的__proto__属性指向该构造函数的原型
  if (Fn.prototype !== null) {
    Object.setPrototypeOf(result, Fn.prototype);
  }
  // 将执行上下文（this）绑定到新创建的对象中
  const returnResult = Fn.apply(result, arg);
  // 如果构造函数有返回值，那么这个返回值将取代第一步中新创建的对象。否则返回该对象
  if ((typeof returnResult === "object" || typeof returnResult === "function") && returnResult !== null) {
    return returnResult;
  }
  return result;
}

let newobj = New()

console.log(newobj)



/**
 * instanceof
 * 原理:只要右边变量（一般是构造函数）和 prototype 在左边变量（一般是对象）的原型链上即可。
 *      因此，instanceof 在查找过程中会遍历左边变量的原型链，知道找到右边变量的prototype
 *      查找失败会返回false，即通过L.__proto__.__proto__ = R.prototype 来确定最终结果
 * 
 * 步骤: - 获取左边变量隐式原型  __proto__
 *       = 获取右边变量显示原型  prototype
 *       - 比较返回  true/false
 */

function myInstanceof(left, right) {
  let leftVal = Object.getPrototypeOf(left)
  const rightVal = right.prototype

  while (leftVal !== null) {
    if (leftVal === rightVal) return true
    leftVal = Object.getPrototypeOf(leftVal)
  }
  return false
}

console.log(myInstanceof(123, String)) // true

// console.log(Object.getPrototypeOf(123), Object.getPrototypeOf('123')) // 隐式原型
// console.log(Number.prototype, String.prototype) // 显示原型