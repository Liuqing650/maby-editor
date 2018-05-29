import { unwrapList, splitListItem, decreaseItemDepth } from '../changes';
import { ListFn } from '../utils';

/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */

const { getCurrentItem, getItemDepth } = ListFn;

function onEnter(event, change, editor, opts) {
    // Pressing Shift+Enter
    // should split block normally
    if (event.shiftKey) {
        return undefined;
    }

    const { value } = change;
    const currentItem = getCurrentItem(opts, value);

    // Not in a list
    if (!currentItem) {
        return undefined;
    }

    event.preventDefault();

    // If expanded, delete first.
    if (value.isExpanded) {
        change.delete();
    }

    if (currentItem.isEmpty) {
        // Block is empty, we exit the list
        if (getItemDepth(opts, value) > 1) {
            return decreaseItemDepth(opts, change);
        }
        // Exit list
        return unwrapList(opts, change);
    }
    // Split list item
    return splitListItem(opts, change);
}

export default onEnter;
