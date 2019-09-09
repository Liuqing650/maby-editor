import { BLOCK, MARK } from '../types';
import blockRules from './blockRules';
import markRules from './markRules';

export const DEFAULT_RULES = [
  blockRules('p', BLOCK.PARAGRAPH),
  blockRules('div', BLOCK.BLOCKDEFAULT),
  blockRules('blockquote', BLOCK.BLOCKQUOTE),
  blockRules('h1', BLOCK.HEADING_1),
  blockRules('h2', BLOCK.HEADING_2),
  blockRules('h3', BLOCK.HEADING_3),
  blockRules('h4', BLOCK.HEADING_4),
  blockRules('h5', BLOCK.HEADING_5),
  blockRules('h6', BLOCK.HEADING_6),
  markRules('a', MARK.LINK),
  markRules('i', MARK.ITALIC),
  markRules('s', MARK.STRIKETHROUGH),
  markRules('del', MARK.STRIKETHROUGH),
  markRules('u', MARK.UNDERLINE),
  markRules('code', MARK.CODE),
  markRules('strong', MARK.BOLD),
  markRules('span', MARK.SPAN),
];
