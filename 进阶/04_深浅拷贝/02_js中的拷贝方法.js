
/**
 * 3 js中的一些拷贝方法
 */

// 3.1 concat: 连接两个以上的数组，返回新数组
const originArray = [1, 2, 3, 4, 5];
const cloneArray = originArray.concat();

console.log(cloneArray === originArray); // false
cloneArray.push(6); // [1,2,3,4,5,6]
console.log(originArray); // [1, 2, 3, 4, 5];

// 看上去是深拷贝,如果对象是多层的呢
const originArray = [1, [1, 2, 3], { a: 1 }];
const cloneArray = originArray.concat();
console.log(cloneArray === originArray); // false
cloneArray[1].push(4);
cloneArray[2].a = 2;
console.log(originArray); // [1,[1,2,3,4],{a:2}]

// 原数组也发生变化，concat 只是对数组的第一层进行深拷贝。

/**
 * 3.2 slice : 同 cancat ，一层深拷贝
 */
const originArray = [1, [1, 2, 3], { a: 1 }];
const cloneArray = originArray.slice();
console.log(cloneArray === originArray); // false
cloneArray[1].push(4);
cloneArray[2].a = 2;
console.log(originArray); // [1,[1,2,3,4],{a:2}]

let obj = {
  a: 'a',
  b: 'b'
}
// let obj1 = JSON.parse(JSON.stringify(obj))
// obj.a = 'xcc'
// console.log(obj, obj1)

let obj2 = Object.assign({}, obj)
obj2.a = 'sz'
console.log(obj2,obj)
