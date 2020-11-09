
//Proxy是es6的新构造函数，它的作用就是代理：可以让一个对象不完全暴露出去，在原操作前拦截、检查、代理
const myObj = {
  _id: '我是对象id',
  name: 'mvvm',
  age: 35
}
const myProxy = new Proxy(myObj, {
  get(target, propKey) {
    if (propKey === 'age') {
      console.log('年龄很私密，禁止访问！');
      return '*';
    }
    return target[propKey];
  },
  set(target, propKey, value, receiver) { // 对象，键，新值
    if (propKey === '_id') {
      console.log(`${value}无权修改!`)
      return;
    }
    target[propKey] = value + (receiver.time || '')
  }
})

myProxy._id = 34; //无权修改
console.log(`age is ${myProxy.age}`)  //无权访问

myProxy.name = 'my name is Gene';
console.log(myProxy)

const newObj = {
  time: `[${new Date()}]`
}
//原对象原型链赋值
Object.setPrototypeOf(myProxy, newObj)  //
myProxy.name = '注册时间为';
console.log(myProxy.name)