import inline from './inline';

// 辅助配置项
const HELP = {
  LOCAL_SAVE: 'save',
};

// 表格样式
const TABLE_ALIGN = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};

export default {
  DOCUMENT: 'document',
  TEXT: 'unstyled',
  // Classic blocks
  CODE_BLOCK: 'code-block',
  CODE_LINE: 'code-line',
  BLOCKQUOTE: 'blockquote',
  PARAGRAPH: 'paragraph',
  BLOCKDEFAULT: 'default',
  FOOTNOTE: 'footnote',
  HR: 'hr',
  // Headings
  HEADING_1: 'header-one',
  HEADING_2: 'header-two',
  HEADING_3: 'header-three',
  HEADING_4: 'header-four',
  HEADING_5: 'header-five',
  HEADING_6: 'header-six',
  // Table
  TABLE: 'table',
  TABLE_ROW: 'table_row',
  TABLE_CELL: 'table_cell',

  // Default block
  DEFAULT: 'paragraph',

  TABLE_ALIGN,
  HELP,
  ...inline
};
