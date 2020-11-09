/**
 * 多层嵌套数组 转化为 一维数组
 */

const arr = [1, [2, 3], [1, 2, 3]]

// 1. es6 的 flat
// console.log(arr.flat(Infinity))

// 2. 正则
// const str = `[${JSON.stringify(arr).replace(/(\[|\])/g, '')}]`
// console.log(JSON.parse(str) instanceof Object)

// 3. 递归
// 对于树状结构的数据，最直接的处理方式就是递归
// function format(arr) {
//   let result = []
//   for (const item of arr) {
//     item instanceof Array ? result = result.concat(format(item)) : result.push(item)
//   }
//   return result
// }

// console.log(format(arr))

// 4. reduce() 递归
function formatReduce(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(cur instanceof Array ? formatReduce(cur) : cur)
  }, [])
}

console.log(formatReduce(arr))

// 5. 迭代 + 展开运算符(解构)
// while (arr.some(Array.isArray)) {
//   arr = [].concat(...arr)
// }

// console.log(arr)