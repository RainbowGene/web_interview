/**
 * 步骤： 浅拷贝 + 递归
 */

// 简单浅拷贝
function cloneShallow(source) {
  let target = {}
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key]
    }
  }
  return target
}

let a = {
  name: 'Gene',
  age: 12,
  book: {
    zexue: { name: '钢铁是怎样炼成的' },
    lizi: { name: '肖申克的救赎' }
  },
  other: null
}

// let b = cloneShallow(a)

// a.book.zexue.name = '这个不是哲学'
// a.name = 'Rainbow'

// console.log(b)

// 简单深拷贝
function cloneDeep1(source) {
  let target = {};
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = cloneDeep1(source[key]); // 对对象进行递归
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// let c = cloneDeep1(a)
// a.book.zexue.name = '这个不是哲学'

// console.log(c)

/**
 * 上述深拷贝依然存在问题:
 *  - 参数未效验，不能为 null
 *  - 没有考虑数组兼容
 *  - 对于对象的判断逻辑不严谨，因为 typeof null === 'object'
 */

function cloneDeep2(source) {
  if (!isObject(source)) return source; // 非对象返回自身
  var target = Array.isArray(source) ? [] : {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {  
        target[key] = cloneDeep2(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
