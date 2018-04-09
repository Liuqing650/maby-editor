# maby-editor-markdown

## 预览

[maby-editor-markdown](https://liuqing650.github.io/maby-editor/preview)

## 备注

简单包装的一款富文本编辑器

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

> 还很不完善...
