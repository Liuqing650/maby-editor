import React from 'react';
import isHotkey from 'is-hotkey';
import Blockquote from './Blockquote';
import Paragraph from './Paragraph';
import Image from './Image';
import { Header1, Header2, Header3, Header4, Header5, Header6 } from './Header';
import opts from '../options';

const { BLOCKS } = opts;

export default (options, hotkey) => {
  return {
    renderNode(props) {
      switch (props.node.type) {
        case BLOCKS.BLOCKQUOTE:
          return <Blockquote {...props} />;
        case BLOCKS.IMAGE:
          return <Image {...props} />;
        case BLOCKS.HEADING_1:
          return <Header1 {...props} />;
        case BLOCKS.HEADING_2:
          return <Header2 {...props} />;
        case BLOCKS.HEADING_3:
          return <Header3 {...props} />;
        case BLOCKS.HEADING_4:
          return <Header4 {...props} />;
        case BLOCKS.HEADING_5:
          return <Header5 {...props} />;
        case BLOCKS.HEADING_6:
          return <Header6 {...props} />;
        default:
          return <Paragraph {...props} />;
      }
    },
    onKeyDown(event, change) {
      if (hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        const isThisType = change.value.blocks.some(block => block.type === options.type);
        change.call(change => change.setBlocks(!isThisType ? options.type : BLOCKS.PARAGRAPH));
      }
    }
  };
};
