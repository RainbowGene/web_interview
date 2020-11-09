
/**
 * 浅拷贝： Object.assgin({},obj)  JSON.parse(JSON.stringify(obj))  cancat() slice() 等 都只能拷贝第一层
 */

const obj = {
  name: 'Gene',
  age: 24,
  friend: [
    { name: 'Rainbow', age: 18 }
  ]
}

// let obj1 = Object.assign({}, obj)
// console.log(obj.friend[0]) // { name: 'Rainbow', age: 18 }
// delete obj1.friend[0]
// console.log(obj.friend[0]) // undefined

// 我删的数obj1中的friend中的第一个对象，为什么obj中的也没了？  浅拷贝只拷贝了一层

// 手写深拷贝，递归版
function deepClone(obj) {
  if (!(typeof obj === 'object' && obj !== null)) { // 基本类型直接返回
    return obj
  }

  const res = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    // 判断是否是自身属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj === 'object' && obj !== null) {
        res[key] = deepClone(obj[key])
      }
      else {
        res[key] = obj[key]
      }
    }
  }
  return res
}

// 测试，推荐使用递归，好理解
let obj1 = deepClone(obj)
delete obj.friend
console.log(obj, obj1)


// 循环方式实现深拷贝
function cycleDeepClone(source) {
  if (!(typeof source === 'object' && source !== null)) {
    return source;
  }

  const root = Array.isArray(source) ? [] : {};
  // 定义一个栈
  const loopList = [{
    parent: root,
    key: undefined,
    data: source,
  }];

  while (loopList.length > 0) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data) ? [] : {};
    }

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object' && data !== null) {
          loopList.push({
            parent: res,
            key: key,
            data: data[key],
          });
        } else {
          res[key] = data[key];
        }
      }
    }
  }
  return root
}

// 测试
// let obj1 = cycleDeepClone(obj)
// delete obj.friend
// console.log(obj, obj1)