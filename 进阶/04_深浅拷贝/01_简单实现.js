/**
 * js 中的深浅拷贝都是针对 引用类型而言
 * 浅拷贝只复制对象的引用，拷贝对象发生变化，原对象也会改变 (对象或数组)
 * 深拷贝才是真正的拷贝
 */

let originArray = [1, 2, 3, 4, 5];
let originObj = { a: 'a', b: 'b', c: [1, 2, 3], d: { dd: 'dd' } };

const cloneArray = originArray;
const cloneObj = originObj;
cloneObj.a = 'bb'

console.log(cloneArray); // [1,2,3,4,5]
console.log(originObj); // {a:'a',b:'b',c:Array[3],d:{dd:'dd'}}

// cloneArray.push(6);
// cloneObj.a = {aa:'aa'};

// console.log(cloneArray); // [1,2,3,4,5,6]
// console.log(originArray); // [1,2,3,4,5,6]

// console.log(cloneObj); // {a:{aa:'aa'},b:'b',c:Array[3],d:{dd:'dd'}}
// console.log(originArray); // {a:{aa:'aa'},b:'b',c:Array[3],d:{dd:'dd'}}

/**
 * 基本深拷贝
 * 主要是两种方法： 利用 JSON 对象中的 parse 和 stringify
 *                利用递归来实现每一层都重新创建对象并赋值
 */

const originArray = [1, 2, 3, 4, 5];
const cloneArray = JSON.parse(JSON.stringify(originArray));
console.log(cloneArray === originArray); // false


const originObj = { a: 'a', b: 'b', c: [1, 2, 3], d: { dd: 'dd' } };
const cloneObj = JSON.parse(JSON.stringify(originObj));
console.log(cloneObj === originObj); // false

cloneObj.a = 'aa';
cloneObj.c = [1, 1, 1];
cloneObj.d.dd = 'doubled';

console.log(cloneObj); // {a:'aa',b:'b',c:[1,1,1],d:{dd:'doubled'}};
console.log(originObj); // {a:'a',b:'b',c:[1,2,3],d:{dd:'dd'}};

// 上述方法只能适用于一些简单情况
// undefined、function、symbol 会在转换过程中被忽略。。。
// 例如下面属性丢失
const originObj = {
  name: 'axuebin',
  sayHello: function () {
    console.log('Hello World');
  }
}
console.log(originObj); // {name: "axuebin", sayHello: ƒ}
const cloneObj = JSON.parse(JSON.stringify(originObj));
console.log(cloneObj); // {name: "axuebin"}

// * 对象中有函数，不要用方法一



// 使用递归: 就是对每层数据都 创建->赋值
function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
const originObj = {
  name: 'axuebin',
  sayHello: function () {
    console.log('Hello World');
  }
}
console.log(originObj); // {name: "axuebin", sayHello: ƒ} 
const cloneObj = deepClone(originObj);
console.log(cloneObj); // {name: "axuebin", sayHello: ƒ} 函数也拷贝到了


