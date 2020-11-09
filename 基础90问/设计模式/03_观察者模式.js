/**
 * 
 * 观察者模式概念很简单：观察者监听被观察者的变化，被观察者发生改变时，通知所有的观察者。
 * 
 * 被广泛用于监听事件的实现
 */

// 观察者
class Observer {
  constructor(fn) {
    this.update = fn
  }
}

// 被观察者
class Subject {
  constructor() {
    this.observers = [] //观察者队列
  }

  addObserver(observer) {
    this.observers.push(observer) //添加到队列
  }

  notify() { // 通知所有观察者,实际上执行了所有观察者的 update
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

let subject = new Subject()