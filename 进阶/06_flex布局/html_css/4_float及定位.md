

# 一，float
  1,float 概念及原理
    特性：加了浮动的元素，会脱离文档流，延迟父容器靠左或靠右排列
    取值： left right none

  2，注意点整理

  3，清除浮动
    不希望浮动对其他元素造成影响：
      同级排列： clear: left right both（左右都清除）;  
      嵌套排列: 
        推荐的解决方案：
          1)overflow：hidden 如果有子元素想溢出，则会收到影响
          2)after伪类：最好的解决方案
      
      html :
        <div id="box1" class="clear">
          <div id="box2"></div>
        </div>

      css:
        #box1{width:200px;border:1px black solid}
        #box1{width:200px;height:200px;background:red;float:left;}  添加浮动
        .clear:after{content:'';clear:both;display:block} 

        添加内容（一个内联标签，不会受到clear的作用，要转成块级）,原理和添加空标签一样

# 二，定位
  1，position定位
    取值：static（默认，无定位） relative（相对定位） absolute（绝对定位） fixed  sticky

    1）  relative：如果没有设置偏移量，对元素本身则无影响
                  不使元素脱离文档流，对其他元素布局无影响
         position：relative；left:100px; top:100px;  元素向右向下偏移100px

         *偏移的初始位置 左上角

    2)  absolute:脱离文档流（类似float）
                 让内联元素具备块性
                 使块元素具备内联特性（默认宽高由内容决定）
                 相对祖先元素或整个文档进行偏移
        position:absolute; left:100px; top:100px;

    3) fixed:固定定位
        使元素完全脱离文档流
        让内联元素具备块性
        使块元素具备内联特性（默认宽高由内容决定）
        只相对整个浏览器窗口定位，不受滚动条影响  
      
      使用场景：返回顶部按钮，广告，弹窗，fiexd布局等

        *只相对于浏览器视口，父元素定位了也不影响它

    4) sticky: 粘性定位
        position:sticky  不做任何操作是没有意义，要配合 top left right bottom 等
          position:sticky; top:0;   可以做到吸附效果

    5) z-index : 
      比如两个盒子使用绝对定位发生了重合，一般是后写的元素优先级最高
      要使元素优先级有区别，可以使用 z-index 取值一般是是 1~9，谁大谁优先级高
