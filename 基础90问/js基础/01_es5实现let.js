
// babel 处理 let： 变量前面加下划线，避免块级作用域中访问到该变量
for (var _i = 0; _i < 5; _i++) {
  console.log(_i)
}

// 自执行函数模拟块级作用域
(function () {
  for (var i = 0; i < 5; i++) {
    console.log(i)
  }
})()

console.log(i) // 没有定义 i 报错

/**
 * var 声明挂载到了 window 上
 * var 声明时变量提升
 * let和const 形成块级作用域
 * var 可以声明同名变量
 * let 和 const 不能在声明前使用
 *
 *   babel 转化只实现了 2.3.5
 */




