import * as React from 'react';

import './style/index';

import { Value } from 'slate';
import { Editor } from 'slate-react';

import { MaybeEditorProps, SlateValue, ToolBarProps } from './interface/editor';
import plugins from './plugins/import';

import { formatValueByText } from './utils/formatValue';

import ToolBar from './components/ToolBar';

class MaybeEditor extends React.Component<MaybeEditorProps, {}> {
  public static defaultProps = {
    toolBar: {
      visible: true,
    },
  };
  public state: SlateValue = {
    value: Value.fromJSON(formatValueByText('Some Text')),
  };
  private editor: any;

  public componentDidMount = () => {
    // TODO..
  }

  public ref = (editor: any) => {
    this.editor = editor;
  }
  public call(change: any, type: string) {
    const { value } = this.state;
    this.setState({
      value: value.change().command(change, type).value,
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
    const {
      editorContainerStyle,
      placeholder, className, toolBar } = this.props;
    const toolBarProps: ToolBarProps = toolBar;
    return (
      <div className={`me ${className}`}>
        <ToolBar {...toolBarProps} />
        <div
          id="me-editor"
          className="me-editor"
          style={editorContainerStyle}
          onClick={this.onFocusEditContainer}
        >
          <Editor
            spellCheck={false}
            autoFocus={true}
            autoCorrect={false}
            // placeholder={placeholder || ''}
            value={this.state.value}
            plugins={plugins}
            onChange={this.onChange}
            onFocus={this.onFocus}
            ref={this.ref}
          />
        </div>
      </div>
    );
  }
  private onFocusEditContainer = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    if (this.editor) {
      console.log('editor----->', this.editor);
      this.editor.moveFocusToEndOfDocument();
    }
  }
  private onFocus = (...args) => {
    console.log('args---->', args);
  }
}
export default MaybeEditor;
