## 1.js 数据类型有哪些，如何存储
 基本数据类型: String Number undefined null boolean Symbol(es6:独一无二的值) BigInt(es10)
 引用类型 Object
 原始数据类型：直接存储在栈（stack）中，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
 
 引用数据类型：同时存储在栈（stack）和堆（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指 向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

## 2. !!运算符
 !! 将右侧的值强行转化为布尔值

## 3. js数据类型的转化
 三种
* 转化为boolean : Boolean()
* 转化为数字 : parseInt() Number() parseFloat()
* 转化为字符串: toString() String()

## 4. 判断数据类型
1. typeof 对原始数据类型（除了null） 数组被解释为 Object
2. instanceof 正确判断对象类型,原理是通过判断对象类型中的原型链是不是能找到类型的 prototype
3. constructor:console.log(('str').constructor === String); // true
* 创建对象后更改原型，constructor就不可靠了
4. Object.prototype.toString.call() 

## 5.内置对象
 * 全局变量值有: NaN undefined
 * 全局函数； parseInt / parseFloat()  Math
 * 构造函数: Date / Object

## 6.undefined 与 undeclared 与 null
* 1) undefined 与 undeclared 的区别
    作用域内声明没赋值的变量 : undefined
    未声明的变量 ： undeclared （浏览器报引用错误）

* 2) null 和 undefined
    都只有一个值 : null（空对象） 和 undefined（未定义）
    null 作为初始化用,虽然 typeof null 返回 object,这是一个bug

## 7.{}和[]的valueOf和toString的结果是什么
* {} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"
* [] 的 valueOf 结果为 [] ，toString 的结果为 ""

## 8.Javascript 的作用域和作用域链
* 作用域是定义变量的区域，它有一套访问变量的规则,用来管理当前作用域以及嵌套作用域的变量查找
* 作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和 函数

## 10.js创建对象的几种方式
1. 一般使用对象字面量直接创建
2. es6之后可以使用多种模式创造多个相似对象(如工厂模式等)

## 11.js 继承的几种方式
1. 原型链
2. 构造函数
3. 组合继承
4. 原型式继承
5. 寄生式继承
6. 寄生式组合继承

## 12.寄生式组合继承的实现

## 13.谈谈你对this、call、apply和bind的理解
1. this: 取决调用它的函数
 * 浏览器全局范围中指向 window
 * 函数中，最后调用它的对象
 * 构造函数中，指向new 出来的新对象
 * call、apply、bind中的this被强绑定在指定的那个对象上
 * 箭头函数的this为父作用域的this,声明时就确认了下来

## 14.JavaScript 原型，原型链？ 有什么特点？

## 15.js 获取原型的方法？
1. p.proto
2. p.constructor.prototype
3. Object.getPrototypeOf(p)

## 16 闭包
* 闭包是指有权访问另一个函数作用域内变量的函数
作用
1. 函数外部能够访问到函数内部的变量,可以使用这种方法来创建私有变量。
2. 函数的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

## 17. DOM 和 BOM
1. DOM指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。
2. BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。

## 18 三种事件模型
> 事件 是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型。
1. DOM0级模型： 这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义监听函数，也可以通过 js属性来指定监听函数。这种方式是所有浏览器都兼容的。
2. E 事件模型： 在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。
3. DOM2 级事件模型： 在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。

## 19.事件委托
本质是利用了浏览器事件冒泡的机制。事件冒泡过程中会上传到父节点，且父节点可通过事件对象获取该目标节点
因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。

## 20.事件传播
事件传播的三个阶段

## 21 什么是事件捕获
在捕获阶段，事件从window开始，一直到触发事件的元素。window----> document----> html----> body ---->目标元素

## 22 什么是事件冒泡
事件冒泡刚好与事件捕获相反，当前元素---->body ----> html---->document ---->window。

## 23. DOM 操作——怎样添加、移除、移动、复制、创建和查找节点？
1)创建新节点
createDocumentFragment()    //创建一个DOM片段
  createElement()   //创建一个具体的元素
  createTextNode()   //创建一个文本节点
2）添加、移除、替换、插入
* appendChild(node)
* removeChild(node)
* replaceChild(new,old)
* insertBefore(new,old)
3）查找
* getElementById();
* getElementsByName();
* getElementsByTagName();
* getElementsByClassName();
* querySelector();
* querySelectorAll();
4）属性操作
* getAttribute(key);
* setAttribute(key, value);
* hasAttribute(key);
* removeAttribute(key);

    

## 24.数组和对象的原生方法
1)数组方法
* length() / push()
* shift()：删除第一个元素并返回
* unshift() : 开头添加一或多个元素并返回新的长度
* pop() : 删除并返回最后一个元素
* splice() : 用于插入/删除/替换元素
* concat(): 连接两个或多个数组
* join() : 将数组元素转化为字符串，元素之间用指定分隔符分隔
* toString():将数组元素转化为字符串,返回结果(元素之间 ，分割)
* reverse():颠倒顺序
* slice():返回选定的元素
* sort():从小到大排序
* indexOf() : 返回数组项的索引
* lastIndexOf():返回数组项最后一次出现的索引

2) 对象方法
* charAt() : 返回指定位置的字符
* charCodeAt():返回指定位置字符的 Unicode 编码
* concat() : 连接字符串
* indexOf() : 检索字符串
* match() : 找到一个或多个正则表达式的匹配
* replace() : 替换与正则表达式匹配的字段
* search() : 检索与正则表达式相匹配的值
* slice():提取并返回
* split():字符串分割为数组
* toLowerCase():转化为小写
* toUpperCase()：转化为大写
* toLocaleLowerCase():转化为小写
* toLocaleUpperCase()：转化为大写
* substr() : 从起始索引号提取字符串中指定数目的字符
* substring():提取两个下标之间的字符


## 25.常用的正则表达式
//（1）匹配 16 进制颜色值
var color = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

//（2）匹配日期，如 yyyy-mm-dd 格式
var date = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

//（3）匹配 qq 号
var qq = /^[1-9][0-9]{4,10}$/g;

//（4）手机号码正则
var phone = /^1[34578]\d{9}$/g;

//（5）用户名正则
var username = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/;

//（6）Email正则
var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//（7）身份证号（18位）正则
var cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

//（8）URL正则
var urlP= /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// (9)ipv4地址正则
var ipP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// (10)//车牌号正则
var cPattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;

// (11)强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：var pwd = /^(?=.\d)(?=.[a-z])(?=.[A-Z]).{8,10}$/

## 26 ajax
一种异步通信的方法，通过js脚本直接向服务器发起http请求，服务器返回数据后无刷新更新部分数据

## 27 js 延迟加载
延迟加载的几种方式
1. js 脚本放在页面底部
2. 给 js 脚本添加 defer属性
3. 给 js 脚本添加 async属性
4. 动态创建 DOM 标签的方式

## 28 模块化开发的理解
一个模块是实现一个特定功能的一组方法

## 29 js的几种模块规范
四种:
1. CommonJS 方案: require 引入模块， module.exports定义输出接口,适合服务端解决方案
    因为服务端文件都存在磁盘，读取块，而它是同步加载的，没有问题，而浏览器端由于模块加载
    使用网络请求，异步加载更合适
2.  AMD 方案:异步加载,模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个
    回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范
3. CMD 方案，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。
    它和require.js的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。
4. es6 提出的方案： import 和 export 的形式来导入导出模块。

## 30 AMD 和 CMD 规范的区别？

## 

## 33. 谈谈JS的运行机制
1. js单线程
因为作为浏览器脚本语言，创建之初是为了与用户互动或操作dom
2. js事件循环: 同步/异步任务
回答:
* 首先js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。
* 在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务
* 当同步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。
* 任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。
* 当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。



## 35. 赋值表达式中的变量问题 

## 36 V8引擎的垃圾回收机制

## 37 哪些操作会造成内存泄露
1. 意外的全局变量 : 使用了未声明的全局变量，留在内存无法被回收
2. 被遗忘的计时器或回调函数:忘记取消定时器，循环函数中有对外部变量引用导致变量无法回收
3. 脱离DOM引用:获取了DOM元素的引用，后来该元素节点被删除，引用无法被回收
4. 闭包:不合理使用导致某些变量存在内存中

## 38 ECMAScript 是什么
ECMAScript是JavaScript的标准规范

## 39 es6新特性
块作用域 : let const
类 : class
箭头函数: ()=>{}
模板字符串 : `${变量名}`
加强的对象字面
对象结构 : const {status,res} = data;
Promise:解决回调地狱，异步处理
模块 :
Symbol : 唯一
proxy : 代理

## 40. var,let和const的区别是什么？
* var 声明变量在 window 上，后两者不会
* var 存在变量提升
* let const 形成块级作用域
* var 可以声明同名变量
* const 必须赋值，不能为 null/undefined

## 41 箭头函数
* 比函数表达式语法简洁，没有自己的this/arguments/super，
更适合用于那些需要匿名函数的地方，它不能用作构造函数
```
//ES5 Version
var getCurrentDate = function (){
  return new Date();
}

//ES6 Version
const getCurrentDate = () => new Date();
```
* 如果我们只有一个表达式或值需要返回，箭头函数就会有一个隐式的返回。需要()括号，不需要 return 语句

* 箭头函数不能访问arguments对象。所以调用第一个getArgs函数会抛出一个错误。相反，我们可以使用rest参数来获得在箭头函数中传递的所有参数。
```
const data = {
  result: 0,
  nums: [1, 2, 3, 4, 5],
  computeResult() {
    // 这里的“this”指的是“data”对象
    const addAll = () => {
      return this.nums.reduce((total, cur) => total + cur, 0)
    };
    this.result = addAll();
  }
};
```

* 箭头函数没有自己的this值。它捕获词法作用域函数的this值，在此示例中，addAll函数将复制computeResult 方法中的this值，如果我们在全局作用域声明箭头函数，则this值为 window 对象。

## 42 class
使用构造函数的语法糖，在底层中使用仍然是原型和基于原型的继承。
```
//ES5 Version
   function Person(firstName, lastName, age, address){
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.address = address;
   }

   Person.self = function(){
     return this;
   }

   Person.prototype.toString = function(){
     return "[object Person]";
   }

   Person.prototype.getFullName = function (){
     return this.firstName + " " + this.lastName;
   }  

   //ES6 Version
   class Person {
        constructor(firstName, lastName, age, address){
            this.lastName = lastName;
            this.firstName = firstName;
            this.age = age;
            this.address = address;
        }

        static self() {
           return this;
        }

        toString(){
           return "[object Person]";
        }

        getFullName(){
           return `${this.firstName} ${this.lastName}`;
        }
   }
```
重写方法并从另一个类继承。
```
//ES5 Version
Employee.prototype = Object.create(Person.prototype);

function Employee(firstName, lastName, age, address, jobTitle, yearStarted) {
  Person.call(this, firstName, lastName, age, address);
  this.jobTitle = jobTitle;
  this.yearStarted = yearStarted;
}

Employee.prototype.describe = function () {
  return `I am ${this.getFullName()} and I have a position of ${this.jobTitle} and I started at ${this.yearStarted}`;
}

Employee.prototype.toString = function () {
  return "[object Employee]";
}

//ES6 Version
class Employee extends Person { //Inherits from "Person" class
  constructor(firstName, lastName, age, address, jobTitle, yearStarted) {
    super(firstName, lastName, age, address);
    this.jobTitle = jobTitle;
    this.yearStarted = yearStarted;
  }

  describe() {
    return `I am ${this.getFullName()} and I have a position of ${this.jobTitle} and I started at ${this.yearStarted}`;
  }

  toString() { // Overriding the "toString" method of "Person"
    return "[object Employee]";
  }
}
```
所以我们要怎么知道它在内部使用原型？
```
class Something {

}

function AnotherSomething(){

}
const as = new AnotherSomething();
const s = new Something();

console.log(typeof Something); // "function"
console.log(typeof AnotherSomething); // "function"
console.log(as.toString()); // "[object Object]"
console.log(as.toString()); // "[object Object]"
console.log(as.toString === Object.prototype.toString); // true
console.log(s.toString === Object.prototype.toString); // true
```


## 43 什么是模板字符串？ ``

## 44 对象解构？
```
const employee = {
  firstName: "Marko",
  lastName: "Polo",
  position: "Software Developer",
  yearHired: 2017
};

// es5
var firstName = employee.firstName;
var lastName = employee.lastName;
var position = employee.position;
var yearHired = employee.yearHired;

// es6
{ firstName, lastName, position, yearHired } = employee;

// 取别名
{ firstName:fName, lastName, position, yearHired } = employee;

// 属性为undefined时，指定默认值
{ firstName = 'Gene', lastName, position, yearHired } = employee;
```


## 45 Set 对象
Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
```
const set1 = new Set();
const set2 = new Set(["a","b","c","d","d","e"]); // 只存一个 d

set2.add("f");
set2.add("g").add("h").add("i").add("j").add("k").add("k");
// 后一个“k”不会被添加到set对象中，因为它已经存在了

set2.has("a") // true
set2.has("z") // true

set2.size // returns 10

set2.clear();

const numbers = [1, 2, 3, 4, 5, 6, 6, 7, 8, 8, 5];
const uniqueNums = [...new Set(numbers)]; // [1,2,3,4,5,6,7,8]
```
* 如果一个值已经存在于Set对象中，那么它将不再被添加
* 我们可以使用has方法检查Set实例中是否存在特定的值。
* size获得Set实例的长度
* 可以使用clear方法删除 Set 中的数据。
* 我们可以使用Set对象来删除数组中重复的元素。

## 46 Proxy 代理
属于一种“元编程”，即对编程语言进行编程
理解：在目标对象加一层拦截，外界对该对象的访问会经过它的过滤或改写

## 47. 写一个通用的事件侦听器函数
```
const EventUtils = {
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 添加事件
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },

  // 移除事件
  removeEvent: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent: function(event) {
    return event || window.event;
  },

  // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 取消事件的默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};
```

## 48 什么是函数式编程? JavaScript的哪些特性使其成为函数式语言的候选语言？

## 49. 什么是高阶函数？
高阶函数只是将函数作为参数或返回值的函数。
```
function higherOrderFunction(param,callback){
    return callback(param);
}
```

## 50 为什么函数被称为一等公民？
在JavaScript中，函数不仅拥有一切传统函数的使用方式（声明和调用），而且可以做到像简单值一样:

* 赋值（var func = function(){}）、
* 传参(function func(x,callback){callback();})、
* 返回(function(){return function(){}})
这样的函数也称之为第一级函数（First-class Function）。不仅如此，JavaScript中的函数还充当了类的构造函数的作用，同时又是一个Function类的实例(instance)。这样的多重身份让JavaScript的函数变得非常重要。

## 51. 手动实现 Array.prototype.map 方法
map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
```
function map(arr, mapCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') { 
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr)); 
      // 将 mapCallback 返回的结果 push 到 result 数组中
    }
    return result;
  }
}
```