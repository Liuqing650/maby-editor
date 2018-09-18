import {
  CHILD_TYPE_INVALID
} from 'slate-schema-violations';

const schema = (opts) => {
  return {
    blocks: {
      [opts.type]: {
        normalize(change, violation, context) {
          console.log('violation---schema-->', violation);
          switch (violation) {
            case CHILD_TYPE_INVALID:
              return undefined;
            default:
              return undefined;
          }
        }
      }
    }
  };
};

export default schema;
