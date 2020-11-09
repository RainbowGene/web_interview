/**
 * map
 */

let arr = [1, 2, 3]
// console.log(arr.map(String))

Array.prototype.Mymap = function (fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(fn + 'is not a function --Gene')
  }

  // 获取需要处理的数组内容
  const arr = this;
  const len = arr.length
  const res = new Array(len) // 创建一个同样长度的结果数组

  // 遍历处理 
  for (let i = 0; i < len; i++) {
    // 获取第二个参数，改变this指向
    let temp = fn.call(arguments[1], arr[i], i, arr)
    res[i] = temp
  }
  return res
}

console.log(arr.Mymap(item => (item * 2)))

/**
 * map 的其他用法
 */

// 预处理
const res = [{
  name: 'Gene',
  age: 24,
  sex: 1
}, {
  name: 'Rainbow',
  age: 18,
  sex: 0
}]

const items = res.map(item => {
  return {
    name: item.name,
    age: item.age,
    sex: item.sex === 1 ? '男' : '女'
  }
})

console.log(items)

// 元素乘积
const arr = [1, 2, 3]
console.log(arr.map(item => (item * 2)))
// 这种写法相当于
arr.map(item => {
  return item * 2
})

/**
 * fliter:通过条件的元素返回的新数组
 * 
 */

const arr = [1, 2, 3]
console.log(arr.filter(item => item % 2 === 1))
// let res = arr.filter(item => { 
//   return item % 2 === 1
// })

// 手写
Array.prototype.Myfilter = function (fn) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} not is a function --Gene`)
  }

  const arr = this
  const len = this.length >>> 0
  const res = []

  for (let i = 0; i < len; i++) {
    const temp = fn.call(arguments[1], arr[i], i, arr)
    temp && res.push(arr[i])
  }
  return res
}

// 测试
const arr = ['a', 1, 4]
console.log(arr.Myfilter(item => typeof item !== 'string')) // [1,4]

/**
 * reduce:对数组中的每个元素执行fn，其结果汇总为一个返回值
 */

const arr = [1, 2, 3]

let res = arr.reduce((pre, nav) => pre * nav) // 累积

let res2 = arr.reduce((pre, nav) => { // 累加且有一个起始值4
  return pre + nav
}, 4)
console.log(res, res2) // 6 10

/**
 * flat:可指定深度遍历，将所有元素（包括子数组中的）合并为新数组
 *  数组扁平化
 */

const arr = [[1, 2], 3]
let res = arr.flat()
console.log(res)

// 其他扁平化方法
console.log(arr.toString().split(',').map(Number)) // 降维打击

/**
 * call
 */

const obj = {
  name: 'Gene',
  fn: 'test'
}

function print(arg) {
  console.log(`${this.name}发生了行为${arg},fn:${this.fn}`)
}

// print.call(obj, '起飞')

// 手写
Function.prototype.myCall = function (context, ...arg) {
  context = context ? Object(context) : window // 对象不存在或为null，则指向window
  // 这里的this指向调用者，即函数本身
  // context.fn = this; 这里不能这么写是因为对象中如果已有fn属性会造成原本的fn覆盖
  const fn = Symbol('fn')
  context[fn] = this
  // 获取参数并执行
  let result = context[fn](...arg)
  delete context[fn]
  return result
}

print.myCall(obj, ['跳跃', '闭眼', '左手一个慢动作'])

/**
 * apply
 */

const obj = {
  name: 'Rainbow',
  fn: 'test'
}

function printDesc(...params) {
  console.log(`${this.name}:${this.age},${params}`)
}

// printDesc.apply(obj)

// 手写 apply
Function.prototype.myApply = function (context, args = []) {
  context = context ? Object(context) : window
  const fn = Symbol('fn')
  context[fn] = this;
  const result = context[fn](...args)
  delete context[fn]
  return result
}

printDesc.myApply(obj, ['卡其嘛', 'aa'])
printDesc.apply(obj, ['卡其嘛', 'aa'])

/**
 * bind
 */

const obj = {
  name: 'Rainbow'
}

function printDesc() {
  console.log(`${this.name}:${this.age}`)
}

// printDesc.bind(obj)()

// 手写bind
Function.prototype.bind1 = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('The bound object needs to be a function');
  }

  const self = this;
  const fNOP = function () { };
  const fBound = function (...fBoundArgs) {
    // 指定this
    // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true
    return self.apply(this instanceof fNOP ? this : context, [...args, ...fBoundArgs]);
  }

  //  修改返回函数的 prototype 为绑定函数的 prototype,为了避免直接修改this的原型，所以新建了一个fNOP函数作为中介
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }
  fBound.prototype = new fNOP();

  return fBound;
}






