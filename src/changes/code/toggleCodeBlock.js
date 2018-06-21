import { isInCodeBlock } from '../../utils/code';

import wrapCodeBlock from './wrapCodeBlock';
import unwrapCodeBlock from './unwrapCodeBlock';

function toggleCodeBlock( opts, change, type ) {
    if (isInCodeBlock(opts, change.value)) {
        return unwrapCodeBlock(opts, change, type);
    }
    return wrapCodeBlock(opts, change);
}

export default toggleCodeBlock;
