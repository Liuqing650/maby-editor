// @flow
import { Record } from 'immutable';
/**
 * The plugin options
 */
class Options extends Record({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    typeContent: 'paragraph',
    exitBlockType: 'paragraph'
}) {
    // The type of table blocks
    typeTable;
    // The type of row blocks
    typeRow;
    // The type of cell blocks
    typeCell;
    // The default type for blocks in cells
    typeContent;
    // The type of block inserted when exiting
    exitBlockType;
}

export default Options;
