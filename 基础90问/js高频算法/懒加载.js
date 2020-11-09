/**
 * 懒加载
 *  
 * 原理: 1. 首先不要将地址写到src中，而是放到其属性 data-original
 *       2. 页面加载完成后，根据 scrollTop 判断图片是否在视野内，如果在则将
 *          data-orginal属性值取出放入src
 *       3. 在滚动事件中重复判断图片是否进入视野
 * 
 * 关键方法  elementNode.getAttribute(name)：方法通过名称获取属性的值。
            elementNode.setAttribute(name, value)：方法创建或改变某个新属性。
            elementNode.removeAttribute(name)：方法通过名称删除属性的值
 */

// 代码实现

var viewHeight = document.documentElement.clientHeight; // 可视化区域高度

function lazyload() {
  // 获取所有要进行懒加载的图片
  let eles = document.querySelectorAll('img[data-original][lazyload]')
  Array.prototype.forEach.call(eles, function (item, index) {
    let rect;
    if (item.dataset.original === '') {
      return;
    }

    rect = item.getBoundingClientRect()

    // 可视区动态加载
    if (rect.bottom >= 0 && rect.top < viewHeight) {
      !function () {
        let img = new Image();
        img.src = item.dataset.original;
        img.onload = function () {
          item.src = img.src
        }
        item.removeAttribute('data-original')
        item.removeAttribute('lazyload')
      }()
    }
  })
}

lazyload();

document.addEventListener('scroll', lazyload);