import { lastParagraph } from '../../common/schema';

const core = (option) => {
  return {
    schema: lastParagraph(option),
  };
};

export default core;
