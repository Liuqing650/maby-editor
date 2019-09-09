import { Plugin } from 'slate-react';
import renderBlock from '../../components/renderBlock';
import typesConfig from '../../config';

const { BLOCK } = typesConfig;

export default (opt?: any): Plugin => {
  const options = Object.assign({
    type: BLOCK.PARAGRAPH
  }, opt);
  return renderBlock(options);
};
