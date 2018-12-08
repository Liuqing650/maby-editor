import isHotkey from 'is-hotkey';
import renderBlock from '../../components/renderBlock';
import opts from '../../options';
import core from './core';

const { BLOCKS } = opts;

/**
 * 插入hr
 * @param {event} event 默认事件
 * @param {Change} change Slate
 */
const onInsertHr = (event, change, options) => {
  const { value } = change;
  const focusBlock = value.focusBlock;
  const type = options ? options.type : BLOCKS.HR;
  event.preventDefault();
  change.insertBlock({
    type,
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
const unWrapHr = (event, change, options) => {
  const { value } = change;
  const { previousBlock } = value;
  const type = options ? options.type : BLOCKS.HR;
  event.preventDefault();
  if (previousBlock && previousBlock.type === type) {
    change.removeNodeByKey(previousBlock.key);
  }
  return change;
};

export {
  onInsertHr,
  unWrapHr,
};

export default (opt) => {
  const options = Object.assign({
    type: BLOCKS.HR
  }, opt);
  const corePlugin = core(options);
  const hotkey = 'mod+y';
  return {
    ...corePlugin,
    ...renderBlock(options),
    onKeyDown: (event, change) => {
      if (hotkey && isHotkey(hotkey, event)) {
        onInsertHr(event, change, options);
      }
      if (event.key === 'Backspace') {
        unWrapHr(event, change, options);
      }
    },
  };
};
