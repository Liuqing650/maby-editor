import React from 'react';
import isHotkey from 'is-hotkey';
import Blockquote from './Blockquote';
import Paragraph from './Paragraph';
// import DefaultBlock from './DefaultBlock';
import Image from './Image';
import CodeBlock from './CodeBlock';
import CodeLine from './CodeLine';
import UlBlock from './UlBlock';
import OlBlock from './OlBlock';
import LiBlock from './LiBlock';
import TodoUlList from './TodoUlList';
import TodoLiList from './TodoLiList';
import Link from './Link';
import Hr from './Hr';
import { Header1, Header2, Header3, Header4, Header5, Header6 } from './Header';
import opts from '../options';

const { BLOCKS } = opts;

const codeBlockNode = (options, props) => {
  const { data } = props.node;
  if (data.get && typeof data.get === 'function') {
    const style = data.get('style');
    props.attributes = { ...props.attributes, style };
  }
  return <CodeBlock {...props} options={options} />;
};
const codeLineNode = (props) => {
  return <CodeLine {...props} />;
};
export {
  codeBlockNode,
  codeLineNode
};

export default (options, hotkey) => {
  return {
    renderNode(props) {
      const { data } = props.node;
      if (data.get && typeof data.get === 'function') {
        const style = data.get('style');
        props.attributes = { ...props.attributes, style};
      }
      switch (props.node.type) {
        case BLOCKS.BLOCKQUOTE:
          return <Blockquote {...props} />;
        case BLOCKS.IMAGE:
          return <Image {...props} />;
        case BLOCKS.HR:
          return <Hr {...props} />;
        case BLOCKS.OL_LIST:
          return <OlBlock {...props} />;
        case BLOCKS.UL_LIST:
          return <UlBlock {...props} />;
        case BLOCKS.LIST_UL_ITEM:
        case BLOCKS.LIST_OL_ITEM:
          return <LiBlock {...props} />;
        case BLOCKS.LINK:
          return <Link {...props} options={options} />;
        case BLOCKS.TODO_UL_LIST:
          return <TodoUlList {...props} />;
        case BLOCKS.TODO_LI_ITEM:
          return <TodoLiList {...props} />;
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
        case BLOCKS.PARAGRAPH:
          return <Paragraph {...props} />;
        default:
          // return <DefaultBlock {...props} />;
          break;
      }
    },
    onKeyDown(event, change) {
      if (hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        const isThisType = change.value.blocks.some(block => block.type === options.type);
        change.call(change => change.setBlocks(!isThisType ? options.type : BLOCKS.PARAGRAPH));
        return change;
      }
    }
  };
};
