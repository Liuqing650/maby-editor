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
        this.change({ isHeaderSelected: !this.state.isHeaderSelected});
        break;
      default:
        break;
    }
  };

  // 删除表格
  onDeleteTable = (even) => {
    event.preventDefault();
    const { tablePlugin, editorChange, isInTable } = this.props;
    if (typeof editorChange === 'function' && isInTable) {
      editorChange(tablePlugin.changes.removeTable);
    };
    this.change({ isHeaderSelected: false });
  };

  render() {
    const props = this.props;
    const { isHeaderSelected } = this.state;
    return (
      <div className={`maby-editor-table ${props.isInTable ? 'maby-editor-table-focus' : null}`}>
        <table className="table-content">
          <tbody {...props.attributes}>{props.children}</tbody>
        </table>
        <div className="table-tool-bar" contentEditable={false}>
          <div className={`header ${isHeaderSelected ? 'header-selected' : null}`}
              onMouseDown={() => this.toolBarMouseEnter(TOOLBAR_HEADER)}
            >
            <div className="inner">
              <div className="inner">
                <div className={`table-select ${isHeaderSelected ? 'table-select-selected' : null}`}></div>
                <div className="delete-table" onMouseDown={this.onDeleteTable}>
                  <span className="editor-icon icon-delete">DEL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default Table;
