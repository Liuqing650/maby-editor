import { Plugins } from 'slate-react';
import {
  BoldPlugin,
  ParagraphPlugin,
  PasteHtmlPlugin,
} from './index';

// import typesConfig from '../config';

const plugins: Plugins = [
  BoldPlugin(),
  PasteHtmlPlugin(),
  ParagraphPlugin(),
];
export default plugins;
