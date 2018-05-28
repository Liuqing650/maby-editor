import getCurrentItem from './getCurrentItem';
import getListForItem from './getListForItem';

/**
 * Return the parent list block, from current selection or from a node (paragraph in a list item).
 */
function getCurrentList(opts, value, block) {
    const item = getCurrentItem(opts, value, block);

    if (!item) {
        return null;
    }

    return getListForItem(opts, value, item);
}

export default getCurrentList;
