
// code 选项
const CODE_BLOCK_OPTIONS = {
  lineType: 'code-line',
  containerType: 'code-block',
  exitBlockType: 'paragraph'
};
// list 选项
const LIST_OPTIONS = {
  types: ['ul_list', 'ol_list'],
  typeItem: 'list_item',
  typeDefault: 'paragraph'
};
// 任务 选项
const TODO_LIST = {
  types: ['todo_ul_list'],
  typeItem: 'todo_li_item',
  typeDefault: 'paragraph'
};

export default {
  // Classic blocks
  CODE_BLOCK: 'code-block',
  CODE_LINE: 'code-line',
  // Lists
  OL_LIST: 'ol_list',
  UL_LIST: 'ul_list',
  LIST_ITEM: 'list_item',
  TODO_UL_LIST: 'todo_ul_list',
  TODO_LI_ITEM: 'todo_li_item',
  // inline
  LINK: 'link',
  // Special
  IMAGE: 'image',
  VIDEO: 'video',

  // 组合类型
  CODE_BLOCK_OPTIONS,
  LIST_OPTIONS,
  TODO_LIST,
};
