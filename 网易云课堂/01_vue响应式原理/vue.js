
function vue() {
  this.$data = { a: 1 }
  this.el = document.getElementById('app')
  this.virtuadom = ""
  this.render()
  this.observer(this.$data)
}

// 注册 get() set()
vue.prototype.observer = function (obj) {
  /* defineProperty
  var value;
  var self = this;
  for (const item in obj) {
    if (typeof value === 'object') {
      this.observer(value)
    }
    else {
      Object.defineProperty(this.$data, item, {
        get: function () {
          console.log('get one')
          return value
        },
        set: function (newvalue) {
          value = newvalue;
          console.log('set one')
          self.render()
        }
      })
    }
  }
  */

  // proxy 代理实现
  let self = this;
  this.$data = new Proxy(this.$data, {
    get: function (target, key) {
      return target[key]
    },
    set: function (target, key, newvalue) {
      target[key] = newvalue
      self.render()
    }
  })
}

vue.prototype.render = function () {
  this.virtuadom = "i am " + this.$data.a;
  this.el.innerHTML = this.virtuadom;
}

// vue 数组监听:我们知道： 只能通过特定的一些方法才能触发更新: 装饰者模式
var arraypro = Array.prototype; // pop push shilt 等方法
var arrob = Object.create(arraypro) // 拷贝一份
var arr = ['push', 'pop', 'shilt'] // 需要装饰的方法
arr.forEach(function (methods, index) {
  arrob[methods] = function () {// 重写方法
    var ret = arraypro[methods].apply(this, arguments);
    // 触发视图更新
    // dep.notify()
  }
})


// 虚拟dom:只在概念存在
/* <template>
  <div id="msg">
    <p>{{message}}</p>
    <p>123</p>
    <p>456</p>
  </div>
</template> 

以上模板会被diff算法解析成一个树状结构，类似于对象
var virtual ={
  dom:'div',
  props:{
    id:'msg'
  },
  text:'',
  children:[
    {
      dom:'p',
      text:123,
      children:[]
    }
  ]
}
*/

// diff 算法比对
function patchVnode(oldVnode, vnode) {
  // 拿出真实dom
  const el = vnode.el = oldVnode.el;
  // 分别拿出新老节点的子元素
  let i, oldCh = oldVnode.children, ch = vnode.children;
  if (oldVnode === vnode) return; // 相同则不操作
  
  // 分情况操作：1.文字节点改变  2. 增/删/改 子元素
  if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {// 比对文字节点
    api.setTextContent(el, vnode.text)
  } else { // 更新元素
    updateEle();
    if (oldCh && ch && oldCh !== ch) { // 更新子元素
      updateChildren();
    }
    else if (ch) {
      createEle(vnode) // 创建新元素 
    }
    else if (oldCh) {
      api.removeChildren(el);
    }
  }
}
