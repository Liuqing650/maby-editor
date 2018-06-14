import { NODE_DATA_INVALID } from 'slate-schema-violations';
import PluginEditTable from 'slate-edit-table';
import DICT from '../static';

/* https://github.com/GitbookIO/slate-edit-table */
const tablePlugin = PluginEditTable({
  typeTable: 'table',
  typeRow: 'table_row',
  typeCell: 'table_cell',
  typeContent: 'paragraph'
});
function setColumnWidth(change, width) {
  const pos = tablePlugin.utils.getPosition(change.value);
  const columnCells = tablePlugin.utils.getCellsAtColumn(
    pos.table,
    pos.getColumnIndex()
  );
  columnCells.forEach(cell => {
    change.setNodeByKey(cell.key, { data: { width } });
  });
  return change;
}

const widthTablePlugin = {
  schema: {
    blocks: {
      table_cell: {
        data: {
          width: width => (width > DICT.MIN_TABLE_WIDTH ? DICT.MIN_TABLE_WIDTH : width)
        },
        normalize(change, violation, context) {
          if (violation === NODE_DATA_INVALID) {
            change.setNodeByKey(context.node.key, {
              data: context.node.data.set('width', DICT.MIN_TABLE_WIDTH)
            });
          }
        }
      }
    }
  },
  changes: {
    setColumnWidth
  }
};

export {
  widthTablePlugin
};
