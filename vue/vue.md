# vue底层原理

# 定义嵌套路由
路由文件参数中: children，然后 <router-view>

# 动态路由
1. 路由文件参数 /defail/:id 跳转时 /defail/101 组件内获取 this.$router.params.id
2. 跳转时 this.$router.push({path:'/defail',query:{id:101}}) 组件内获取 this.$router.query.id
3. 直接拼接 /defail?id=101&name=Gene 获取 this.$router.query.name

# vue-router 的几种导航钩子
1. 全局导航钩子 router.beforeEach(to,from,next),跳转前判断拦截
2. 组件内钩子
3. 单独路由独享组件

# scss 动态css语言
1. webpack 预编译，下载三个loader(sass-loader、css-loader、node-sass) -> 然后webpack配置
2. 特性: 1)使用变量 $color 2)混合器 3)嵌套语句

# 前端组件库 element-ui mint-ui 等
可以全局或局部引用 main.js  全局:引入并注册  局部

# vuex
全局状态管理,多个组件使用的相同数据可以存入
可以理解为一种开发模式或框架，比如PHP中的thinkPhp java中的spring
应用级的状态放在 store中，同步改变状态模块放入mutations，异步放入actions

# vue 双向数据绑定原理
数据劫持结合发布者-订阅者模式，通过 Object.defineProperty()绑定各个属性的 getter/setter，
数据变动时发布消息给订阅者触发监听回调

1. observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
* 在自身实例化时往属性订阅器(dep)里面添加自己
* 自身必须有一个update()方法
* 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调

# vue生命周期 8个 创建前后 载入前后 更新前后 销毁前后

# 封装vue组件
1. 减少代码复用，增加项目开发效率
2. 页面抽象为多个独立组件，易于维护

# vue-loader
将vue文件解析为js文件

# template编译的理解
1. compile编译器将template编译成 AST（抽象语法树）
2. AST被generate转化成 render 函数，函数返回VNode（虚拟DOM节点）

# 三大框架的区别
* 相同： 都支持 指令、过滤器、双向数据绑定，都不支持低端浏览器
* vue与react中心思想相同：都需要编译vue/jsx 文件后使用; 一切都是组件，可以嵌套使用


# vue mixins ： 混入
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

