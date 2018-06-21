function indentLines( opts, change, indent ) {
    const { value } = change;
    const { document, selection } = value;
    const lines = document
        .getBlocksAtRange(selection)
        .filter(node => node.type === opts.lineType);

    return lines.reduce((c, line) => {
        const text = line.nodes.first();
        return c.insertTextByKey(text.key, 0, indent);
    }, change);
}

export default indentLines;
