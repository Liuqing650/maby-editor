import React from "react";

const TOOLBAR_HEADER = 'header';
class Table extends React.Component {
  state = {
    isHeaderSelected: false, // 删除选中项
  }

  change = (data) => {
    this.setState(data);
  }

  toolBarMouseEnter = (type) => {
    switch (type) {
      case TOOLBAR_HEADER:
        // this.change({ isHeaderSelected: !this.state.isHeaderSelected});
        this.change({ isHeaderSelected: true});
        break;
      default:
        break;
    }
  };

  // 处理表格
  onHandleTable = (even, method) => {
    event.preventDefault();
    const { tablePlugin, editorChange, isInTable } = this.props;
    return;
    if (typeof editorChange === 'function' && isInTable) {
      switch (method) {
        // 删除表格
        case 'delete':
          editorChange(tablePlugin.changes.removeTable);
          break;
        case 'insertCol':
          editorChange(tablePlugin.changes.insertColumn);
          break;
        case 'insertRow':
          editorChange(tablePlugin.changes.insertRow);
          break;
        case 'removeCol':
          editorChange(tablePlugin.changes.removeColumn);
          break;
        case 'removeRow':
          editorChange(tablePlugin.changes.removeRow);
          break;
        default:
          break;
      }
    };
    this.change({ isHeaderSelected: false });
  };

  render() {
    const props = this.props;
    const { isInTable, position } = props;
    const { isHeaderSelected } = this.state;
    
    console.log(position);
    console.log('posAttr--> [row, col]: [%s, %s]   height: %s', position.getRowIndex(), position.getColumnIndex(), position.getHeight());
    return (
      <div className={`maby-editor-table ${isInTable ? 'maby-editor-table-focus' : null}`}>
        <table className="table-content">
          <tbody {...props.attributes}>{props.children}</tbody>
        </table>
        <div className="table-tool-bar" contentEditable={false}>
          <div className={`header ${isHeaderSelected ? 'header-selected' : null}`}
              onMouseDown={() => this.toolBarMouseEnter(TOOLBAR_HEADER)}
            >
            <div className="inner">
              <div className={`table-select ${isHeaderSelected ? 'table-select-selected' : null}`}></div>
              <div className="operation-area">
                <span className="editor-table-icon icon-delete" onMouseDown={(even) => this.onHandleTable(even, 'delete')}>DEL</span>
                <span className="editor-table-icon icon-insert" onMouseDown={(even) => this.onHandleTable(even, 'insertCol')}>INSERT_COL</span>
                <span className="editor-table-icon icon-insert" onMouseDown={(even) => this.onHandleTable(even, 'insertRow')}>INSERT_ROW</span>
                <span className="editor-table-icon icon-insert" onMouseDown={(even) => this.onHandleTable(even, 'removeCol')}>REMOVE_COL</span>
                <span className="editor-table-icon icon-insert" onMouseDown={(even) => this.onHandleTable(even, 'removeRow')}>REMOVE_ROW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default Table;
