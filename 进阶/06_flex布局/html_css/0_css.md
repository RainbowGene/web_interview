
  # 一，三种引入方式
    1，内联样式   ： style=""
    2，文档样式表   <style></style>
    3，外部样式表   <link>

  # 二，css文件编码和import引入
    1，文件编码
      在单独的css文件中最好能指定编码:
      @charset "utf-8";

    2，除了link 引入，还有import引入：
      <style>
        @import url(./css/demo.css);  //可以引入css文件
      </style>

  # 三，统配选择器的使用
    1，通用 * : 设置所有原素
    2，元素 div/p/h2/span等 ： 设置对应的元素样式
    3，id : id作为元素唯一标识符，使用 #id
    4，类 : class可以多处设置 .class
    5，属性选择器： 
      <span title="我是span"></span>
      [title]{
        只要有title属性，样式就有效
      }
      [title="我是sapan"]{
        只针对 title="我是sapan" 的元素
      }
      [title*="one"]{
        title中包含one 的元素
      }
      [title$="one"]{
        title中以one结尾 的元素
      }

    6，组合(也叫后代选择器)
      div span{ //选择div里的span

      }

      补充：
        1) .box > span : 只针对.box下面一级的span


    7，交集和并集选择器
      div + p {
        //针对div元素后面的p元素
      }

      交集选择器：同时符合两个条件  div.one : div中class为 one 的元素
              div.one[title="text"]  div class为one且title属性为text的元素
      并集选择器: 
              div, .one ,[title="text"] 符合这三个条件中的其中一个的元素

    8，伪元素

  # 四，常用属性
    1,网站添加 div 的 outline 属性:
      使用 div{
        outline : 2px solid green;
      }可以快速了解某个网站的结构划分

    2,颜色设置
      div{
        h200+w200
      }

    3,文本和字体
      1)text-decoration 装饰线
        值：none （取消）  underline（下划线） line-through（中划线） overline（上划线）
      2)letter-spacing : 字母间距  值为： 数字px
      3)word-spacing : 单词间距 值为： 数字px
      4) text-transform : 设置文本大小写转化
        值： capitalize ： 首字母大小
             uppercase：所有变大写
             lowercase：所有变小写
             none：无影响
      5) text-indent: 文本缩进 值为数字 px/em/rem
      6) text-align : 元素内容在元素中水平位置 
        值 left:靠左  center:居中  right : 右  justify:平分每行的剩余空间
          text-align-last :justify
      7) font-size: 字体大小
      8) font-family : 字体样式
      9) font-weight : 粗细 
        值 ：100 - 900 这十个值, 700用的较多  normal 为不加粗
          bold 等于 700
      10) font-style
        值 italic 等同于 <i> 标签,前提是字体样式支持倾斜; oblique:让文字倾斜
      11)font-variant: 文本小写字母 变成大写字母
    
      12)line-height : 一行文字所占据的最小行高
        为什么文本需要行高?
          行高的严格定义：两行文字基线（baseline）之间的间距
          基线：x字母最底部对齐的线
          行距： 上面一行的基线与下面一行的顶线的距离
          line-height 就是将行距上下等分，达到内容垂直居中
          上下两行文本的基线距离也等于行高
          总结 line-height = 文字高度 + 行距
      
      13)font 缩写属性的使用
        font : italic small-caps bold 30px/50px "宋体";
        依次是: style varient weight size/line-height family




  # 五，目标和元素动态伪类
    一，伪类和伪元素的选择器
      1,伪类（pseudo-classes）
        1)动态伪类： :link :visited  :hover :active :focus
          a:link : 表示a元素中未访问的样式
          a:visited 表示a元素中已访问的样式
          a:hover : 手指放上去
          a:activr : 手指按紧
          用到其他元素(strong/input/button等)都可以，记忆方式：看到lv后，haha大笑

          :focus ： 聚焦是展示的样式
            例如 input 输入框被点击聚焦  a标签被 键盘tab选中聚焦

          补充：1,去除 a 标签的 focus 效果:  a:focus{ outline:none }
                2,如果直接 a 标签设置属性，相当于给 a元素所有的动态伪类设置了样式

        2)目标伪类   :target
          :target{
            color:red
          } 
          点击之后就会执行样式    a:target 交集选择器：被选中的a元素   a :target : 后代选择器,a标签里被选中的元素

        3)语言伪类   :lang()
        4)元素状态伪类   :enabled  :display :checked
          :disabled{
            color:red
          }
          当元素处于不可使用时（例如按钮）的样式

        5)结构伪类 :   :nth-child
           1  :nth-child(3){
               color:red;   //“第三个子类” 的样式 ，必须是子元素，且是第三个,body的第三个元素也可以
             }
             p:nth-child(3){
               color:red;   //必须是p元素，p元素是子元素且第三个的样式
             }

          2  :nth-child(n)  : 自然数n表示所有子元素
             :nth-child(2n) ：偶数项的元素, 也可以写成 :nth-child(even)
             :nth-child(2n-1):奇数项
             :nth-chile(-n+5) : 前五个，排行榜中前几名特殊效果

          3  :nth-last-child(2n+1) ：跟2相反，倒着数

          4  :empty ： 空白的元素

        6)否定伪类  :not(x) :  x是一个简单的选择器：通用、元素、id、class、伪类等 

        7)伪元素
            p::first-letter{ font-size}  : p中第一个字的字体大小设为 50px
            p::first-line {color:red} : p中第一行内容变为红色
          插入其他内容before after
            ::before : 前面
            ::after : 后面

        *已访问的链接疑惑：
          浏览器有缓存，页面刷新了 a 标签依然是上次访问后的状态，结局方案清缓存

        *交集选择器和后代选择器的区别: 有没有空格 p:nth-child(n) 和 p :nth-child(n)


    二，Emmet语法


    三，css特性
