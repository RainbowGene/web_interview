
### Vue-router 工作流程

url改变 -> 触发监听事件 -> 改变vue-router中的current变量 -> 监视current变量的监视者 -> 获取新组件 -> 渲染新组件


### hash 与 history 的使用
hash
- #后面的内容就是hash的内容: http://www.baidu.com/#/dasdabyif 不管后面是啥，都不会跳转
- 可以通过 location.hash 拿到 '#/dasdabyif'
- 可以通过 onhashchange 监听改变

history
- 正常路径
- location.pathname 拿到路径
- onpopstate 监听变化

### vue 插件基础知识，插件系统包括：vuex / vue-router 等

Vue.use() 做了什么事？
把你给它的东西调用了一遍，区别在于，如果是一个方法，它会执行方法；如果是一个对象且其中有一个install属性，
它会去执行这个属性而不会去执行本身

Vue 项目中：main.js 中
```
function a(){
  console.log(1)
}

Vue.use(a) // 启动项目浏览器打印 1
```

如果是:
```
function a(){
  console.log(1)
}
a.install = function (){
  console.log('install')
}

Vue.use(a) // 启动项目浏览器打印 install
```

> install 属性的执行高于对象本身

接着看:
```
function a(){
  console.log(1)
}
a.install = function (vue){ // 这里是可以接收vue, 这个vue就是 import Vue from 'vue' 中的 Vue 这个类
  console.log(vue)
  vue.mixin({  // 其中包括 mixin() 就是完成插件功能的关键；mixin() 全局混入了 vue实例
    data(){
      return {
        c:'this is a c from mixin'  // 我们在这里定义一个c属性，然后可以在项目任意vue组件中访问到这个c  <p>{{c}}</p>
      }
    }
  })
}

Vue.use(a) // 启动项目浏览器打印 install
```

1. 这里我们主要讲的是 生命周期的混入
```
  created:function(){
    console.log(this)
  }
```
项目启动会打印三个 this : 分别为 vue实例的this  app组件的this  helloworld组件的this

###  vue 的一系列api
1. 工具对象: vue.util 中有四个方法对象,其中有一个 defineReactive()
这个方法也监听data，其中有一个实例 dep 是 依赖收集者

例子:
```
let a = {}
let test = {
  testa: 10
}
let timer = setInterval(function () {
  if (test.testa < 1) return clearInterval(timer)
  test.testa--
}, 1000)
a.install = function (vue) {
  vue.util.defineReactive(test, 'testa') // 监听
  vue.mixin({
    beforeCreate() { // 组件没创建前注入
      this.test = test
    },
    created() {
    }
  })
}
Vue.use(a)
```
在任意组件调用 this.test.testa 可以看到值是响应式变化的

2. vue.util.extend 和 vue.extend 区别

vue.util.extend
function extend(to,_form){
  for(let key in _from){
    to[key] = _from[key]
  }
  return to
}
// 本质就是一个浅拷贝 

Vue.extend(){
  ...
}


### 手写 vue-router 基础版
Vue项目下新建 myrouter / index.js
router文件夹下 index.js 
```
// 修改一行代码
import Router from '../myrouter'
```

```
// myrouter/index.js
class HistoryRoute{
  constructor(){
    this.current = null;
  }
}

class vueRouter{
  constructor(options){ // 这里的options 就是传来我们自定义的 router 对象
    this.mode = options.mode || 'hash';
    this.routes = options.routes||[];
    this.history = new HistoryRoute;
    this.routesMap = this.createMap(this.routes);
    this.init();
  }
  init(){
    if(this.mode=='hash'){
      location.hash?'':location.hash='/';
      window.addEventListener('load',()=>{ 
        this.history.current = location.hash.slice(1); // 初始值
      });
       window.addEventListener('hashchange',()=>{
        this.history.current = location.hash.slice(1);
      })
    }
    else{
      location.pathname?'':location.pathname='/';
      window.addEventListener('load',()=>{ 
        this.history.current = location.pathname.slice(1); // 初始值
      });
       window.addEventListener('popschange',()=>{
        this.history.current = location.pathname.slice(1);
      })
    }
  }

  createMap(route){
    return routes.reduce((pre,cur)=>{
      pre[cur.path] = cur.component
      return pre;
    },{})
  }
}

vueRouter.install = function(Vue){
  Vue.mixin({
    beforeCreated(){
      if(this.$options&&this.$options.router){
        this._root = this;
        this._router = this.$options.router;
        Vue.util.defineReactive(this,'current',this._router.history); // 监听
      }
      else{
        this._root = this.$parent._root;
      }
      Object.defineProerty(this,'$router',{
        get(){
          return this._root._router;
        }
        // 没有写set方法，即不支持直接修改 $router
      })
    }
  });
     
  // 注册组件
  Vue.component('router-view',{
    // 渲染
    render(h){
      let current = this._self._root._router.history.current;
      // console.log(current)
      let routesMap = this._self._root._router.routesMap;
      // console.log(routesMap)
      return h(routesMap[current])
    }
  })
}

export defualt vueRouter;
```