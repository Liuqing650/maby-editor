import { schema } from './validation';

const core = (option) => {
  return {
    schema: schema(option),
  };
};

export default core;
