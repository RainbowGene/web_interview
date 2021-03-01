
### 1. js 数据类型及判断
typeof : 最常见，适用于除Object类型的对象（因为数组和对象都是Object）  返回 对象类型字符串
instanceof : 判断已知对象类型，返回 true/false
constructor : obj.constructor === Object  返回 true/false  (constructor 在类继承时会出错)
prototype : 通用但繁琐的方案,  Object.prototype.toString.call(a)
其他方法:  jQuery.type(obj)  这个要引入 jQuery

### 2. 如何判断一个对象是否属于某个类
Object.prototype.toString.call(a)

### 3. 防抖应用场景及实现
节流：在一定时间内，触发多次只执行一次
防抖：停止触发一定时间后，执行一次（连点只执行最后一次）

### 4. new Promise构造函数的入参是什么？你在什么场景下会使用promise
两个回调函数(成功和失败)：resolve , reject
使用场景：
1. 处理异步请求
2. 使用Promise.all判断并行执行的任务
3. 处理按顺序执行的任务

### 5. vue 的核心原理
数据驱动和组件化
数据驱动：数据双向绑定，在vue中，指令对view进行了封装，model中的数据发生变化，Vue就会通过
         指令去修改DOM，同时也通过DOM listeners 监听视图，当DOM改变被监听到然后更新视图
      
组件化：1. 拓展html元素，将页面上每个独立的可视/可交互区域视为一个组件
       2. 页面可以看作组件的容器，组件自由嵌套

### 6. 说下vue的双向数据绑定的实现原理
采用数据劫持+(发布<->订阅者模式)


### 7. 微信小程序和传统h5页面有什么不同，哪个性能更好
运行环境不同
- 小程序的运行环境是基于浏览器内核完全重构的一个内置解析器，针对性优化，配合自己定义的开发语言标准，
  提升了性能。脚本无法使用浏览器中常用的window和document对象，从源头上避免了内存泄露。
- h5：无法控制开发人员对DOM的操作，容易出现内存泄露，且SPA还存在页面加载慢的问题

开发成本的不同
- 小程序规定了开发标准，简单很多

获取系统权限的不同
- 小程序拥有更多的系统权限，比如网络通讯状态、数据缓存能力。

运行流畅度的不同
- 小程序代码直接在app上运行，通过浏览器双线程UI渲染和业务逻辑分离，比h5流畅很多

运维方式不同
- 小程序: 小程序支持灰度发布、AB测试，在出现异常情况下可以实时在管理界面上操作回退。H5: H5如果出现异常问题，需要运维人员在生产环境重新部署回滚系统，要动到生产环境的系统部署，有较大的风险。

### 8. h5的远程调试
- 利用Chrome进行远程移动端调试
- weinre

### 9. 如何进行手机的页面或者应用的抓包
- Fiddler工具(HTTP协议调试代理工具),能够进行常见的抓包和分析操作

### 10 已知公司附近有两个加油站和一条主干道，如何在一天内统计出全市有多少台车


## 小米面试题
### 1. vue源码是否看过，说一说收获的点

### 2. css 的三大特性并展开说一下应用场景
继承性：给父元素设置的某些样式会继承到后代元素上  color/font-/text-/line-
层叠性：css处理冲突的一种能力,同一个元素被多个选择器选中并对同一个属性进行了定义（设置），只有一个生效（优先级高的）
优先级：当触发层叠性时，通过优先级决定哪个设置生效

### 3. 输入网址按回车后发生了什么
基础回答
1. 浏览器将url交给dns域名解析，找到真实ip，向服务器发起请求
2. 服务器交给后台返回数据
3. 浏览器对加载到的资源进行语法解析，建立相应的内部数据结构（如html的DOM）
4. 载入解析到的资源文件，渲染页面，完成

### 4. http状态码
- 1** : 信息，服务器接收到请求，需要请求者继续操作
- 2** : 成功，操作被成功接收并处理
- 3** ：重定向，需要进一步操作完成请求
- 4** : 客户端错误
- 5** : 服务器在处理请求的过程中发生错误

### 5. 实现一个简单的单点登录 单点登录简称SSO(Single Sign On)
- 参照仿微信项目

### 6. 关系型数据库和非关系型数据库的区别
- [点击链接](https://www.shulanxt.com/doc/dbdoc/sql-nosql)

### 7. 关系型数据库中外键的使用
优点：
1. 由数据库自身保证数据的一致性
2. 偏向设计，一定程度上说明业务逻辑
3. 减少数据冗余，表与表的级联关系更加明确

### 8. 手写翻转二叉树

### 9. 说下归并排序的思路和应用场景
- 一个分治法的典型应用
1. 把长度为n的输入序列分成两个长度为n/2的子序列；
2. 对这两个子序列分别采用归并排序；
3. 将两个排序好的子序列合并成一个最终的排序序列。

``` 
function mergeSort(arr) {
    varlen = arr.length;
    if(len < 2) {
        returnarr;
    }
    varmiddle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    returnmerge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right) {
    varresult = [];
 
    while(left.length>0 && right.length>0) {
        if(left[0] <= right[0]) {
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
 
    while(left.length)
        result.push(left.shift());
 
    while(right.length)
        result.push(right.shift());
 
    returnresult;
}
```

### 10. 你知道的设计模式及应用场景
参考vue源码发布-订阅者模式  查询资料单例模式  简单工厂模式

### 11. 如何用缓存进行前端优化；说下浏览器缓存、dns缓存、nginx缓存、服务器缓存的区别，强缓存和协商缓存的应用

### 12. 如何进行前端性能优化

### 13. 说下重绘、重排、回流
回流
> 元素尺寸或位置发生变化，需要重新计算渲染数，这叫做回流（重排）
- 几何属性发生改变触发: margin/padding/border/width/height
- 元素移动或增加时也会触发
- 读写 offset/scroll/client 等属性会触发
- 调用 window.getComputedStyle 触发

重绘
> 元素样式发生变化，但没有影响几何属性，性能上优于回流

* 回流必定引发重绘，重绘则不一定引发回流

### 14.  给定N 有 a^2+b^2=N a>b 返回所有符合条件的结果
```
function hanshu(N) {
  let max = Math.ceil(Math.sqrt(N)) // 最大边界
  let arr = []
  for (let i = 1; i < max - 1; i++) {
    for (let j = 2; j < max; j++) {
      if (i * i + j * j === N) {
        if (i < j) {
          arr.push([i, j])
        }
      }
    }
  }
  return max
}
```

