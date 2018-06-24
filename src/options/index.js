import BLOCKS from "./blocks";
import INLINES from "./inlines";
import MARKS from "./marks";
import TABLEALIGN from "./table-align";

// code 选项
const CODE_BLOCK_OPTIONS = {
  lineType: BLOCKS.CODE_LINE,
  containerType: BLOCKS.CODE_BLOCK,
  exitBlockType: BLOCKS.DEFAULT
}
// list 选项
const LIST_OPTIONS = {
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM,
  typeDefault: BLOCKS.DEFAULT
}
// code 高亮语言配置
const LANGUAGE_OPTIONS = {
  css: 'CSS',
  js: 'JavaScript',
  html: 'HTML',
};
// 辅助配置项
const HELP = {
  LOCAL_SAVE: 'save',
};
export {
  CODE_BLOCK_OPTIONS,
  LIST_OPTIONS,
  HELP,
  LANGUAGE_OPTIONS,
  BLOCKS,
  INLINES,
  MARKS,
  TABLEALIGN
};
