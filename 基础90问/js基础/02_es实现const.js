
/**
 * 关键在于 : Object.defineProperty(obj, prop, desc) : 在一个对象上增加或修改属性
 *      obj: 目标对象  prop:属性名称  desc:属性描述符
 */
function _const(key, value) {
  const desc = {
    value,
    writable: false
  }
  Object.defineProperty(window, key, desc)
}

_const('obj', { a: 1 })   //定义obj
obj.b = 2               //可以正常给obj的属性赋值
obj = {}                //无法赋值新对象