import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Html from 'slate-html-serializer';
import _initProps from './config/init';
import _default from './config/default';
import _rules from './config/rules';
import * as _hotKey from './config/hotKey';
import * as Mapping from './config/mapping';
import ToolBar from './toolBar';
import './index.less';

const html = new Html({ rules: _rules.html });
let hotKey = {};
class MabyEdit extends React.Component {
  state = {
    value: Mapping.valueMapping(_default.value, _default.mode)
  };
  initProps = {};
  componentDidMount() {
    this.setUp(this.props);
  }
  setUp = (props) => {
    this.initProps = _initProps(props, html);
    const { value, mode, tools } = this.initProps;
    // console.log('initProps----->', this.initProps);
    hotKey = _hotKey.setHotKeys(tools);
    this.setState({
      value: Mapping.valueMapping(value, mode, html),
    })
  }
  // 回调方法
  _onChange = ({ value }) => {
    this.setState({ value });
    if (value.document != this.state.value.document) {
      if (this.props.onChange) {
        this.props.onChange({ value });
        this._handleValue(value);
      }
    }
  };
  // 获取处理值
  _handleValue = (value) => {
    if (this.props.handleValue) {
      const { mode } = this.initProps;
      this.props.handleValue(Mapping.analysisValue(value || this.state.value, mode, html));
    }
  };
  _hasMark = (type) => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type == type)
  }
  _hasBlock = (type) => {
    const { value } = this.state
    return value.blocks.some(node => node.type == type)
  }
  _onKeyDown(event, change) {
    let mark;
    Object.keys(hotKey).map((key) => {
      let temp = key.toString();
      if (hotKey[key](event)) {
        mark = temp.replace('HotKey', '');
      }
    });
    if (!mark) {
      return false;
    }
    event.preventDefault();
    change.toggleMark(mark);
    return true;
  }
  _onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this._onChange(change);
  }
  _onClickBlock = () => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this._hasBlock(type)
      const isList = this._hasBlock('list-item')

      if (isList) {
        change
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      }

      else {
        change
          .setBlock(isActive ? DEFAULT_NODE : type)
      }
    }

    else {
      const isList = this._hasBlock('list-item')
      const isType = value.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type)
      } else {
        change
          .setBlock('list-item')
          .wrapBlock(type)
      }
    }

    this._onChange(change)
  }
  render() {
    const { value } = this.state;
    const { placeholder, className } = this.props;
    const { tools } = this.initProps;
    const toolBarProps = {
      tools: Mapping.analysisTools(tools),
      hasMark: this._hasMark,
      hasBlock: this._hasBlock,
      onClickMark: this._onClickMark,
      onClickBlock: this._onClickBlock
    };
    return (
      <div className={className}>
        <ToolBar {...toolBarProps} />
        <Editor
          placeholder={placeholder ? placeholder : ''}
          value={value}
          onKeyDown={this._onKeyDown}
          onChange={this._onChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  };
  renderNode = (props) => {
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
  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>
      case 'code': return <code>{children}</code>
      case 'italic': return <em>{children}</em>
      case 'underlined': return <u>{children}</u>
    }
  }

};
export default MabyEdit
