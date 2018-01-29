import React from 'react';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import Html from 'slate-html-serializer';
import initProps from './config/init'; 
import { Value } from 'slate';
const STATUS = {
  INIT: 'init',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  UPDATE: 'update'
};
class MabyEdit extends React.Component {
  state = {
    value: null,
  };
  // 初始化编辑器
  componentDidMount() {
    const _initProps = initProps(this.props);
    if (_initProps) {
      console.log('_initProps--->', _initProps);
    }
  };
  // 回调方法
  onChange = ({ value }) => {
    this.props.onChange({ value });
  }
  // 私有方法
  _initState = (initProps) => {
    const { mode, value } = initProps;
    switch (mode) {
      case 'text':
        this._changeValue({ value: State.fromJSON(value)})
        break;
      case 'json':

        break;
      case 'html':

        break;
      case 'markdown':

        break;
      default:
        break;
    }
  };
  _changeValue = (obj) => {
    this.setState({ obj });
  };
  _hasMark = (type) => {
    const { value } = this.props
    return value.activeMarks.some(mark => mark.type == type)
  }
  _hasBlock = (type) => {
    const { value } = this.props;
    return value.blocks.some(node => node.type == type)
  }
  _onKeyDown = (event, change) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return
    }
    event.preventDefault()
    change.toggleMark(mark)
    return true
  }
  _renderNode = (props) => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list': return <ul {...attributes}>{children}</ul>
      case 'heading-one': return <h1 {...attributes}>{children}</h1>
      case 'heading-two': return <h2 {...attributes}>{children}</h2>
      case 'list-item': return <li {...attributes}>{children}</li>
      case 'numbered-list': return <ol {...attributes}>{children}</ol>
    }
  }
  _renderMark = (props) => {
    const { children, mark } = props;
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
      case 'code': return <code>{children}</code>
      case 'italic': return <em>{children}</em>
      case 'underlined': return <u>{children}</u>
    }
  }
  render() {
    const { value } = this.props;
    return (
      <div>
        <Editor
          placeholder="Enter some rich text..."
          value={value}
          onChange={this.onChange}
          onKeyDown={this._onKeyDown}
          renderNode={this._renderNode}
          renderMark={this._renderMark}
        />
      </div>
    );
  };
};
export default MabyEdit
