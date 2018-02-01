const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six'
};
const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underlined',
  s: 'strikethrough',
  code: 'code'
};
const TAGS = {
  BLOCK: BLOCK_TAGS,
  MARK: MARK_TAGS
};
export default TAGS;
