
# 1，什么是mvvm
  MVVM是一种软件架构模式，vue是其中一种在前端上面的实现。
  mvvm作为一种mvc的补充模式，使控制的逻辑更加符合轻量级的要求

# 2，mvc
  前后端完全分离前的mvc框架：java的springMvc、PHP的smarty、nodejs的express和Koa
  model：数据模型层
  view：视图层
  Controller：桥梁层

# ViewModel
  将模型与视图做了一个绑定关系，目前的前端领域内有三种实现：Angularjs的主动轮询查询新旧值变化更新视图、
  Vue利用ES5的Object.defineProperty的getter/setter方法绑定、backbone的发布订阅模式，从主动和被动的方式去实现了ViewModel的关系绑定

# Vue 2.0 中的mvvm实现
  响应式原理：vue在实例化时将data中的对象属性都挂上setter方法将页面上的属性绑定，页面加载时
             调用mounted挂载函数获取接口数据，获取完成后给data里属性赋值

# Vue 3.0 中的mvvm实现
  用Proxy和Reflect来替代Object.definePropertypry的方式
    Proxy:Proxy是es6的新构造函数，它的作用就是代理：可以让一个对象不完全暴露出去，在原操作前拦截、检查、代理
    Reflect:Reflect是ES6里的新的对象，非构造函数，不能用new操作符。可以把它跟Math类比，Math是处理JS中数学问题的方法函数集合，Reflect是JS中对象操作方法函数集合，它暴露出来的方法与Object构造函数所带的静态方法大部分重合，实际功能也类似，Reflect的出现一部分原因是想让开发者不直接使用Object这一类语言层面上的方法，还有一部分原因也是为了完善一些功能。Reflect提供的方法还有一个特点，完全与Proxy构造函数里Hander参数对象中的钩子属性一一对应。