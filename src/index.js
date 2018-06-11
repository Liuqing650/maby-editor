import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Prism from 'prismjs';
import PluginEditList from 'slate-edit-list';
import PluginEditTable from 'slate-edit-table';
import DICT from './static';
import { CommonUtil, CodeUtil, ListUtil } from './utils';
import { CODE_BLOCK_OPTIONS } from './options';
import * as initState from './initValue/initState';
// import * as tools from './decorators/tools';
import { onKeyDown, onPaste, MarkHotkey, onToolBtn } from './handlers';
import schemaFn from './schemas';
import alignPlugin from './plugins/aligns';
import { 
  CodeBlock, CodeBlockLine, ListItem, Bold, CodeInline, EmInline, DelInline, Underline,
  Table, TableRow, TableCell, Paragraph,
} from './components';
import './styles/index.css';

const DEFAULT_NODE = DICT.DEFAULT_NODE;
const SAVE_KEY = DICT.SAVE_KEY;

// 获取本地缓存数据
const existingValue = localStorage.getItem(SAVE_KEY) ? JSON.parse(localStorage.getItem(SAVE_KEY)) : null;
// 构建初始状态…
const initialState = existingValue ? Value.fromJSON(existingValue) : initState.valueModel('A line of text in a paragraph.');

const schema = schemaFn(CODE_BLOCK_OPTIONS);
const editListPlugin = PluginEditList();
const tablePlugin = PluginEditTable({
  typeTable: 'table',
  typeRow: 'table_row',
  typeCell: 'table_cell',
  typeContent: 'paragraph'
})
// 插件
const plugins = [
  editListPlugin,
  tablePlugin,
  alignPlugin,
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '7', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'd', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
];
class MabyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: initialState
    };
    this.editorREF;
    this.submitChange;
  }
  componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      this.setEditorComponent(editor);
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }
  // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
  onChange = ({ value }) => {
    this.setState({ value })
  }
  
  onSave = () => {
    const { value } = this.state
    const content = JSON.stringify(value.toJSON());
    localStorage.setItem(SAVE_KEY, content);
    console.log('文本已经保存...');
  }
  call(change) {
    this.setState({
      value: this.state.value.change().call(change).value
    });
  }
  //  表格使用
  setEditorComponent = (ref) => {
    this.editorREF = ref;
    this.submitChange = ref.change;
  };
  renderNode = (props) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'code-block': return <CodeBlock {...props} />;
      case 'code-line': return <CodeBlockLine {...props} />;
      case 'header-one': return <h1 {...attributes}>{children}</h1>;
      case 'header-two': return <h2 {...attributes}>{children}</h2>;
      case 'header-three': return <h3 {...attributes}>{children}</h3>;
      case 'header-four': return <h4 {...attributes}>{children}</h4>;
      case 'header-five': return <h5 {...attributes}>{children}</h5>;
      case 'header-six': return <h6 {...attributes}>{children}</h6>;
      case 'ul_list': return <ul {...attributes}>{children}</ul>;
      case 'ol_list': return <ol {...attributes}>{children}</ol>;
      case 'list_item': return <ListItem plugin={editListPlugin} {...props} />;
      case 'table': return <Table {...props} />;
      case 'table_row': return <TableRow {...props} />;
      case 'table_cell': return <TableCell {...props} />;
      case 'paragraph': return <Paragraph {...props} />;
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
      default:
        if (mark.type) { // 高亮代码
          return (
            <span {...props.attributes} className={`token ${mark.type}`}>
              {children}
            </span>
          );
        }
        break;
    }
  }
  onClickRedo = event => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().redo()
    this.onChange(change)
  }
  onClickUndo = event => {
    event.preventDefault()
    const { value } = this.state;
    const change = value.change().undo()
    this.onChange(change)
  }
  handleKeyDown = (event, change) => {
    const { value } = this.state;
    const {
      wrapInList,
      unwrapList,
      increaseItemDepth,
      decreaseItemDepth
    } = editListPlugin.changes;
    const inList = editListPlugin.utils.isSelectionInList(value);
    // 取消撤回
    // if (event.shiftKey) {
    //   switch (event.key) {
    //     case 'z':
    //       console.log(555);

    //       return this.onClickRedo(event);
    //     default:
    //       break;
    //   }
    // }
    
    if (event.ctrlKey) {
      // 撤回
      switch (event.key) {
        case 'z':
          return this.onClickUndo(event);
        case 'j':
          event.preventDefault();
          return this.call(inList ? unwrapList : wrapInList);
        default:
          break;
      }
    }
    return onKeyDown(event, change, this.onSave)
  };
  // 复制
  onPaste = (event, change) => {
    return onPaste(event, change);
  }
  // 高亮字体
  tokenToContent = (token) => {
    if (typeof token == 'string') {
      return token
    } else if (typeof token.content == 'string') {
      return token.content
    } else {
      return token.content.map(this.tokenToContent).join('')
    }
  }

  renderToolbar = () => {
    return (
      <div className="maby-editor-toolbar-menu maby-editor-menu">
        {this.renderMarkButton('bold', '加粗')}
        {this.renderMarkButton('italic', '倾斜')}
        {this.renderMarkButton('underlined', '下划线')}
        {this.renderMarkButton('code', '标签')}
        {this.renderBlockButton('header-one', '标题一')}
        {this.renderBlockButton('header-two', '标题二')}
        {this.renderBlockButton('header-three', '标题三')}
        {this.renderBlockButton('header-four', '标题四')}
        {this.renderBlockButton('header-five', '标题五')}
        {this.renderBlockButton('header-six', '标题六')}
        {this.renderBlockButton('code-block', '代码块')}
        {this.renderBlockButton('save', '本地保存')}
      </div>
    )
  }

  renderMarkButton = (type, name) => {
    const { value } = this.state;
    const change = value.change();
    const isActive = CommonUtil.hasMark(value, type);
    const onClick = event => onToolBtn(event, change, type, DICT.MARK, this.onChange);
    return (
      <span className="maby-editor-tool-btnGroup" onMouseDown={onClick} data-active={isActive}>
        <span className="maby-editor-tool-btn-title">{name}</span>
      </span>
    )
  }

  renderBlockButton = (type, name) => {
    const { value } = this.state;
    const change = value.change();
    const isActive = CommonUtil.hasBlock(value, type);
    const onClick = event => onToolBtn(event, change, type, DICT.BLOCK, type === 'save' ? this.onSave : this.onChange)
    return (
      <span className="maby-editor-tool-btnGroup" onMouseDown={onClick} data-active={isActive}>
        <span className="maby-editor-tool-btn-title">{name}</span>
      </span>
    )
  }
  render() {
    const { placeholder, className, autoFocus } = this.props;
    return (
      <div className={className}>
        {this.renderToolbar()}
        <Editor
          plugins={plugins}
          placeholder={placeholder || ''}
          value={this.state.value}
          onChange={this.onChange}
          schema={schema}
          onKeyDown={this.handleKeyDown}
          onPaste={this.onPaste}
          autoFocus
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          decorateNode={this.decorateNode}
          shouldNodeComponentUpdate={props => props.node.type === 'list_item'}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  };

  decorateNode = (node) => {
    if (node.type != 'code-block') return;
    const language = node.data.get('language') || 'js';
    const texts = node.getTexts().toArray();
    const string = texts.map(t => t.text).join('\n');
    const grammar = Prism.languages[language];
    const tokens = Prism.tokenize(string, grammar, language);
    const decorations = [];
    let startText = texts.shift();
    let endText = startText;
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;
    for (const token of tokens) {
      startText = endText;
      startOffset = endOffset;

      const content = this.tokenToContent(token);
      const newlines = content.split('\n').length - 1;
      const length = content.length - newlines;
      const end = start + length;

      let available = startText.text.length - startOffset;
      let remaining = length;

      endOffset = startOffset + remaining;

      while (available < remaining && texts.length > 0) {
        endText = texts.shift();
        remaining = length - available;
        available = endText.text.length;
        endOffset = remaining;
      }

      if (typeof token != 'string') {
        const range = {
          anchorKey: startText.key,
          anchorOffset: startOffset,
          focusKey: endText.key,
          focusOffset: endOffset,
          marks: [{ type: token.type }],
        }
        decorations.push(range);
      }
      start = end;
    }
    return decorations;
  }
};
export default MabyEditor;
