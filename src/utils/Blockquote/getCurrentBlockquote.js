import { BLOCKS } from "../../options";

const getCurrentBlockquote = ( value ) => {
    const { document } = value;
    const currentBlock = value.startBlock;
    const parent = document.getParent(currentBlock.key);
    return parent && parent.type === BLOCKS.BLOCKQUOTE ? parent : null;
}
export default getCurrentBlockquote;
