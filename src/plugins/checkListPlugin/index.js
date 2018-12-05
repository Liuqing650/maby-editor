import isHotkey from 'is-hotkey';
import renderBlock from '../../components/renderBlock';
import opts from '../../options';

const { BLOCKS } = opts;

export default (opt) => {
  const options = Object.assign({
    type: BLOCKS.LIST_ITEM
  }, opt);
  const hotkey = 'mod+h';
  /**
   * 插入CheckList
   * @param {event} event 默认事件
   * @param {Change} change Slate
   */
  const onInsert = (event, change) => {
    const { value } = change;
    const focusBlock = value.focusBlock;
    event.preventDefault();
    change.insertBlock({
      type: options.type
    });
    change.collapseToStartOfNextBlock().focus();
    if (focusBlock.isEmpty) {
      change.removeNodeByKey(focusBlock.key);
    }
    return change;
  };
  /**
   * 插入hr
   * @param {event} event 默认事件
   * @param {Change} change Slate
   */
  const onEnter = (event, change) => {
    const { value } = change;
    if (value.startBlock.type === options.type) {
      change.splitBlock().setBlocks({ data: { checked: false } });
      return true;
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
    if (
      value.isCollapsed &&
      value.startBlock.type === options.type &&
      value.selection.startOffset === 0
    ) {
      change.setBlocks(BLOCKS.PARAGRAPH);
      return true;
    }
  };
  return {
    ...renderBlock(options),
    onKeyDown: (event, change) => {
      if (hotkey && isHotkey(hotkey, event)) {
        onInsert(event, change);
      }
      if (event.key === 'Backspace') {
        onBackspace(event, change);
      }
      if (event.key === 'Enter') {
        onEnter(event, change);
      }
    },
  };
};
