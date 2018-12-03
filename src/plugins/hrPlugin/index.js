import isHotkey from 'is-hotkey';
import renderBlock from '../../components/renderBlock';
import opts from '../../options';
import core from './core';

const { BLOCKS } = opts;
export default (opt) => {
  const options = Object.assign({
    type: BLOCKS.HR
  }, opt);
  const corePlugin = core(options);
  return {
    ...corePlugin,
    ...renderBlock(options),
    onKeyDown: (event, change) => {
      const { value } = change;
      const { texts } = value;
      const currentTextNode = texts.get(0);
      const hotkey = 'mod+y';
      if (hotkey && isHotkey(hotkey, event)) {
        event.preventDefault();
        change.removeNodeByKey(currentTextNode.key).insertBlock({
          type: options.type,
          isVoid: true
        }).collapseToStartOfNextBlock();
      }
    },
  };
};
