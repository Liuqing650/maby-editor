更新日志
=========

~~v0.0.1~~
------

1. 自动获取焦点
  ```
    componentDidMount = () => {
      const { editor } = this;
      if (editor) {
        setTimeout(editor.focus.bind(editor), 1000);
      }
    }
    // Editor
    <Editor ref={element => { this.editor = element; }} />
  ```
2. 引入css in js 测试样式文件

1. draft-js
2. draft-js-markdown-shortcuts-plugin markdown语法解析插件
3. draft-js-plugins-editor
  - [包装draft-js的组件](https://github.com/mediasilo/draft-js-plugins-editor)

可引用插件列表:
[draft-js](https://www.npmjs.com/browse/depended/draft-js)