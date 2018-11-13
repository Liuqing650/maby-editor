import image from './imageRules';
import { BLOCKS } from '../../options/types';

export const DEFAULT_RULES = [
  image(BLOCKS.IMAGE),
];
