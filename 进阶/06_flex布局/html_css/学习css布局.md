
#### 1, margin : auto

```
#main {
  max-width:600px;
  margin:0 auto;
}
```

自适应居中对齐，max-width可以是浏览器更好处理小窗口的情况

#### 2,盒模型

设置一个元素 box-sizing:border-box , 则元素内外边距不会增加它的宽度

#### 3, position

3.1 static : 默认值，表示不会作任何定位

3.2 relative :在一个相对定位（position属性的值为relative）的元素上设置 top  right  bottom 和 left 属性会使其偏 离其正常位置。其他的元素的位置则不会受该元素的影响发生位置改变来弥补它偏离后剩下的空隙。

3.3 fixed : 固定定位，脱离文档流（不会保留原有的空隙）

3.4 absolute : 与fixed表现类似，不是相对视窗而是相对父元素

#### 4，float
```
img {
  float: right;
  margin: 0 0 1em 1em;
}
```
可以实现文字环绕图片

#### 5,clear : 用于控制浮动
参数 let / right / both  清除左、右、两边的浮动

#### 6，清除浮动
```
<div class='clearfix'>
<img src='' />
</div>

.clearfix{
  height:200px;
}
img{
  float:right;
}
```
上述图片过大，超出了父容器的高度,内容溢出,解决
.clearfix{
  height:200px;
  overflow:auto; //适应内容高度，或者hidden:隐藏超出的部分
}

#### 7,浮动布局例子
```
<div>
  <nav></nav>
  <select></select>
  <select></select>
</div>

css:
nav { //菜单栏浮动到左侧
  float: left;  
  width: 200px;
}
section { //预留位置
  margin-left: 200px;
}
```

#### 8，百分比宽度
百分比是一种相对于包含块的计量单位。它对图片很有用

布局:
nav {
  float: left;
  width: 25%;
}
section {
  margin-left: 25%;
}
可以实现类似7的例子

#### 9,媒体查询
响应式设计（Responsive Design）
```
@media screen and (min-width:600px) {
  nav {
    float: left;
    width: 25%;
  }
  section {
    margin-left: 25%;
  }
}
@media screen and (max-width:599px) {
  nav li {
    display: inline;
  }
}
```
当width<600时，li菜单项会排成一排显示(移动浏览器上显示更好)

#### 10, display:inline-block
```
//html文档
<div class='box'></div>
<div class='box'></div>
<div class='box'></div>
<div class='box'></div>
<div class='box'></div>
<div class='footer'></div>
```

方法一: 做网格，使用浮动（麻烦）

```
//使用网格实现div在网格下方
.box{
  float:left;
  heigth:200px;
  width:200px;
  margin:1em;
}
.footer{
  clear:left;
}
```

方法二：使用display:inline-block
```
.box{
  display:inline-block;
  heigth:200px;
  width:200px
  margin:1em;
}
```
注意:

* vertical-align 属性会影响到 inline-block 元素，你可能会把它的值设置为 top
* 需要设置每一列的宽度
* 如果HTML源代码中元素之间有空格，那么列与列之间会产生空隙