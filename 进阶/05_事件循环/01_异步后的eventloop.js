
console.log('start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(function () {
  console.log('promise1');
}).then(function () {
  console.log('promise2');
});

console.log('end')

// 谷歌和火狐10以上版本结果相同，火狐10以下setTimeout打印在 Promise之前
// 了解tasks, microtasks队列就可以解答这个问题

/**
 * event loop : 事件循环，可以理解为实现异步的一种方式
 * task : 一个 event loop 有一个或多个 task 队列 , 也被称为 macrotask （宏任务）
 *  哪些是 task 任务源？
 *  DOM操作任务源：
    此任务源被用来相应dom操作，例如一个元素以非阻塞的方式插入文档。

    用户交互任务源：
    此任务源用于对用户交互作出反应，例如键盘或鼠标输入。响应用户操作的事件（例如click）必须使用task队列。

    网络任务源：
    网络任务源被用来响应网络活动。

    history traversal任务源：
    当调用history.back()等类似的api时，将任务插进task队列。

    通常为以下几种:
    - setTimeout
    - setInterval
    - setImmediate
    - I/O
    - UI rendering
 */

 /**
  * microtask: 微任务
  * 每个 event loop 有一个 microtask 被 排进 microtask队列（而不是 task队列）
  * 通常的微任务:
  *   - process.nextTick
      - promises
      - Object.observe
      - MutationObserver
  */

  /**
   * 两种event loops，一种在浏览器上下文，一种在workers中
   *  event loop 总是具有至少一个浏览器上下文,一个浏览器上下文总有一个event loop去协调它的活动。
   *  浏览器上下文销毁时,event loop也会销毁
   *  * 浏览器中的标签页或窗口包含一个浏览器上下文
   * 
   *  Worker的event loop相对简单一些，一个worker对应一个event loop，worker进程模型管理event loop的生命周期。
   * 
   * 理解:
   *  - 每个线程都有自己的event loop。
      - 浏览器可以有多个event loop，browsing contexts和web workers就是相互独立的。
      - 所有同源的browsing contexts可以共用event loop，这样它们之间就可以相互通信。
   */