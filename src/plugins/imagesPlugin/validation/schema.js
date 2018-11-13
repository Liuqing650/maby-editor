import { lastParagraph } from '../../../common/schema';

const schema = (opts) => {
  const schemaObj = lastParagraph(opts);
  schemaObj.blocks = {
    image: {
      isVoid: true,
    }
  };
  return schemaObj;
};

export default schema;
