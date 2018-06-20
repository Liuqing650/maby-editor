/**
 * Map of all block types. Blocks can contain inlines or blocks.
 * @type {Map}
 */

module.exports = {
  DOCUMENT: "document",
  TEXT: "unstyled",
  // Classic blocks
  CODE_BLOCK: "code-block",
  CODE_LINE: "code-line",
  BLOCKQUOTE: "blockquote",
  PARAGRAPH: "paragraph",
  FOOTNOTE: "footnote",
  HTML: "html_block",
  HR: "hr",
  // Headings
  HEADING_1: "header-one",
  HEADING_2: "header-two",
  HEADING_3: "header-three",
  HEADING_4: "header-four",
  HEADING_5: "header-five",
  HEADING_6: "header-six",
  // Table
  TABLE: "table",
  TABLE_ROW: "table_row",
  TABLE_CELL: "table_cell",
  // Lists
  OL_LIST: "ol_list",
  UL_LIST: "ul_list",
  LIST_ITEM: "list_item",

  // Default block
  DEFAULT: "paragraph",

  // Special
  IMAGE: "image",
  VIDEO: "video"
};
