import React, {createElement} from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Html from 'slate-html-serializer';
import Prism from 'prismjs'
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

Prism.languages.markdown = Prism.languages.extend("markup", {});
Prism.languages.insertBefore("markdown", 
  "prolog", { 
    blockquote: { 
      pattern: /^>(?:[\t ]*>)*/m, 
      alias: "punctuation" 
    }, 
    code: [
      { pattern: /^(?: {4}|\t).+/m, alias: "keyword" }, 
      { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" }
    ], 
    title: [
      { pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/, alias: "important", inside: { punctuation: /==+$|--+$/ } }, 
      { pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: "important", inside: { punctuation: /^#+|#+$/ } }
    ], 
    hr: { pattern: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/m, lookbehind: !0, alias: "punctuation" }, 
    list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation" }, 
    "url-reference": { 
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/, 
      inside: { 
        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 }, 
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/, 
        punctuation: /^[\[\]!:]|[<>]/ 
      }, 
      alias: "url" 
    }, 
    bold: { 
      pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/, 
      lookbehind: !0, 
      inside: { punctuation: /^\*\*|^__|\*\*$|__$/ } 
    }, 
    italic: { 
      pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/, 
      lookbehind: !0, 
      inside: { punctuation: /^[*_]|[*_]$/ } 
    }, 
    url: { 
      pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/, 
      inside: {
        variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 }, 
        string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ } 
      } 
    }
  });
Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);

class MabyEditor extends React.Component {
  state = {
    value: Mapping.valueMapping(_default.value, _default.mode)
  };
  initProps = {};
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
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type)
  }
  _hasBlock = (type) => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type)
  }

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
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '');
    console.log('chars---->', chars);
    const type = Mapping.getType(chars);
    if (!type) return
    if (type == 'list-item' && startBlock.type == 'list-item') return
    event.preventDefault()

    change.setBlocks(type)

    if (type == 'list-item') {
      change.wrapBlock('bulleted-list')
    }

    change.extendToStartOf(startBlock).delete()
    return true
  }

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

    event.preventDefault()
    change.setBlock('paragraph')

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
    const { value } = change
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
      return
    }

    event.preventDefault()
    change.splitBlock().setBlock('paragraph')
    return true
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
        renderNode={this.renderNode}
        renderMark={this.renderMark}
        // decorateNode={this.decorateNode}
      />
    );
  };
  renderNode = (props) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>;
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

  /**
   * Define a decorator for markdown styles.
   *
   * @param {Node} node
   * @return {Array}
   */

  decorateNode(node) {
    if (node.object != 'block') return;

    const string = node.text
    const texts = node.getTexts().toArray()
    console.log('texts--->', texts);
    const grammar = Prism.languages.markdown
    const tokens = Prism.tokenize(string, grammar)
    const decorations = []
    let startText = texts.shift()
    let endText = startText
    let startOffset = 0
    let endOffset = 0
    let start = 0

    console.log('startText--->', startText);
    function getLength(token) {
      if (typeof token == 'string') {
        return token.length
      } else if (typeof token.content == 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    }

    for (const token of tokens) {
      startText = endText
      startOffset = endOffset

      const length = getLength(token)
      const end = start + length

      let available = startText.text.length - startOffset
      let remaining = length

      endOffset = startOffset + remaining

      while (available < remaining) {
        endText = texts.shift()
        remaining = length - available
        available = endText.text.length
        endOffset = remaining
      }

      if (typeof token != 'string') {
        const range = {
          anchorKey: startText.key,
          anchorOffset: startOffset,
          focusKey: endText.key,
          focusOffset: endOffset,
          marks: [{ type: token.type }],
        }

        decorations.push(range)
      }


      start = end
    }

    return decorations
  }
};
export default MabyEditor;
