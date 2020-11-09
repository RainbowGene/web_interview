
/**
 * es6 标准 ： 箭头函数
 *  箭头函数看上去是匿名函数的一种简写，实际上两者有明显区别:
 *  箭头函数内部 this是词法作用域，由上下文确定
 */

var pow = x => x * x
console.log(pow(2)) // 4 

var arr = [20, 10, 2, 1]

console.log(arr.sort((x, y) => x - y))