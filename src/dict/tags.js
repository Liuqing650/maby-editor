const HEADER_ICON_DICT = {
  'h1': 'icon-numeric1box',
  'h2': 'icon-numeric2box',
  'h3': 'icon-numeric3box',
  'h4': 'icon-numeric4box',
  'h5': 'icon-numeric5box',
  'h6': 'icon-numeric6box',
};
const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'blockquote',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six',
  '*': 'list-item',
  '-': 'bulleted-list',
  '+': 'numbered-list',
  '>': 'blockquote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six'
};
const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underlined',
  s: 'strikethrough',
  code: 'code'
};
// markdown
const MARKDOWN_TAGS = {
  '*': 'list-item',
  '-': 'bulleted-list',
  '+': 'numbered-list',
  '>': 'blockquote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six'
};

const TAGS = {
  BLOCK: BLOCK_TAGS,
  MARK: MARK_TAGS,
  MARKDOWN: MARKDOWN_TAGS,
  ICON_DICT: HEADER_ICON_DICT
};
export default TAGS;
