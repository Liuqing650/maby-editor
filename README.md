# maby-editor

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
|Tab|`block`|代码块缩进（可多行）|
|Shift + Tab|`block`|代码块回退缩进（可多行）|
|ctrl + z|`all`|撤销|
|ctrl + s|`all`|保持到本地|
|ctrl + Enter|`all`|退出当前编辑状态，向下换行|
