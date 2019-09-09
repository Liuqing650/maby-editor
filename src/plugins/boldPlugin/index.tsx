import { Plugin } from 'slate-react';
import renderMark from '../../components/renderMark';
import typesConfig from '../../config';

const { MARK } = typesConfig;

export default (opt?: any): Plugin => {
  const options = Object.assign({
    type: MARK.BOLD
  }, opt);
  return renderMark(options, 'mod+b');
};
