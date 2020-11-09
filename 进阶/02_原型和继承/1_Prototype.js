
/**
 * Prototype : 给其它对象提供共享属性的对象。
 * - 自己也是对象，只是承担了某种职能
 * - 描述成两个对象的关系，其中一个为另外一个提供属性访问权限
 * - 所有对象，都可以作为另一个对象的 prototype 来用。
 */


/**
 * 1.1 所有 object 对象都有一个隐式引用, 这个引用被称为该对象的 prototype
      例如 我们打印对象 let a={val1:1,val2:2} console.log(a)
      其中 有一个 __proto__ 的属性，意味着 obj 被隐式挂载了另一个对象的引用，置于 __proto__ 中
 */


/**
 * 1.2 prototype chain 原型链
 *   既然 prototype 只是恰好作为另一个对象的隐式引用的普通对象。那么，它也是对象，也符合一个对象的基本特征。
 *   也就是说，prototype 对象也有自己的隐式引用，有自己的 prototype 对象。
 *   如此，构成了对象的原型的原型的原型的链条，直到某个对象的隐式引用为 null，整个链条终止。
 */

const lookupProperty = (object, propertyName) => {
  let current = object
  if (current == null) {
    throw new Error(`Cannot read proerty '${propertyName}' of '${object}'`)
  }
  while (current) {
    if (current.hasOwnProperty(propertyName)) {
      return current[propertyName]
    }
    current = Object.getPrototypeOf(current)
  }
  return undefined
}

console.log('equal', lookupProperty({}, 'toString') === Object.prototype.toString)
// equal true

/**
 * 1.3 两类原型继承方式 : 显示/隐式继承
 *  它们之间的差别: 是否由开发者亲自操作(显示/隐式)
 */

// 显示原型继承：将某个对象设为另一个对象的原型

const obja = { a: 1 }
const objb = { a: 2 }
Object.setPrototypeOf(objb, obja)
console.log(objb) // __proto__ 下有一个 a:1

// 除了上述方法，还有 Object.create() 直接继承另一个对象
// 1)Object.setPrototypeOf 需要两个对象，一个作为另外一个的原型
// 2)Object.create，给我一个对象，它将作为我创建的新对象的原型。

const obj_a = { a: 'Gene' }
const obj_b = Object.create(obj_a)
console.log(obj_b) // 浏览器中运行

/**
 * 1.3.2 隐式原型继承
 *  想要一个包含数据、方法以及关联原型的丰满对象:
 *    1) 创建空对象
 *    2）设置该空对象的原型为另一个对象或者 null
 *    3）填充该对象，增加属性或方法。
 */

const obj = {}
Object.setPrototypeOf(obj, Object.prototype)
obj.firstName = 'Clycle'
obj.lastName = 'Gene'
console.log(obj)

// js 提供了几个内置的 constructor 函数，如 Object/Array/Boolean/String/Number等

const user = new Object()
user.name = 'Gene'
user.age = 12

// 简化成
const user = {
  name: 'Gene',
  age: 12
}

/**
 * 包括 var arr =[1,2] 也是 new Array() 后 再填充数据的语法糖
 * 这种写法叫做 对象字面量，它有两层隐式行为
 *  1) new Object() 创建对象
 *  2) 隐式进行原型继承 
 */

 


