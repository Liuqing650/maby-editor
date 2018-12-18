import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Button } from 'antd';
import plugins, { editCodePlugin, olListPlugin, ulListPlugin, taskListPlugin } from './plugins/import';
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
  callB(change, value) {
    console.log('this------>', this);
    this.setState({
      value: value.change().call(change, type).value
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
  onListClick = (module, plugin, type) => {
    const {
      wrapInList,
      unwrapList,
      increaseItemDepth,
      decreaseItemDepth
    } = plugin.changes;
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
        olListPlugin,
        ulListPlugin,
        taskListPlugin
      },
      onChange: this.onChange,
      onListClick: this.onListClick,
    };
    return (
      <div className={`maby ${className}`}>
        <div>
          <Button type="primary" onClick={this.onToggleCode}>
            {editCodePlugin.utils.isInCodeBlock(value)
              ? 'Paragraph'
              : 'Code Block'}
          </Button>
          <Button type="primary" onClick={() => this.onListClick('wrapInList', editListPlugin)}>
            无序
          </Button>
          <Button type="primary" onClick={() => this.onListClick('wrapInList', editListPlugin, BLOCKS.OL_LIST)}>
            有序
          </Button>
          <Button type="primary" onClick={() => this.onListClick('decreaseItemDepth', editListPlugin)}>
            减少缩进
          </Button>
          <Button type="primary" onClick={() => this.onListClick('increaseItemDepth', editListPlugin)}>
            增加缩进
          </Button>
          <Button type="primary" onClick={() => this.onListClick('unwrapList', editListPlugin)}>
            解除无序
          </Button>
          <Button type="dashed" onClick={() => this.onListClick('wrapInList', taskListPlugin)}>
            任务列表
          </Button>
          <Button type="dashed" onClick={() => this.onListClick('unwrapList', taskListPlugin)}>
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
      </div>
    );
  }
}
export default MaybeEditor;
