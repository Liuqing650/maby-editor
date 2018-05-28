/**
 * True if the node is a list container
 */
function isList(opts, node) {
    return opts.types.includes(node.type);
}

export default isList;
