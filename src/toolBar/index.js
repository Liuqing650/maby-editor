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
        plugin: item.plugin,
        onChange,
        item
      };
      switch (type) {
        case BLOCKS.HEADING_1:
        case BLOCKS.HEADING_2:
        case BLOCKS.HEADING_3:
        case BLOCKS.HEADING_4:
        case BLOCKS.HEADING_5:
        case BLOCKS.HEADING_6:
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
    const options = [
      { type: BLOCKS.HEADING_1, icon: 'Header1', title: 'Header One', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_2, icon: 'Header2', title: 'Header Two', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_3, icon: 'Header3', title: 'Header Three', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_4, icon: 'Header4', title: 'Header Four', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_5, icon: 'Header5', title: 'Header Five', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HEADING_6, icon: 'Header6', title: 'Header Six', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.BLOCKQUOTE, icon: 'Blockquote', title: 'Blockquote', unlock: BLOCKS.PARAGRAPH },
      { type: BLOCKS.HR, icon: 'HorizontalRule', title: 'HorizontalRule', unlock: BLOCKS.PARAGRAPH },
      { type: MARKS.BOLD, icon: 'Bold', title: 'Bold' },
      { type: MARKS.ITALIC, icon: 'Italic', title: 'Italic' },
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
