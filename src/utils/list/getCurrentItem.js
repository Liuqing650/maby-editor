/**
 * Return the current list item, from current selection or from a node.
 */
function getCurrentItem(opts, value, block) {
    const { document } = value;

    if (!block) {
        if (!value.selection.startKey) return null;
        block = value.startBlock;
    }

    const parent = document.getParent(block.key);
    return parent && parent.type === opts.typeItem ? parent : null;
}

export default getCurrentItem;
