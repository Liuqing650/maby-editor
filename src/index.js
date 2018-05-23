import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import * as initState from './initValue/initState';
import * as tools from './decorators/tools';
import * as utils from './utils';
import CodeBlock from './components/codeBlock';
import Bold from './components/bold';
import CodeInline from './components/codeInline';
import EmInline from './components/EmInline';
import DelInline from './components/DelInline';
import Underline from './components/Underline';
import './styles/index.css';

const DEFAULT_NODE = 'paragraph';
const SAVE_KEY = utils.DICT.SAVE_KEY;

// 获取本地缓存数据
const existingValue = localStorage.getItem(SAVE_KEY) ? JSON.parse(localStorage.getItem(SAVE_KEY)) : null;

// 构建初始状态…
const initialState = Value.fromJSON(existingValue) || initState.valueModel('A line of text in a paragraph.');
const plugins = [
  tools.MarkHotkey({ key: 'b', type: 'bold' }),
  tools.MarkHotkey({ key: '`', type: 'code' }),
  tools.MarkHotkey({ key: 'i', type: 'italic' }),
  tools.MarkHotkey({ key: '~', type: 'strikethrough' }),
  tools.MarkHotkey({ key: 'u', type: 'underline' }),
];
class MabyEditor extends React.Component {
  state = {
    value: initialState
  };
  componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }
  // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
  onChange = ({ value }) => {
    this.setState({ value })
  }
  renderNode = (props) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'pre-code': return <CodeBlock {...props} />;
      // case 'heading-two': return <h2 {...attributes}>{children}</h2>;
    }
  }
  renderMark = (props) => {
    const { children, mark } = props;
    switch (mark.type) {
      case 'bold': return <Bold {...props} />;
      case 'code': return <CodeInline {...props} />;
      case 'italic': return <EmInline {...props} />;
      case 'strikethrough': return <DelInline {...props} />;
      case 'underline': return <Underline {...props} />;
      // case 'code': return <code>{children}</code>;
    }
  }
  handleKeyDown = (event, change) => {
    const { value } = this.state;
    console.log('change------>', change);
    const onSave = () => {
      const content = JSON.stringify(value.toJSON());
      localStorage.setItem(SAVE_KEY, content);
      console.log('文本已经保存...');
    }
    return tools.onKeyDown(event, change, onSave)
  };
  render() {
    const { placeholder, className, autoFocus } = this.props;
    return (
      <div className={className}>
        <Editor
          plugins={plugins}
          placeholder={placeholder || ''}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.handleKeyDown}
          autoFocus={autoFocus || true}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  };
};
export default MabyEditor;
