import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { BoldPlugin, BlockquotePlugin, ImagesPlugin, } from './plugins';
// initSate
import * as initState from './initValue/initState';
// style
import './style';

const SAVE_KEY = 'maybe-slate-save';
// 获取本地缓存数据
const existingValue = localStorage.getItem(SAVE_KEY) ? JSON.parse(localStorage.getItem(SAVE_KEY)) : null;
// 构建初始状态…
const initialState = existingValue ? Value.fromJSON(existingValue) : initState.valueModel('A line of text in a paragraph.');

// 插件
const plugins = [
  BoldPlugin(),
  BlockquotePlugin(),
  ImagesPlugin({
    insertImage: (transform, file) => {
      return transform.insertBlock({
        type: 'image',
        isVoid: true,
        data: { file },
      });
    }
  }),
];

class MaybeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: initialState
    };
  }
  componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }
  // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
  onChange = ({ value }) => {
    this.setState({ value });
  }

  render() {
    const { placeholder, className } = this.props;
    return (
      <div className={className}>
        <Editor
          plugins={plugins}
          placeholder={placeholder || ''}
          value={this.state.value}
          onChange={this.onChange}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  }
}
export default MaybeEditor;
