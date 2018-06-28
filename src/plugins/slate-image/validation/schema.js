import {
  CHILD_TYPE_INVALID,
  PARENT_TYPE_INVALID
} from 'slate-schema-violations';
import { IMAGE_OPTIONS } from '../../options';

/*
 * Returns a schema definition for the plugin
 */
function schema(opts = IMAGE_OPTIONS) {
  return {
    blocks: {
      [opts.typeTable]: {
        nodes: [{ types: [opts.typeRow] }],
        normalize(change, violation, context) {
          switch (violation) {
            case CHILD_TYPE_INVALID:
              return onlyRowsInTable(opts, change, context);
            default:
              return undefined;
          }
        }
      },
      [opts.typeRow]: {
        nodes: [{ types: [opts.typeCell] }],
        parent: { types: [opts.typeTable] },
        normalize(change, violation, context) {
          switch (violation) {
            case CHILD_TYPE_INVALID:
              return onlyCellsInRow(opts, change, context);
            case PARENT_TYPE_INVALID:
              return rowOnlyInTable(opts, change, context);
            default:
              return undefined;
          }
        }
      }
    }
  };
}

export default schema;
