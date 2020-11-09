


# 1,link标签拓展
  1)添加地址栏小图标
    <link rel='icon' type="/image/x-icon" href="图标地址">
  2)提前dns处理
    <link rel="dns-prefetch" href="">
    可以加快引入速度

# 2,mate 标签拓展
    meta添加一些辅助信息
    1) description:添加描述，利于 SEO
      <mate name="description" content="描述内容">

    2)  keywords关键字
      <mate name="keywords" content="关键字">

    3)rendder 浏览器内核
      <mate name="rendder" content="webkit">

    4) 功能性meta
      <meta http-equiv="X-UA-Compatible" content="ie=edge"> 针对ie，让ie使用更高版本渲染
      <meta http-equiv="refresh" content="3" url="https://www.taobao.com">  刷新后3秒跳转url

# 3,html5 新语义化标签
  1, header（页眉） / footer（页脚） / main（主体） / nav（导航栏） / hgroup(标题) 等

  *header/footer/main 只能出现一次

# 4，表格拓展
    1，添加单线: border-collapse:collapse
    2,隐藏空单元: empty-cells:hide
    3,斜线分类:   border / rotate
    4,列分组 ： colgroup / col

# 5，表单拓展
    1，美化复选框
    2，美化提交
  
# 6,BFC规范
    1,概述： block formatting context 块级格式化上下文
    2，特性： 具有bfc特性的元素可以看作是隔离了的独立容器，容器里的元素不会在布局上影响到外面的元素
             且bfc具有普通容器所没有的一些特性
    3，触发条件： 1）浮动元素 ： float除none以外的值
                 2）绝对定位元素 ： position （absolute、fixed）
                 3）display为online-block、flex等
                 4）overflow除了visible以外的值：hidden、auto、scroll
    4,可以解决的问题：1）margin上下叠加问题

# 7,浏览器内核与浏览器前缀
    