import * as TYPES from './types';

export const getOption = (type, option) => {
  return {
    type: TYPES[option][type]
  };
};

export default { ...TYPES };
