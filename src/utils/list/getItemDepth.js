import getCurrentItem from './getCurrentItem';

/**
 * Get depth of current block in a document list
 */
const getItemDepth = (opts, value, block) => {
    const { document, startBlock } = value;
    block = block || startBlock;

    const currentItem = getCurrentItem(opts, value, block);
    if (!currentItem) {
        return 0;
    }

    const list = document.getParent(currentItem.key);

    return 1 + getItemDepth(opts, value, list);
}

export default getItemDepth;
