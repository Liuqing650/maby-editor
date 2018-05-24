import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Prism from 'prismjs';
import * as initState from './initValue/initState';
import * as tools from './decorators/tools';
import * as utils from './utils';
import CodeBlock from './components/codeBlock';
import CodeBlockLine from './components/codeBlockLine';
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
const initialState = existingValue ? Value.fromJSON(existingValue) : initState.valueModel('A line of text in a paragraph.');

// 插件
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
    console.log('node.type-=--------->', node.type);
    switch (node.type) {
      case 'code-block': return <CodeBlock {...props} />;
      case 'code-line': return <CodeBlockLine {...props} />
      case 'header-one': return <h1 {...attributes}>{children}</h1>;
      case 'header-two': return <h2 {...attributes}>{children}</h2>;
      case 'header-three': return <h3 {...attributes}>{children}</h3>;
      case 'header-four': return <h4 {...attributes}>{children}</h4>;
      case 'header-five': return <h5 {...attributes}>{children}</h5>;
      case 'header-six': return <h6 {...attributes}>{children}</h6>;
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
    console.log('key------>', event.key);
    const onSave = () => {
      const content = JSON.stringify(value.toJSON());
      localStorage.setItem(SAVE_KEY, content);
      console.log('文本已经保存...');
    }
    return tools.onKeyDown(event, change, onSave)
  };
  tokenToContent = (token) => {
    if (typeof token == 'string') {
      return token
    } else if (typeof token.content == 'string') {
      return token.content
    } else {
      return token.content.map(this.tokenToContent).join('')
    }
  }
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
          decorateNode={this.decorateNode}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  };

  decorateNode = (node) => {
    if (node.type != 'code-block') return
    const language = node.data.get('language') || 'js';
    const texts = node.getTexts().toArray()
    const string = texts.map(t => t.text).join('\n')
    const grammar = Prism.languages[language]
    const tokens = Prism.tokenize(string, grammar, language)
    const decorations = []
    let startText = texts.shift()
    let endText = startText
    let startOffset = 0
    let endOffset = 0
    let start = 0

    for (const token of tokens) {
      startText = endText
      startOffset = endOffset

      const content = this.tokenToContent(token)
      const newlines = content.split('\n').length - 1
      const length = content.length - newlines
      const end = start + length

      let available = startText.text.length - startOffset
      let remaining = length

      endOffset = startOffset + remaining

      while (available < remaining && texts.length > 0) {
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
      start = end;
    }

    return decorations;
  }
};
export default MabyEditor;
