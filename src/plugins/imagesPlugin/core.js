import schema from './validation/schema';

const core = (option) => {
  return {
    schema: schema(option),
  };
};

export default core;
