import { BLOCKS, MARKS } from '../../options/types';
import image from './imageRules';
import blockRules from './blockRules';
import voidBlock from './voidBlockRules';
import codeRules from './codeBlockRules';
import markRules from './markRules';

const CODE_OPTIONS = {
  codeType: BLOCKS.CODE_BLOCK,
  codeLineType: BLOCKS.CODE_LINE,
};
export const DEFAULT_RULES = [
  image(BLOCKS.IMAGE),
  codeRules(CODE_OPTIONS),
  blockRules('p', BLOCKS.PARAGRAPH),
  blockRules('div', BLOCKS.BLOCKDEFAULT),
  blockRules('blockquote', BLOCKS.BLOCKQUOTE),
  blockRules('h1', BLOCKS.HEADING_1),
  blockRules('h2', BLOCKS.HEADING_2),
  blockRules('h3', BLOCKS.HEADING_3),
  blockRules('h4', BLOCKS.HEADING_4),
  blockRules('h5', BLOCKS.HEADING_5),
  blockRules('h6', BLOCKS.HEADING_6),
  voidBlock('hr', BLOCKS.HR),
  markRules('a', MARKS.LINK),
  markRules('i', MARKS.ITALIC),
  markRules('s', MARKS.STRIKETHROUGH),
  markRules('del', MARKS.STRIKETHROUGH),
  markRules('u', MARKS.UNDERLINE),
  markRules('code', MARKS.CODE),
  markRules('strong', MARKS.BOLD),
  markRules('span', MARKS.SPAN),
];
