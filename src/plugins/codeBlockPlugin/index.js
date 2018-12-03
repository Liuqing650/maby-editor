// import isHotkey from 'is-hotkey';
import { codeBlockNode, codeLineNode } from '../../components/renderBlock';
import opts from '../../options';

const { BLOCKS } = opts;
export default (opt) => {
  const options = Object.assign({
    codeType: BLOCKS.CODE_BLOCK,
    codeLineType: BLOCKS.CODE_LINE,
    getSyntax: node => node.data.get('syntax')
  }, opt);

  return {
    renderNode: props => {
      if (props.node.type === options.codeType) {
        return codeBlockNode(options, props);
      } else if (props.node.type === options.codeLineType) {
        return codeLineNode(props);
      }
    },
    // onKeyDown(event, change) {
    //   if (hotkey && isHotkey(hotkey, event)) {
    //     event.preventDefault();
    //     const isThisType = change.value.blocks.some(block => block.type === options.type);
    //     change.call(change => change.setBlocks(!isThisType ? options.codeType : BLOCKS.PARAGRAPH));
    //   }
    // }
  };
};
