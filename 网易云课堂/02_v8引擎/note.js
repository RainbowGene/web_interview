/**
 * v8引擎如何回收内存
 *
 *  - v8 引擎如何回收垃圾
 *  - 查看内存使用情况
 *  - 内存优化实例
 *
 // 为什么关注内存？
     1. 防止页面占用过大，引起客户端卡顿甚至无响应
     2. Node 使用的也是v8，对后端性能同样重要

    内存大小：
      操作系统有关： 64位：1.4G  32位：0.7G

    v8的内存分配:分为新生代和老生代
      新生代： 分为 from 和 to 两块
      老生代： 单一一块
   
      新生代：存在占用小或者存在时间短的变量
      老生代：不符合新生代条件的

      新生代中的内存回收：将from中“活着”的变量复制到to中，然后清空from，且此时 to/from会互换，等待下一次内存回收
      老生代：“死亡”的变量被标记，等待回收


 */

/**
 * node 是c++写的，node环境下可以扩容，浏览器下不行
 * 查看容量： 命令行工具 => node => process.memoryUsage()
 */

// 或者代码查看内存
function getme() {
  var mem = process.memoryUsage();
  var format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + 'MB'   //  1024* 1byte = 1kb  1kb*1024 = 1MB
  }
  console.log(`heapTotal:${format(mem.heapTotal)},heapUsed:${format(mem.heapUsed)}`)
}

getme()

/**
 * 内存就是存储变量等数据：其中全局对象直到整段程序结束才会消失，
 * 局部变量则是没有得到引用会被回收，但是不是立即回收，由v8引擎自己判断
 * 
 * 内存的优化方案: 1. 尽量不定义全局变量
 *                2. 销毁全局变量
 *                3. 避免闭包
 *                4. 用匿名子函数将全局变为局部
*/

/**
 * 内存泄漏：  
 *    - 滥用缓存:缓存通常在全局，因为局部的话可能会被回收
 *        但是缓存在v8中不要太大，用户量多则会导致宕机，比如使用 redis 缓存
 * 
 *    - 大量内存操作:比如 fs.readFile() 读取了大文件，这种场景应该使用 fs.buffer
 *                  前端的大文件上传也会造成崩溃，需要使用切片上传 
 *                  第一次传   file.slice(0,1000) 
 *                  第二次传   file.slice(0,2000) 
 *                  ......
 */

var size = 20 * 1024 * 1024;
var arr = []
for (let i = 0; i < 16; i++) {
  if (arr.length > 4) arr.shift() // 先进先出，不然数据量大服务关闭
  arr.push(new Array(size))
}
console.log(arr.length)


/**
 * 需要了解
 *   底层类：js回收机制，js变量机制，js异步机制
 *   源码类：vue：axios/vuex/vue-router
 */