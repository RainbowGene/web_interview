/**
 * 
 * 工厂模式
 * 
 * 工厂模式即对创建对象逻辑的封装，或者可以简单理解为对new的封装，这种封装就像创建对象的工厂，故名工厂模式。
 * 工厂模式常见于大型项目，比如JQ的$对象，我们创建选择器对象时之所以没有new selector就是因为$()已经是一个
 * 工厂方法，其他例子例如React.createElement()、Vue.component()都是工厂模式的实现。工厂模式有多种：简单
 * 工厂模式、工厂方法模式、抽象工厂模式这里只以简单工厂模式为例
 * 
 */

class User {
  constructor(name, auth) {
    this.name = name;
    this.auth = auth;
  }
}

class UserFactory {
  static createUser(name, auth) {
    if (auth === 'admin') return new User(name, 1)
    else return new User(name, 2)
  }
}

const admin = UserFactory.createUser('Gene', 'admin')
const user = UserFactory.createUser('Rainbow', 'user')
const youke = UserFactory.createUser('user11003', '游客')

console.log(youke.auth) // 2
