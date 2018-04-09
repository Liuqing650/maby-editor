import React, {createElement} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Html from 'slate-html-serializer';
import _initProps from './config/init';
import _default from './config/default';
import _rules from './config/rules';
import * as _hotKey from './config/hotKey';
import * as Mapping from './config/mapping';
import ToolBar from './toolBar';
import './icon/iconfont.less';
import './index.less';
const DEFAULT_NODE = 'paragraph';
const html = new Html({ rules: _rules.html });
let hotKey = {};

class MabyEditor extends React.Component {
  state = {
    value: Mapping.valueMapping(_default.value, _default.mode)
  };
  initProps = {};
  // 编辑状态统计
  eidtStatus = {
    status: 'blockquote', // 当前编辑状态, 如果是多行文本, 那么这个状态就会持续保存
    close: true, //单行默认闭合,多行时,在有相同属性时闭合
    lastStep: null, // 记录上一步的操作
  };
  componentDidMount() {
    this.setUp(this.props);
    // const editorNode = document.querySelector(`.${this.props.className}`);
    // if (editorNode) {
    //   editorNode.focus();
    // }
  }
  setUp = (props) => {
    this.initProps = _initProps(props, html);
    const { value, mode } = this.initProps;
    this.setState({
      value: Mapping.valueMapping(value, mode, html)
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
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type)
  }
  _hasBlock = (type) => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type)
  }
  _onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this._onChange(change);
  }
  _onClickBlock = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value;
    if (type != 'bulleted-list' && type != 'numbered-list') {
      const isActive = this._hasBlock(type);
      const isList = this._hasBlock('list-item');
      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      const isList = this._hasBlock('list-item')
      const isType = value.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        change
          .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type)
      } else {
        change
          .setBlocks('list-item')
          .wrapBlock(type)
      }
    }
    this._onChange(change)
  }
  _changeEditState = (status, close = true, lastStep = null) => {
    this.eidtStatus = {
      status,
      close,
      lastStep
    };
  };

  /**
   * On space, if it was after an auto-markdown shortcut, convert the current
   * node into the shortcut's corresponding type.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onSpace = (event, change) => {
    const { value } = change;
    if (value.isExpanded) return

    const { startBlock, startOffset } = value;
    // 这里其实应该还要判断到底是几个字符
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '');
    const type = Mapping.getType(chars);
    if (!type) return
    if (type == 'list-item' && startBlock.type == 'list-item') return
    event.preventDefault()

    console.log('type---->', type);
    change.setBlocks(type)

    if (type == 'list-item') {
      change.wrapBlock('bulleted-list')
    }

    change.extendToStartOf(startBlock).delete()
    return true
  }

  /**
   * onTab
   */
  onTable = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    const { startBlock, startOffset } = value
    console.log(startBlock.text);
    // startBlock.text.slice(0, startOffset).replace(/\s*/g, '  ');
    event.preventDefault();
    change.extendToStartOf(startBlock).delete();
    return true
  };

  /**
   * On backspace, if at the start of a non-paragraph, convert it back into a
   * paragraph node.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onBackspace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    if (value.startOffset != 0) return

    const { startBlock } = value
    if (startBlock.type == 'paragraph') return

    event.preventDefault();
    change.setBlocks('paragraph');

    if (startBlock.type == 'list-item') {
      change.unwrapBlock('bulleted-list')
    }

    return true
  }

  /**
   * On return, if at the end of a node type that should not be extended,
   * create a new paragraph below it.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onEnter = (event, change) => {
    const { value } = change;
    const self = this;
    if (value.isExpanded) return

    const { startBlock, startOffset, endOffset } = value
    if (startOffset == 0 && startBlock.text.length == 0) return this.onBackspace(event, change)
    if (endOffset != startBlock.text.length) return

    if (
      startBlock.type != 'heading-one' &&
      startBlock.type != 'heading-two' &&
      startBlock.type != 'heading-three' &&
      startBlock.type != 'heading-four' &&
      startBlock.type != 'heading-five' &&
      startBlock.type != 'heading-six' &&
      startBlock.type != 'blockquote'
    ) {
      self._changeEditState(startBlock.type, true, 'Enter');
      return
    }
    switch (startBlock.type) {
      case 'blockquote':
        changeBlocks(startBlock.type);
        break;
      case 'code': 
        changeBlocks(startBlock.type);
        break;
      default: changeBlocks('paragraph');
        break;
    }
    const changeBlocks = (type = 'paragraph') => {
      event.preventDefault();
      change.splitBlock().setBlocks(type);
      // const close = self.eidtStatus.close
      self._changeEditState(type, !self.eidtStatus.close, 'Enter');
    };
    return true
  }
  render() {
    const { value } = this.state;
    const { placeholder, className, height, autoFocus } = this.props;
    const self = this;
    const editorStyle = {
      height: height || 500
    };
    const _onKeyDown = (event, change) => {
      switch (event.key) {
        case ' ': return self.onSpace(event, change);
        case 'Tab': return self.onTable(event, change);
        case 'Backspace': return self.onBackspace(event, change);
        case 'Enter': return self.onEnter(event, change);
      }
      return;
    }
    return (
      <Editor
        placeholder={placeholder ? placeholder : ''}
        value={value}
        className={className}
        autoFocus={autoFocus || true}
        style={editorStyle}
        onKeyDown={_onKeyDown}
        onChange={this._onChange}
        renderMark={this.renderMark}
        renderNode={this.renderNode}
        // decorateNode={this.decorateNode}
      />
    );
  };
  renderNode = (props) => {
    const { attributes, children, node } = props;
    console.log('node.type---->', node.type);
    switch (node.type) {
      case 'blockquote': return <blockquote {...attributes}>{children}</blockquote>;
      case 'heading-one': return <h1 {...attributes}>{children}</h1>;
      case 'heading-two': return <h2 {...attributes}>{children}</h2>;
      case 'heading-three': return <h3 {...attributes}>{children}</h3>;
      case 'heading-four': return <h4 {...attributes}>{children}</h4>;
      case 'heading-five': return <h5 {...attributes}>{children}</h5>;
      case 'heading-six': return <h6 {...attributes}>{children}</h6>;
      case 'bulleted-list': return <ul {...attributes}>{children}</ul>;
      case 'list-item': return <li {...attributes}>{children}</li>;
      case 'numbered-list': return <ol {...attributes}>{children}</ol>;
    }
  }
  renderMark = (props) => {
    const { children, mark } = props
    switch (mark.type) {
      case 'bold': return <strong>{children}</strong>;
      case 'code': return <code>{children}</code>;
      case 'italic': return <em>{children}</em>;
      case 'underlined': return <u>{children}</u>;
    }
  }
};
export default MabyEditor;
