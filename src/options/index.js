import BLOCKS from "./blocks";
import INLINES from "./inlines";
import MARKS from "./marks";
import TABLEALIGN from "./table-align";

// code 选项
const CODE_BLOCK_OPTIONS = {
  lineType: 'code-line',
  containerType: 'code-block',
  exitBlockType: 'paragraph'
}
// list 选项
const LIST_OPTIONS = {
  types: ['ul_list', 'ol_list'],
  typeItem: 'list_item',
  typeDefault: 'paragraph'
}
// code 高亮语言配置
const LANGUAGE_OPTIONS = {
  css: 'CSS',
  js: 'JavaScript',
  html: 'HTML',
};
export {
  CODE_BLOCK_OPTIONS,
  LIST_OPTIONS,
  LANGUAGE_OPTIONS,
  BLOCKS,
  INLINES,
  MARKS,
  TABLEALIGN
};
