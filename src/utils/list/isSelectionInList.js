import getItemsAtRange from './getItemsAtRange';

/**
 * True if selection is inside a list (and can be unwrapped)
 */
function isSelectionInList(opts, value) {
    return !getItemsAtRange(opts, value).isEmpty();
}

export default isSelectionInList;
