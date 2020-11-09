

/**
 *  函数作为返回值
 */

// 实现一个 求和
let arr = [1, 2, 3, 4, 5]
// function sum(arr) {
//   return arr.reduce((pre, next) => {
//     return pre + next
//   })
// }

// console.log(sum(arr))

// 需求：我们不要立即求和，而是根据需要再计算，即不返回求和的结果而是 求和的函数

function lazy_sum(arr) {
  var inum = 5 // 起始值为5 ，这个可以看为一个 内部变量
  var sum = function () {
    return arr.reduce((pre, next) => {
      return pre + next
    }, inum)
  }
  return sum
}

console.log(lazy_sum(arr)) // 这里返回的是求和函数 sum
console.log(lazy_sum(arr)()) // 15  完成求和

// 这个例子有什么意义吗？
/**
 * 可以看到 sum 属于定义在函数内部的，且它引用了外部函数lazy_sum的参数和局部变量，
 * 且当它被返回时，任然保存了相关参数和变量。 这种程序结构被称为 闭包(Closure)
 */

var f1 = lazy_sum(arr) // 内部变量：新函数f1引用了 inum
var f2 = lazy_sum(arr)
console.log(f1 === f2) // false
// 尽管传入参数相同，但 f1() f2() 调用结果互不影响


/**
 * 闭包:
 *  注意上例中 sum 函数在其定义中引用了局部变量arr（也是外部函数的参数），当一个函数(lazy_sum)返回一个函数(sum)后，
 *  这个局部变量(arr和inum)被新函数(接收返回函数sum的 f1、f2)所引用。
 * 
 *  返回的函数被调用才会执行
 */


function count() {
  var arr = [];
  for (var i = 1; i <= 3; i++) {
    arr.push(function () {
      return i * i
    })
  }
  return arr
}
// console.log(count()) 

var result = count()
var f1 = result[0]
var f2 = result[1]
var f3 = result[2];

/**
 * 你可能以为 f1 f2 f3 分别为 1 4 9
 * 实际结果都为 16
 * 因为返回的函数引用的变量i 这个过程并非立即执行，而是三个函数都返回是引用的 i（此时为4）
 * 牢记一点：闭包返回的函数不引用任何循环变量或者后续改变的变量
 * 如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续
 * 如何更改，已绑定到函数参数的值不变
 */

// 额外: 创建匿名函数并立即执行的语法
(function (x) { return x * x })(3)

// 难道闭包就是为了返回一个函数然后延迟执行吗？
// 没有class的情况下，闭包可以实现变量私有化
function create_counter(initial) {
  var x = initial || 0;
  return {
    inc: function () {
      x += 1;
      return x;
    }
  }
}

// 使用
var c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

var c2 = create_counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13

// 该闭包携带了变量x，但在外部无法访问


// 闭包还可以把多参数的函数变成单参数的函数
// 如我们假如要经常用到  x^2 x^3 等
function my_pow(n) {
  return function (x) {
    return Math.pow(x, n)
  }
}

var pow2 = my_pow(2)
var pow3 = my_pow(3)

console.log(pow2(5))
console.log(pow3(4))