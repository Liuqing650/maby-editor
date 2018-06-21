import { getCurrentCode } from '../../utils/code';
import unwrapCodeBlockByKey from './unwrapCodeBlockByKey';

function unwrapCodeBlock(opts, change, type) {
    const { value } = change;

    const codeBlock = getCurrentCode(opts, value);

    if (!codeBlock) {
        return change;
    }

    // Convert to paragraph
    unwrapCodeBlockByKey(opts, change, codeBlock.key, type);

    return change;
}

export default unwrapCodeBlock;
