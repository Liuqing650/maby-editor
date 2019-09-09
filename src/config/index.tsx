import LANGUAGE from './language';
import * as TYPES from './types';

export const getType = (type: string, module: string ) => ({
  type: TYPES[module][type]
});

export {
  LANGUAGE
};
export default { ...TYPES };
