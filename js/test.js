//#region - 数据转化
// let s = '123.12'
// console.log(typeof Number(s)) // number
// console.log(Boolean(s)) // true
// console.log(typeof Number(s).toString()) // string
// console.log(!!s) // true
//#endregion

//#region - 判断类型

// let arr1 = [1, 2]
// console.log(typeof arr1) // object
// console.log(arr1 instanceof Array) // true
// console.log(true instanceof Boolean);  // false 
// console.log('str' instanceof String);  // false  
// true 和 'str' 不是实例，判断为false
// 基本数据类型使用typeof 引用数据类型(Object/Array)使用 instanceof

// 3) constructor
// 正常使用
// console.log((2).constructor === Number) //true

// 坑：创建一个对象，更改它的原型，constructor就会变得不可靠了
// function Fn(){};
// Fn.prototype=new Array();
// var f=new Fn();
// console.log(f.constructor===Fn);    // false
// console.log(f.constructor===Array); // true 

// 4) Object.prototype.toString.call() 
//console.log(Object.prototype.toString.call(2)) //[object Number]
//#endregion

//#region -寄生式组合继承的实现
// function Person(name) {
//   this.name = name;
// }

// Person.prototype.sayName = function () {
//   console.log("My name is " + this.name + ".");
// };

// function Student(name, grade) {
//   Person.call(this, name);
//   this.grade = grade;
// }

// Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;

// Student.prototype.sayMyGrade = function () {
//   console.log("My grade is " + this.grade + ".");
// };
//#endregion

//#region - 原生数组/对象方法
// 1 数组
// let arr = [1, 2, 3, 4, 5, 2]
//console.log(arr.unshift(1)) // 头部添加，返回新的长度
// console.log(arr.join(' '))
// console.log(arr.toString())
//console.log(arr.slice(2,4)) // 返回选定的元素成为新数组: arr[2] - arr[4-1] 之间的元素 
// console.log(arr.indexOf(1)) // 0
// console.log(arr.lastIndexOf(2)) // 5

// 2 对象
// let s = "Clycle Gene"
// console.log(s.charAt(0)) //C
// console.log(s.charCodeAt(0)) //67 Unicode 编码
// console.log(s.indexOf('c')) // 存在c返回第一次出现的下标，不存在返回 -1
// console.log(s.toLocaleUpperCase())
// console.log(s.substr(1,3)) // 从下标1开始提取3个字符
// console.log(s.substring(1, 3)) // 提取两个下标之间的字符
//#endregion

//#region 35

// function myFunc() {
//   let a = b = 0;
// }

// myFunc();
// console.log(b) // b 
/**
 * 为什么b变成了全局变量?
 * 因为赋值表达式从左到右进行 let a = (b = 0)，在函数中 b 没有声明，js引擎在函数外
 * 创建了全局变量 b， 然后赋值给局部变量a
 */
//#endregion

//#region  Set
// const set1 = new Set();
// const set2 = new Set(["a", "b", "c", "d", "d", "e"]);

// set2.add("f");
// set2.add("g").add("h").add("i").add("j").add("k").add("k");
// // 后一个“k”不会被添加到set对象中，因为它已经存在了

// set2.has("a") // true
// set2.has("z") // true

// console.log(set2.size) // returns 10

// set2.clear();

// const numbers = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 5];
// // 删除数组中重复元素
// const uniqueNums = [...new Set(numbers)]; // [1,2,3,4,5,6,7,8]
//#endregion

//#region 手动实现 Array.prototype.map 方法
// function map(arr, mapCallback) {
//   // 首先，检查传递的参数是否正确。
//   if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
//     return [];
//   } else {
//     let result = [];
//     // 每次调用此函数时，我们都会创建一个 result 数组
//     // 因为我们不想改变原始数组。
//     for (let i = 0, len = arr.length; i < len; i++) {
//       result.push(mapCallback(arr[i], i, arr));
//       // 将 mapCallback 返回的结果 push 到 result 数组中
//     }
//     return result;
//   }
// }
// const arr = [1, 2, 3]
// console.log(map(arr))
//#endregion


var my_data = { a: 'Ape', b: 'Banana', c: 'Citronella' };
for (var key in my_data) {
  console.log(key);
}