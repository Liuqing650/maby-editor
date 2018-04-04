# maby-editor-markdown

## 预览

[maby-editor-markdown](https://liuqing650.github.io/maby-editor/preview)

## 备注

喜欢不自由的自由,配置太多用起来还要熟悉文档,麻烦.

## 安装

```bash
npm install maby-editor --save
```

## 示例

```jsx
import React, { Component } from 'react';
import MabyEditor from 'maby-editor';
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
        <h2>测试maby-edit</h2>
        <MabyEdit {...mabyEditProps} />
      </div>
    );
  }
}
```

> 还很不完善...
