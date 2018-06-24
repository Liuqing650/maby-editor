// @flow
import TablePosition from './TablePosition';
import Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts = Options, value) {
    if (!value.selection.startKey) return false;

    const { startKey, endKey } = value;
    const startPosition = TablePosition.create(opts, value.document, startKey);
    const endPosition = TablePosition.create(opts, value.document, endKey);

    // Only handle events in tables
    if (!startPosition.isInTable() || !endPosition.isInTable()) {
        return false;
    }

    // Inside the same table
    return startPosition.table === endPosition.table;
}

export default isSelectionInTable;
