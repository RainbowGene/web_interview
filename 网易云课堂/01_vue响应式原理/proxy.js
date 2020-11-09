// proxy:代理,与defineProperty功能几乎一样，但用法不同

var ob = {
  a: 1,
  b: 2
}

// 
/**
 * 不同于defineProperty 
 * 好处：不需要外部定义_value做中转值，也不需要指定实现循环遍历整个对象（proxy能监听全对象）
 *      不污染原对象
 *      可以监听数组，不需要对数组进行特异性操作
   缺点：不兼容较低版本的浏览器
 */
let ob1 = new Proxy(ob, {
  get(target, key, receiver) { // target 是原对象，key是键
    console.log(receiver)
    return target[key]
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value) // 等效于 return target[key] = value 
  }
})

console.log(ob1.a)

// proxy 其他用法


/**
 * 类型验证 : 
 * 比如，我们创建的对象有逻辑条件1：name为字符串，2 年龄不能超过150 3 性别保密
 * 下例是一个策略模式
 */

let validtor = { // 验证器对象
  name: function (value) {
    var reg = /^[\u4e00-\u9FA5]+$/  // 表示为中文编码范围
    if (typeof value === 'string' && reg.test(value)) return true;
    return false;
  },
  age: function (value) {
    if (typeof value === 'number' && value <= 150) return true;
    return false;
  }
}

function person(name, age) {
  this.name = name;
  this.age = age
  return new Proxy(this, {
    get: function (target, key) {
      return target[key]
    },
    set: function (target, key, value) {
      if (validtor[key](value)) { // 规则通过
        return Reflect.set(target, key, value)
      }
      else {
        throw new Error(key + ' is not right!')
      }
    }
  })
}

let user = person('Gene', 151)
user.name = 'Gene'

console.log(user.age)