

  # 一，盒子模型
    1，组成： content -》 padding（内间距） -》 border -》 margin（外间距）
      padding margin 可以设置 left right bottom top
      写两个值 ： box{ margin:30px 40px } 上下30px 左右40px
      写四个值 ： box{ margin:30px 40px 20px 50px } 上右下左  顺时针方向

    2,改变盒模型: box-sizing
      box-sizing：盒尺寸，可以改变盒子模型的展示形态
      默认值 content-box :  宽高只针对 content
      其他取值 border-box : 宽高针对的是 content padding border  

      使用场景（border-box）：1，不用操心其他值，content padding border 不会超出我们设置的范围
                             2，有的标签（input）padding过大会有不好的体验

    3，盒模型margin叠加问题
      上下 margin 会叠加（那个大取哪个），左右不会叠加
      解决这个问题实现margin累加：
        1）BFC规范
        2）想办法只给一个元素添加间距

    4,盒模型的margin传递问题
      嵌套结构且只有margin-top有传递问题：
        box1中的box2设置 margin-top会导致 父元素（box1）跟着box一起下来
      解决：1）margin设为padding
           2）给父容器加边框(可以加透明边框)

    5，拓展
      margin-left:auto; 自适应：盒子会靠到最右
      margin : 0 auto; 左右居中
      但 margin : auto auto; 不会上下居中：因为高度不能够确定

    6,盒子模型的嵌套练习
      
    