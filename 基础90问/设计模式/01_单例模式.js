/**
 * 单例模式
 * 
 * 即一个类只能构造出唯一实例，意义在于共享、唯一, Redux/Vue中的 store、JQ中的$
 * 或业务中的 购物车、登录框都是单例模式的应用
 * 
 */

class SingletonLogin {
  constructor(name, password) {
    this.name = name
    this.password = password
  }
  static getInstance(name, password) {
    //判断对象是否已经被创建,若创建则返回旧对象
    if (!this.instance) this.instance = new SingletonLogin(name, password)
    return this.instance
  }
}

let obj1 = SingletonLogin.getInstance('XZBiss', '123')
let obj2 = SingletonLogin.getInstance('CXK', '321')

console.log(obj1.name)
console.log(obj2)
console.log(obj1 === obj2)