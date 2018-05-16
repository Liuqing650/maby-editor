# maby-editor-markdown

## 预览

[maby-editor-markdown](https://liuqing650.github.io/maby-editor/preview/markdown/index.html)

## 备注

包装的了markdown富文本编辑器,便于更易于自己项目中定制化使用.

## 安装

```bash
npm install maby-markdown-editor --save // 暂未发布
```

## 示例

```jsx
import React, { Component } from 'react';
import MabyMarkdownEditor from 'maby-markdown-editor';
export default class Example extends Component {
  state = {
    value: null
  }
  onChange = ({ value }) => {
    this.setState({ value })
  }
  handleSubmit = (value) => {
    console.log('value---->', value);
  }
  render() {
    const { value } = this.state;
    const mabyEditProps = {
      value: value,
      onChange: this.onChange,
      handleValue: this.handleSubmit
    };
    return (
      <div>
        <MabyMarkdownEditor {...mabyEditProps} />
      </div>
    );
  }
}
```

> 特别注意: 插件来自于 [draft-js-markdown-plugin](https://github.com/withspectrum/draft-js-markdown-plugin)
