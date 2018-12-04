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
  const hotkey = 'mod+y';
  /**
   * 插入hr
   * @param {event} event 默认事件
   * @param {Change} change Slate
   */
  const onInsertHr = (event, change) => {
    const { value } = change;
    const focusBlock = value.focusBlock;
    event.preventDefault();
    change.insertBlock({
      type: options.type,
      isVoid: true
    });
    change.collapseToStartOfNextBlock().focus();
    if (focusBlock.isEmpty) {
      change.removeNodeByKey(focusBlock.key);
    }
    return change;
  };
  /**
   * 删除hr
   * @param {event} event 默认事件
   * @param {Change} change Slate
   */
  const onBackspace = (event, change) => {
    const { value } = change;
    const { previousBlock } = value;
    event.preventDefault();
    if (previousBlock.type === options.type) {
      change.removeNodeByKey(previousBlock.key);
    }
    return change;
  };
  return {
    ...corePlugin,
    ...renderBlock(options),
    onKeyDown: (event, change) => {
      if (hotkey && isHotkey(hotkey, event)) {
        onInsertHr(event, change);
      }
      if (event.key === 'Backspace') {
        onBackspace(event, change);
      }
    },
  };
};
