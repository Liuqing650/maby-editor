import renderBlock from '../../components/renderBlock';
import opts from '../../options';
import core from './core';

const { BLOCKS } = opts;
export default (opt) => {
  const options = Object.assign({
    type: BLOCKS.BLOCKQUOTE
  }, opt);

  const corePlugin = core(options);
  return {
    ...corePlugin,
    ...renderBlock(options, 'mod+m')
  };
};
