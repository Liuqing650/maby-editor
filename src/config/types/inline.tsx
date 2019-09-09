
// code 选项
const CODE_BLOCK_OPTIONS = {
  lineType: 'code-line',
  containerType: 'code-block',
  exitBlockType: 'paragraph'
};
// list UL选项
const LIST_UL_OPTIONS = {
  types: ['ul_list'],
  typeItem: 'list_ul_item',
  typeDefault: 'paragraph'
};
// list 选项
const LIST_OL_OPTIONS = {
  types: ['ol_list'],
  typeItem: 'list_ol_item',
  typeDefault: 'paragraph'
};
// 任务 选项
const TODO_LIST = {
  types: ['todo_ul_list'],
  typeItem: 'todo_li_item',
  typeDefault: 'paragraph'
};

export default {
  // Classic line
  CODE_LINE: 'code-line',
  // Lists
  OL_LIST: 'ol_list',
  UL_LIST: 'ul_list',
  LIST_UL_ITEM: 'list_ul_item',
  LIST_OL_ITEM: 'list_ol_item',
  TODO_UL_LIST: 'todo_ul_list',
  TODO_LI_ITEM: 'todo_li_item',
  // inline
  LINK: 'link',
  // Special
  IMAGE: 'image',
  VIDEO: 'video',

  // 组合类型
  CODE_BLOCK_OPTIONS,
  LIST_UL_OPTIONS,
  LIST_OL_OPTIONS,
  TODO_LIST,
};
