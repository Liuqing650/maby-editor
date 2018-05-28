import isList from './isList';

/**
 * Return the parent list block for an item block.
 */
function getListForItem(opts, value, item) {
    const { document } = value;
    const parent = document.getParent(item.key);
    return parent && isList(opts, parent) ? parent : null;
}

export default getListForItem;
