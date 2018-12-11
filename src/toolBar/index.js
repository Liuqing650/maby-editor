import React from 'react';
import Header from './icons/header';
import BlockIcon from './icons/blockIcon';
import MarkIcon from './icons/markIcon';
import HrIcon from './icons/hrIcon';
import CodeBlockIcon from './icons/codeBlockIcon';
import options from '../options';

const {
  BLOCKS,
  MARKS,
  // INLINE,
} = options;
class ToolBar extends React.Component {
  renderIcon = (options) => {
    if (!options || options.length === 0) {
      return null;
    }
    const { value, onChange } = this.props;
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
      { type: BLOCKS.HEADING_1, value: BLOCKS.HEADING_1, title: '一号标题', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_2, value: BLOCKS.HEADING_2, title: '二号标题', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_3, value: BLOCKS.HEADING_3, title: '三号标题', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_4, value: BLOCKS.HEADING_4, title: '四号标题', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_5, value: BLOCKS.HEADING_5, title: '五号标题', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_6, value: BLOCKS.HEADING_6, title: '六号标题', unlock: BLOCKS.PARAGRAPH },
    ];
    const options = [
      { type: BLOCKS.HEADING, options: headerOpt, title: '正文与标题', defaultSelected: '正文' },
      { type: BLOCKS.BLOCKQUOTE, icon: 'Blockquote', title: 'Blockquote', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HR, icon: 'HorizontalRule', title: 'HorizontalRule', unlock: BLOCKS.PARAGRAPH },
      { type: MARKS.BOLD, icon: 'Bold', title: 'Bold' },
      { type: MARKS.ITALIC, icon: 'Italic', title: 'Italic' },
      { type: MARKS.UNDERLINE, icon: 'Underline', title: 'Underline' },
      { type: MARKS.CODE, icon: 'Code', title: 'Code' },
      { type: MARKS.STRIKETHROUGH, icon: 'Strike', title: 'Strike' },
      // { type: 'AlignLeft', icon: 'AlignLeft', title: 'Align Left' },
      // { type: 'AlignCenter', icon: 'AlignCenter', title: 'Align Center' },
      // { type: 'AlignRight', icon: 'AlignRight', title: 'Align Right' },
      // { type: 'Indent', icon: 'Indent', title: 'Indent' },
      // { type: 'Outdent', icon: 'Outdent', title: 'Outdent' },
      // { type: 'Link', icon: 'Link', title: 'Link' },
      // { type: 'Image', icon: 'Image', title: 'Image' },
      // { type: 'Video', icon: 'Video', title: 'Video' },
      { type: BLOCKS.CODE_BLOCK, icon: 'CodeBlock', title: 'Code Bloack', plugin: plugin.editCodePlugin }
    ];
    return (
      <div className="toolBar">
        {this.renderIcon(options)}
      </div>
    );
  }
}
export default ToolBar;
