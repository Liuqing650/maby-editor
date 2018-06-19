# maby-editor


## preview
[maby-editor-slate](https://liuqing650.github.io/maby-editor/preview/slateDev)

## 备注

这里是编辑器实验室

基于 [slate](https://github.com/ianstormtaylor/slate) 框架进行开发
梦想实现一个兼备 `markdown` 和 `WYSIWYG` 类型的编辑器基础模型

> 为何叫模型？
> 因为里面全为组件化，未来可基于不同的UI框架修改为相应的编辑器

开发者更喜欢的是较好的高亮代码和快捷键编辑文档。

喜欢富文本编辑器的希望有些可供交互的编辑器

## 为何不选 Draft.js

其实是放弃了，其开发复杂承担远高于 `slate`，且没有中文文档和适合我想法的例子...

> 还很不完善...
> 目前可以使用快捷键完成：
> 加粗，倾斜，删除，代码块，标题1-6，撤销
> 复制代码块效果只有原来是代码才有作用

目前已实现功能，暂时选用的快捷键开启该功能

|快捷键|类型|说明|
|:-:|:-:|:-:|
|ctrl + b|`inline`|加粗|
|ctrl + i|`inline`|倾斜|
|ctrl + d|`inline`|删除|
|ctrl + 7|`inline`|代码|
|ctrl + 1|`inline`|标题1|
|ctrl + 2|`inline`|标题2|
|ctrl + 3|`inline`|标题3|
|ctrl + 4|`inline`|标题4|
|ctrl + 5|`inline`|标题5|
|ctrl + 6|`inline`|标题6|
|ctrl + m|`block`|高亮代码块|
|ctrl + j|`list`|序号列表|
|连续Enter|`list`|在序列中每次回车退出一级|
|Shift + Enter|`list`|在该序列中换行继续编辑|
|Tab|`block`|代码块缩进（可多行）|
|Shift + Tab|`block`|代码块回退缩进（可多行）|
|ctrl + z|`all`|撤销|
|ctrl + s|`all`|保持到本地|
|ctrl + Enter|`all`|退出当前编辑状态，向下换行|

## 开发更新进度(2018-06-14)

1. table新增了部分控制功能,优化宽度
2. 修改 `toolBar` 下划线失效
3. 新增分割线
4. 新增删除线

## (2018-06-15)

1. 新增拖拽图片
2. 新增自动识别超链接

## (2018-06-19)

1. 新增行内元素的 `markdown` 输入方式, 空格呈现效果
2. 新增快捷键 `ctrl + e` 退出行内编辑模式,用于处理 `markdown` 输入方式产生的错误问题

输入方式
|输入|类型|说明|
|:-|:-:|:-:|
|`**加粗** or __加粗__` + `空格(space)`|`inline`|加粗|
|`*倾斜*` + `空格(space)`|`inline`|倾斜|
|`~删除线~` + `空格(space)`|`inline`|删除|
|`_标签_` + `空格(space)`|`inline`|标签|

> 文档中使用 **x** 代表 **Tab顶上的第一个键**, 实际使用则 **输入Tab顶上的第一个键**

使用一对 `x标签x` 时,为标签
使用一对 `xxx` 时,为代码块
使用一对 `xxx:css` 时,为JavaScript代码块

