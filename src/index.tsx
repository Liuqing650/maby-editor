import * as React from 'react';

import './style/index';

import { Value } from 'slate';
import { Editor } from 'slate-react';

import { MaybeEditorProps, SlateValue, ToolBarProps } from './interface/editor';
import { formatValueByText } from './utils/formatValue';

import ToolBar from './components/ToolBar';

class MaybeEditor extends React.Component<MaybeEditorProps, {}> {
  public static defaultProps = {
    toolBar: {
      visible: true,
    },
  };
  public state: SlateValue = {
    value: Value.fromJSON(formatValueByText('')),
  };
  private editor: any;

  public componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }
  public call(change: any, type: string) {
    const { value } = this.state;
    this.setState({
      value: value.change().call(change, type).value,
    });
  }
  // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
  public onChange = (slateValue: SlateValue) => {
    this.setState({ value: slateValue.value });
    if (this.props.onChange) {
      this.props.onChange(slateValue);
    }
  }

  public render() {
    const { value } = this.state;
    const {
      placeholder, className, toolBar } = this.props;
    const toolBarProps: ToolBarProps = toolBar;
    return (
      <div className={`me ${className}`}>
        <ToolBar {...toolBarProps} />
        <div>
          <Editor
            placeholder={placeholder || ''}
            value={value}
            onChange={this.onChange}
            ref={(element: any) => { this.editor = element; }}
          />
        </div>
      </div>
    );
  }
}
export default MaybeEditor;
