import * as TYPES from './types';
import LANGUAGE_OPTIONS from './language';

export const getOption = (type, option) => {
  return {
    type: TYPES[option][type]
  };
};

export default { ...TYPES, LANGUAGE_OPTIONS };
