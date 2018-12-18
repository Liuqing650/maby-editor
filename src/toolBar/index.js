import React from 'react';
import Header from './icons/header';
import BlockIcon from './icons/blockIcon';
import MarkIcon from './icons/markIcon';
import HrIcon from './icons/hrIcon';
import CodeBlockIcon from './icons/codeBlockIcon';
import TaskListIcon from './icons/taskListIcon';
import ListIcon from './icons/listIcon';
import options from '../options';

const {
  BLOCKS,
  MARKS,
  INLINE,
} = options;
class ToolBar extends React.Component {
  renderIcon = (options) => {
    if (!options || options.length === 0) {
      return null;
    }
    const { value, onChange, onListClick } = this.props;
    const output = [];
    options.map((item, index) => {
      const type = item.type;
      const iconProps = {
        value,
        key: index,
        change: value.change(),
        plugin: item.plugin || null,
        onChange,
        item
      };
      switch (type) {
        case BLOCKS.HEADING:
          output.push(<Header {...iconProps} />);
          break;
        case BLOCKS.BLOCKQUOTE:
          output.push(<BlockIcon {...iconProps} />);
          break;
        case BLOCKS.HR:
          output.push(<HrIcon {...iconProps} />);
          break;
        case BLOCKS.CODE_BLOCK:
          output.push(<CodeBlockIcon {...iconProps} />);
          break;
        case INLINE.TODO_LI_ITEM:
          iconProps.onListClick = onListClick;
          output.push(<TaskListIcon {...iconProps} />);
          break;
        case INLINE.LIST_UL_ITEM:
        case INLINE.LIST_OL_ITEM:
          iconProps.onListClick = onListClick;
          output.push(<ListIcon {...iconProps} />);
          break;
        case MARKS.BOLD:
        case MARKS.ITALIC:
        case MARKS.CODE:
        case MARKS.UNDERLINE:
        case MARKS.STRIKETHROUGH:
          output.push(<MarkIcon {...iconProps} />);
          break;
        default:
          break;
      }
    });
    return output;
  };
  render() {
    const { plugin } = this.props;
    const headerOpt = [
      { type: BLOCKS.PARAGRAPH, value: BLOCKS.PARAGRAPH, title: '正文', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_1, value: BLOCKS.HEADING_1, title: 'H1', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_2, value: BLOCKS.HEADING_2, title: 'H2', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_3, value: BLOCKS.HEADING_3, title: 'H3', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_4, value: BLOCKS.HEADING_4, title: 'H4', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_5, value: BLOCKS.HEADING_5, title: 'H5', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_6, value: BLOCKS.HEADING_6, title: 'H6', unlock: BLOCKS.PARAGRAPH },
    ];
    const options = [
      { type: MARKS.BOLD, icon: 'BoldIcon', title: 'Bold' },
      { type: MARKS.ITALIC, icon: 'ItalicIcon', title: 'Italic' },
      { type: MARKS.UNDERLINE, icon: 'UnderlineIcon', title: 'Underline' },
      { type: BLOCKS.BLOCKQUOTE, icon: 'QuotesrightIcon', title: 'Blockquote', unlock: BLOCKS.PARAGRAPH },
      { type: MARKS.CODE, icon: 'SectionIcon', title: 'Code' },
      { type: BLOCKS.HEADING, options: headerOpt, title: '正文与标题', defaultSelected: '正文' },
      { type: BLOCKS.HR, icon: 'HrIcon', title: 'HorizontalRule', unlock: BLOCKS.PARAGRAPH },
      { type: MARKS.STRIKETHROUGH, icon: 'StrikethroughIcon', title: 'Strike' },
      { type: INLINE.TODO_LI_ITEM, icon: 'CheckboxIcon', title: 'Checkbox', plugin: plugin.taskListPlugin },
      { type: INLINE.LIST_UL_ITEM, icon: 'ListRectIcon', title: 'ListRectIcon', plugin: plugin.ulListPlugin, },
      { type: INLINE.LIST_OL_ITEM, icon: 'ListNumberIcon', title: 'ListRectIcon', plugin: plugin.olListPlugin, listType: BLOCKS.OL_LIST },
      // { type: 'AlignLeft', icon: 'AlignLeft', title: 'Align Left' },
      // { type: 'AlignCenter', icon: 'AlignCenter', title: 'Align Center' },
      // { type: 'AlignRight', icon: 'AlignRight', title: 'Align Right' },
      // { type: 'Indent', icon: 'Indent', title: 'Indent' },
      // { type: 'Outdent', icon: 'Outdent', title: 'Outdent' },
      // { type: 'Link', icon: 'Link', title: 'Link' },
      // { type: 'Image', icon: 'Image', title: 'Image' },
      // { type: 'Video', icon: 'Video', title: 'Video' },
      { type: BLOCKS.CODE_BLOCK, icon: 'CodeIcon', title: 'Code Bloack', plugin: plugin.editCodePlugin }
    ];
    return (
      <div className="toolBar">
        {this.renderIcon(options)}
      </div>
    );
  }
}
export default ToolBar;
