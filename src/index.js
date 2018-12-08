import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Button } from 'antd';
import plugins, { editCodePlugin, editListPlugin, taskListPlugin } from './plugins/import';
import options from './options';
import ToolBar from './toolBar';
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
  // eslint-disable-next-line react/sort-comp
  call(change, type) {
    this.setState({
      value: this.state.value.change().call(change, type).value
    });
  }
  // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
  onChange = ({ value }) => {
    this.setState({ value });
  }
  onToggleCode = () => {
    const { value } = this.state;
    this.onChange(editCodePlugin.changes.toggleCodeBlock(value.change(), 'paragraph').focus());
  };
  onUlClick = (module, type) => {
    const {
      wrapInList,
      unwrapList,
      increaseItemDepth,
      decreaseItemDepth
    } = editListPlugin.changes;
    const dict = {
      wrapInList,
      unwrapList,
      increaseItemDepth,
      decreaseItemDepth
    };
    this.call(dict[module], type);
  };
  onTaskClick = (module, type) => {
    const {
      wrapInList,
      unwrapList,
      increaseItemDepth,
      decreaseItemDepth
    } = taskListPlugin.changes;
    const dict = {
      wrapInList,
      unwrapList,
      increaseItemDepth,
      decreaseItemDepth
    };
    this.call(dict[module], type);
  };
  render() {
    const { placeholder, className } = this.props;
    const { value } = this.state;
    const toolBarProps = {
      value,
      plugin: {
        editCodePlugin,
        editListPlugin,
        taskListPlugin
      },
      onChange: this.onChange
    };
    return (
      <div className={`maby ${className}`}>
        <Button type="primary" onClick={this.onToggleCode}>
          {editCodePlugin.utils.isInCodeBlock(value)
            ? 'Paragraph'
            : 'Code Block'}
        </Button>
        <Button type="primary" onClick={() => this.onUlClick('wrapInList')}>
          无序
        </Button>
        <Button type="primary" onClick={() => this.onUlClick('wrapInList', BLOCKS.OL_LIST)}>
          有序
        </Button>
        <Button type="primary" onClick={() => this.onUlClick('decreaseItemDepth')}>
          减少缩进
        </Button>
        <Button type="primary" onClick={() => this.onUlClick('increaseItemDepth')}>
          增加缩进
        </Button>
        <Button type="primary" onClick={() => this.onUlClick('unwrapList')}>
          解除无序
        </Button>
        <Button type="dashed" onClick={() => this.onTaskClick('wrapInList')}>
          任务列表
        </Button>
        <Button type="dashed" onClick={() => this.onTaskClick('unwrapList')}>
          解除任务列表
        </Button>
        <ToolBar {...toolBarProps} />
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
