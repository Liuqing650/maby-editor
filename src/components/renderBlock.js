import React from 'react';
import isHotkey from 'is-hotkey';
import Blockquote from './Blockquote';
import Paragraph from './Paragraph';
import opts from '../options';

const { BLOCKS } = opts;

export default (options, hotkey) => {
  return {
    renderNode(props) {
      console.log('==type', props.node.type);
      switch (props.node.type) {
        case BLOCKS.BLOCKQUOTE:
          return <Blockquote {...props} />;
        default:
          return <Paragraph {...props} />;
      }
    },
    onKeyDown(event, change) {
      if (isHotkey(hotkey, event)) {
        const isThisType = change.value.blocks.some(block => block.type === options.type);
        console.log('isThisType----->', isThisType);
        change.call(change => change.setBlocks(!isThisType ? options.type : BLOCKS.PARAGRAPH));
      }
    }
  };
};
