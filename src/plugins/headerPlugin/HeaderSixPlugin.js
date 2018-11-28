import renderBlock from '../../components/renderBlock';
import opts from '../../options';

const { BLOCKS } = opts;
export default (opt) => {
  const options = Object.assign({
    type: BLOCKS.HEADING_6
  }, opt);
  return renderBlock(options, 'mod+6');
};