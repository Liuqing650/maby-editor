import { BLOCKS, MARKS } from '../../options/types';
import image from './imageRules';
import blockRules from './blockRules';
import markRules from './markRules';

export const DEFAULT_RULES = [
  image(BLOCKS.IMAGE),
  blockRules('blockquote', BLOCKS.BLOCKQUOTE),
  blockRules('h1', BLOCKS.HEADING_1),
  blockRules('h2', BLOCKS.HEADING_2),
  blockRules('h3', BLOCKS.HEADING_3),
  blockRules('h4', BLOCKS.HEADING_4),
  blockRules('h5', BLOCKS.HEADING_5),
  blockRules('h6', BLOCKS.HEADING_6),
  markRules('strong', MARKS.BOLD),
  markRules('span', MARKS.FONTBGCOLOR),
  markRules('span', MARKS.FONTCOLOR),
  markRules('span', MARKS.FONTSIZE),
  markRules('span', MARKS.LETTERSPACING),
];
