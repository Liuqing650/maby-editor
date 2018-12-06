import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Button } from 'antd';
import plugins, { editCodePlugin, editListPlugin } from './plugins/import';
import options from './options';
// initSate
import * as initState from './initValue/initState';
// style
import './style';

const { BLOCKS } = options;
const SAVE_KEY = 'maybe-slate-save';
// 获取本地缓存数据
const existingValue = localStorage.getItem(SAVE_KEY) ? JSON.parse(localStorage.getItem(SAVE_KEY)) : null;
// 构建初始状态…
const initialState = existingValue ? Value.fromJSON(existingValue) : initState.valueModel('A line of text in a paragraph.');

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
  onToggleCode = () => {
    const { value } = this.state;
    this.onChange(editCodePlugin.changes.toggleCodeBlock(value.change(), 'paragraph').focus());
  };
  onUlClick = () => {
    const {
      wrapInList,
      // unwrapList,
      // increaseItemDepth,
      // decreaseItemDepth
    } = editListPlugin.changes;
    const { value } = this.state;
    wrapInList(BLOCKS.LIST_OPTIONS, value.change);
  };
  onOlClick = () => {
    const {
      // wrapInList,
      unwrapList,
      // increaseItemDepth,
      // decreaseItemDepth
    } = editListPlugin.changes;
    const { value } = this.state;
    unwrapList(BLOCKS.LIST_OPTIONS, value.change);
  };
  render() {
    const { placeholder, className } = this.props;
    const { value } = this.state;
    return (
      <div className={`maby ${className}`}>
        <Button type="primary" onClick={this.onToggleCode}>
          {editCodePlugin.utils.isInCodeBlock(value)
            ? 'Paragraph'
            : 'Code Block'}
        </Button>
        <Button type="primary" onClick={this.onOlClick}>
          有序
        </Button>
        <Button type="primary" onClick={this.onUlClick}>
          无序
        </Button>
        <Editor
          plugins={plugins}
          placeholder={placeholder || ''}
          value={value}
          onChange={this.onChange}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  }
}
export default MaybeEditor;
