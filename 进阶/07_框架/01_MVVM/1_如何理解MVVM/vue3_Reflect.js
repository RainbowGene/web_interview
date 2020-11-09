//使用Reflect改变对象原型
const myObj = {
  _id: 'id',
  name: 'mvvm',
  age: 25
}

const myProxy = new Proxy(myObj, {
  get(target, propKey) {
    if (propKey === 'age') {
      console.log('年龄很私密')
      return '**'
    }
    return target[propKey];
  },
  set(target, propKey, value, receiver) {
    if (propKey === '_id') {
      console.log('id无权修改');
      return;
    }
    target[propKey] = value + (receiver.time || '')
  },
  setPrototypeOf(target, proto) {
    if (proto.status === 'enable') {
      Reflect.setPrototypeOf(target, proto);
      return true;
    }
    return false;
  }
})

// 原对象原型链赋值
const result1 = Reflect.setPrototypeOf(myProxy, {
  time: `[${new Date()}]`,
  status: 'disable'
})
myProxy.name = 'first set name';
console.log(result1) // false 
console.log(myProxy.name) //first set name

const result2 = Reflect.setPrototypeOf(myProxy, {
  time: ` [${new Date()}]`,
  status: 'enable'
})
myProxy.name = 'second set name'
console.log(result2)
console.log(myProxy.name)

//解释：通过Reflec.setPrototypeOf方法修改原对象原型时，必须经过Proxy里hander的挂载的setPrototypeOf挂载函数，
//在挂载函数里进行条件proto.status是否是enable筛选后，再决定是否真正修改原对象myObj的原型，最后返回true或者false
//来告知外部原型是否修改成功。

