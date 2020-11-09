

/**
 *  Object.create()
 */

// 常规用法
let obj = {
  name: 'Gene',
  isHuman: false,
  desc: function () {
    console.log(`姓名:${this.name},性别:${this.isHuman ? '女' : '男'},年龄:${this.age}`)
  }
}

const obj1 = Object.create(obj)
console.log(obj1) // {}

obj1.name = 'Rainbow'
obj1.isHuman = true
obj1.age = 18
obj1.desc() // 姓名:Rainbow,性别:女,年龄:18

/**
 * 手写 Object.create
 */

Object.ObjectCreate = (proto, propertiesObject) => {
  // 对输入进行检测
  if (typeof proto !== 'object' && typeof proto !== 'function' && proto !== null) {
    throw new Error(`Object prototype may only be an Object or null:${proto}`);
  }
  // 新建一个对象
  const result = {};
  // 将该对象的原型设置为proto
  Object.setPrototypeOf(result, proto);
  // 将属性赋值给该对象
  Object.defineProperties(result, propertiesObject);
  // 返回该对象
  return result;
}


/**
 * Object.assign(target,source1,...,sourceN)
 *   用处：将源对象的所有可枚举属性复制到目标对象（浅拷贝）
 * 
 * 注意：
 *  1.如果目标对象与原对象有同名属性，由后面属性覆盖前面属性
 *  2.如果只有一个参数，返回该参数；该参数不是对象，则先转为对象；undefined和null作为参数会报错
 *  3.第二个参数不是对象，则转为对象类型，不能转为对象类型的会跳过(undefined/null不会报错)
 *  4.只复制源对象（第二个及后面的参数）的自身属性，不复制继承属性，也不复制不可枚举属性(enumerable:false)
 *  5.属性名为Symbol值的属性也会被复制
 */

let obj = {
  name: 'Gene',
  age: 24,
  desc: function () {
    console.log(this.name + ':' + this.age)
  }
}
let obj2 = {
  nickname: 'Rainbow',
  age: 18
}

let obj1 = Object.assign({}, obj, obj2) // 相当于将 {} obj obj2 合并成一个对象
obj1.desc() // Gene:18

// 手写实现
function ObjectAssign(target, ...sources) {
  if (target === undefined || target === null) {
    throw new TypeError('cannot convert first argument to object');
  }

  const targetObj = Object(target);
  // 将源对象(source)自身的所有可枚举属性复制到目标对象（target）
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (source !== undefined && source !== null) {
      // Reflect.ownKeys(obj)  返回一个数组，包含对象自身的所有属性，不管属性名是Symbol还是字符串，也不管是否可枚举
      const keysArray = Reflect.ownKeys(Object(source));
      for (let nextIndex = 0; nextIndex < keysArray.length; nextIndex++) {
        const nextKey = keysArray[nextIndex];
        // 去除不可枚举属性
        const desc = Object.getOwnPropertyDescriptor(source, nextKey);
        if (desc !== undefined && desc.enumerable) {
          targetObj[nextKey] = source[nextKey];
        }
      }
    }
  }

  return targetObj;
}

// 由于挂载到Object的assign是不可枚举的,直接挂载上去是可枚举的，所以采用这种方式
if (typeof Object.myAssign !== 'function') {
  Object.defineProperty(Object, "myAssign", {
    value: ObjectAssign,
    writable: true,
    enumerable: false,
    configurable: true
  });
}

// 测试手写
let obj = {
  name: 'Gene',
  age: 24,
  desc: function () {
    console.log(this.name + ':' + this.age)
  }
}
let obj2 = {
  nickname: 'Rainbow',
  age: 18
}

let obj1 = Object.myAssign({}, obj, obj2) // 相当于将 {} obj obj2 合并成一个对象
obj1.desc() // Gene:18

