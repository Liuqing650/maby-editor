import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Prism from 'prismjs';
// utils
import { CommonUtil, CodeUtil, ListUtil } from './utils';
// plugins
import PluginEditList from 'slate-edit-list';
import EditBlockquote from "slate-edit-blockquote";
import PluginEditTable from './plugins/slate-edit-table';
import alignPlugin from './plugins/aligns';
import DropOrPasteImages from './plugins/slate-drop-or-paste-images';
import PasteLinkify from './plugins/slate-paste-linkify';
import AutoReplace from './plugins/slate-auto-replace';
import mdPlugin from "./plugins/markdownPlugin";
// static
import DICT from './static';
import { CODE_BLOCK_OPTIONS, LIST_OPTIONS, HELP, MARKS, BLOCKS, INLINES } from './options';
// handler
import { onKeyDown, onPaste, MarkHotkey, onToolBtn } from './handlers';
import schemaFn from './schemas';
// components
import { 
  CodeBlock, CodeBlockLine, HrBlock, ListItem, Bold, CodeInline, EmInline, DelInline, Underline,
  Table, TableRow, TableCell, Paragraph, Image, LinkInline, BlockquoteBlock
} from './components';
// initSate
import * as initState from './initValue/initState';
// style
import './styles/index.css';

const DEFAULT_NODE = DICT.DEFAULT_NODE;
const SAVE_KEY = DICT.SAVE_KEY;

// 获取本地缓存数据
const existingValue = localStorage.getItem(SAVE_KEY) ? JSON.parse(localStorage.getItem(SAVE_KEY)) : null;
// 构建初始状态…
const initialState = existingValue ? Value.fromJSON(existingValue) : initState.valueModel('A line of text in a paragraph.');

const schema = schemaFn(CODE_BLOCK_OPTIONS);
const tablePlugin = PluginEditTable({
  typeTable: 'table',
  typeRow: 'table_row',
  typeCell: 'table_cell',
  typeContent: 'paragraph',
  exitBlockType: 'paragraph'
});
const MarkdownPlugin = mdPlugin;
const editListPlugin = PluginEditList();
const DropOrPasteImagesPlugins = DropOrPasteImages({
  insertImage: (transform, file) => {
    return transform.insertBlock({
      type: 'image',
      isVoid: true,
      data: { file },
    })
  }
});
const PasteLinkifyPlugins = PasteLinkify({
  type: 'link',
  hrefProperty: 'url',
  collapseTo: 'end'
});
const AutoReplacePlugins = [
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    transform: transform => transform.setBlocks('blockquote')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(-{3})$/,
    transform: transform => transform.setBlocks('hr')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^([1-9]\.)$/,
    transform: transform => transform.setBlocks('ol_list')
  }),
  AutoReplace({// 加粗
    trigger: 'space',
    extract: true,
    before: /(?:^|\s|\n|[^A-z0-9_*~`])(\*{2}|_{2})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])$/,
    transform: transform => transform.toggleMark('bold')
  }),
  AutoReplace({ // 标签
    trigger: 'space',
    extract: true,
    before: /(?:^|\s|\n|[^A-z0-9_*~`])(\`{1}|_{1})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])$/,
    transform: transform => transform.toggleMark('code')
  }),
  AutoReplace({ // 倾斜
    trigger: 'space',
    extract: true,
    before: /(?:^|\s|\n|[^A-z0-9_*~`])(\*{1})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])$/,
    transform: transform => transform.toggleMark('italic')
  }),
  AutoReplace({ // 删除线
    trigger: 'space',
    extract: true,
    before: /(?:^|\s|\n|[^A-z0-9_*~`])(\~{1})((?!\1).*?)(\1)($|\s|\n|[^A-z0-9_*~`])$/,
    transform: transform => transform.toggleMark('del')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(\`\`\`)$/,
    transform: transform => transform.setBlocks('code-block')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(\`\`\`\:)/,
    transform: (transform, event, matches) => {
      const language = CodeUtil.splitLanguage(matches);
      if (language) {
        return transform.setBlocks({
          type: 'code-block',
          data: { language },
        })
      }
      return transform.setBlocks({
        type: 'code-block'
      })
    }
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(-)$/,
    transform: transform => transform.setBlocks('ul_list')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(#{1,6})$/,
    transform: (transform, event, matches) => {
      const [ hashes ] = matches.before;
      const level = hashes.length;
      const headerDict = {
        '1': 'header-one',
        '2': 'header-two',
        '3': 'header-three',
        '4': 'header-four',
        '5': 'header-five',
        '6': 'header-six',
      };
      return transform.setBlocks({
        type: headerDict[level + '']
      })
    }
  }),
];

const options = {
  markdownOption: {
    blocks: BLOCKS,
    marks: MARKS,
    inlines: INLINES
  },
  blockquoteOption: {},
};
// 插件
const plugins = [
  MarkdownPlugin(options.markdownOption),
  EditBlockquote(options.blockquoteOption),
  tablePlugin,
  editListPlugin,
  alignPlugin,
  DropOrPasteImagesPlugins,
  PasteLinkifyPlugins,
  MarkHotkey({ key: 'b', type: MARKS.BOLD }),
  MarkHotkey({ key: '7', type: MARKS.CODE }),
  MarkHotkey({ key: 'i', type: MARKS.ITALIC }),
  MarkHotkey({ key: 'd', type: MARKS.STRIKETHROUGH }),
  MarkHotkey({ key: 'u', type: MARKS.UNDERLINE }),
]//.concat(AutoReplacePlugins);
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
    const { value } = this.state;
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
    const { value } = this.state;
    const { attributes, children, node } = props;
    const isInTable = tablePlugin.utils.isSelectionInTable(value);
    const position = tablePlugin.utils.getPosition(value);
    const tableProps = {
      ...props,
      tablePlugin,
      onSetAlign: this.onSetAlign,
      editorChange: this.editorTableChange,
      isInTable,
      position
    };
    
    switch (node.type) {
      case BLOCKS.CODE_BLOCK : return <CodeBlock {...props} />;
      case BLOCKS.CODE_LINE : return <CodeBlockLine {...props} />;
      case BLOCKS.HEADING_1 : return <h1 {...attributes}>{children}</h1>;
      case BLOCKS.HEADING_2 : return <h2 {...attributes}>{children}</h2>;
      case BLOCKS.HEADING_3 : return <h3 {...attributes}>{children}</h3>;
      case BLOCKS.HEADING_4 : return <h4 {...attributes}>{children}</h4>;
      case BLOCKS.HEADING_5 : return <h5 {...attributes}>{children}</h5>;
      case BLOCKS.HEADING_6 : return <h6 {...attributes}>{children}</h6>;
      case BLOCKS.UL_LIST : return <ul {...attributes}>{children}</ul>;
      case BLOCKS.OL_LIST : return <ol {...attributes}>{children}</ol>;
      case BLOCKS.LIST_ITEM : return <ListItem plugin={editListPlugin} {...props} />;
      case BLOCKS.TABLE : return <Table {...tableProps} />;
      case BLOCKS.TABLE_ROW : return <TableRow {...props} />;
      case BLOCKS.TABLE_CELL : return <TableCell {...props} />;
      case BLOCKS.HR : return <HrBlock {...props} />;
      case BLOCKS.PARAGRAPH : return <Paragraph {...props} />;
      case BLOCKS.IMAGE : return <Image {...props} />;
      case INLINES.LINK : return <LinkInline {...props} />;
      case BLOCKS.BLOCKQUOTE : return <BlockquoteBlock {...props} />;
    }
  }
  renderMark = (props) => {
    const { children, mark } = props;
    switch (mark.type) {
      case MARKS.BOLD: return <Bold {...props} />;
      case MARKS.CODE: return <CodeInline {...props} />;
      case MARKS.ITALIC: return <EmInline {...props} />;
      case MARKS.STRIKETHROUGH: return <DelInline {...props} />;
      case MARKS.UNDERLINE: return <Underline {...props} />;
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
  // 表格模式变更
  editorTableChange = (plugin) => {
    this.submitChange(plugin);
  };
  onSetAlign = (align) => {
    this.submitChange(change =>
        alignPlugin.changes.setColumnAlign(change, align)
    );
  };
  renderToolbar = () => {
    return (
      <div className="maby-editor-toolbar-menu maby-editor-menu">
        {this.renderMarkButton(MARKS.BOLD, '加粗')}
        {this.renderMarkButton(MARKS.ITALIC, '倾斜')}
        {this.renderMarkButton(MARKS.UNDERLINE, '下划线')}
        {this.renderMarkButton(MARKS.STRIKETHROUGH, '删除线')}
        {this.renderMarkButton(MARKS.CODE, '标签')}
        {this.renderBlockButton(BLOCKS.HR, '分割线')}
        {this.renderBlockButton(BLOCKS.HEADING_1, '标题一')}
        {this.renderBlockButton(BLOCKS.HEADING_2, '标题二')}
        {this.renderBlockButton(BLOCKS.HEADING_3, '标题三')}
        {this.renderBlockButton(BLOCKS.HEADING_4, '标题四')}
        {this.renderBlockButton(BLOCKS.HEADING_5, '标题五')}
        {this.renderBlockButton(BLOCKS.HEADING_6, '标题六')}
        {this.renderBlockButton(BLOCKS.BLOCKQUOTE, '引用')}
        {this.renderBlockButton(BLOCKS.CODE_BLOCK, '代码块')}
        {this.renderBlockButton(HELP.LOCAL_SAVE, '本地保存')}
        {this.renderBlockButton(BLOCKS.TABLE, '表格')}
      </div>
    )
  }

  renderMarkButton = (type, name) => {
    const { value } = this.state;
    const change = value.change();
    const isActive = CommonUtil.hasMark(value, type);
    const onMouseDown = event => onToolBtn(event, change, type, DICT.MARK, this.onChange);
    return (
      <span className="maby-editor-tool-btnGroup" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="maby-editor-tool-btn-title">{name}</span>
      </span>
    )
  }

  renderBlockButton = (type, name) => {
    const { value } = this.state;
    const change = value.change();
    let isActive = CommonUtil.hasBlock(value, type);
    
    const onMouseDown = event => {
      switch (type) {
        case 'table':
          event.preventDefault();
          const isInTable = tablePlugin.utils.isSelectionInTable(value);
          if (!isInTable) {
            this.submitChange(tablePlugin.changes.insertTable);
          } else {
            this.submitChange(tablePlugin.changes.removeTable);
          }
          break;
        default:
          onToolBtn(event, change, type, DICT.BLOCK, type === 'save' ? this.onSave : this.onChange);
          break;
      }
    }
    switch (type) {
      case 'table':
        isActive = tablePlugin.utils.isSelectionInTable(value);
        break;
      default:
        break;
    }
    return (
      <span className="maby-editor-tool-btnGroup" onMouseDown={onMouseDown} data-active={isActive}>
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
