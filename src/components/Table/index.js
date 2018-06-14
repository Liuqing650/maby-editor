import React from "react";
import DICT from "../../static";

const TOOLBAR_HEADER = 'header';
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderSelected: false, // 选中状态
    }
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

  // 处理表格
  onHandleTable = (even, method) => {
    const { tablePlugin, onSetAlign, editorChange, isInTable, position } = this.props;
    if (typeof editorChange === 'function' && isInTable) {
      even.preventDefault();
      // 防止冒泡
  	  even.stopPropagation();
      const colIndex = position.getWidth();
      const rowIndex = position.getHeight();
      switch (method) {
        case 'delete': // 删除表格
          editorChange(tablePlugin.changes.removeTable);
          break;
        case 'insertCol': // 插入一列
          if (colIndex < DICT.MAX_TABLE_COL) {
            editorChange(tablePlugin.changes.insertColumn);
          }
          break;
        case 'insertRow': // 插入一行
          if (rowIndex < DICT.MAX_TABLE_ROW) {
            editorChange(tablePlugin.changes.insertRow);
          }
          break;
        case 'removeCol': // 删除一列
          if (colIndex > 0) {
            editorChange(tablePlugin.changes.removeColumn);
          }
          break;
        case 'removeRow': // 删除一行
          if (rowIndex > 0) {
            editorChange(tablePlugin.changes.removeRow);
          }
          break;
        case 'left': // 内容居左
          onSetAlign('left');
          break;
        case 'center': // 内容居中
          onSetAlign('center');
          break;
        case 'right': // 内容居右
          onSetAlign('right');
          break;
        default:
          break;
      }
    };
  };
  createColgroup = () => {
    const { isInTable, position, node } = this.props;
    const rowIndex = isInTable && position.getWidth();
    const output = [];
    if (isInTable && rowIndex > 0 ) {
      for (let idx = 0; idx < rowIndex; idx ++) {
        const width = node.get('data').get('width', DICT.MIN_TABLE_WIDTH);
        output.push(<col key={`colgroup-${Math.random()*100000000}-${idx}`} width={`${width}px`} />);
      }
    }
    return output;
  };
  render() {
    const props = this.props;
    const { isInTable, position } = props;
    const { isHeaderSelected } = this.state;
    return (
      <div className={`maby-editor-table ${isInTable ? 'maby-editor-table-focus' : ''}`}>
        <table className="table-content">
          <colgroup contentEditable={false}>
            {this.createColgroup()}
          </colgroup>
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
                <span className="editor-table-icon icon-insert" onMouseDown={(even) => this.onHandleTable(even, 'left')}>LEFT_COL</span>
                <span className="editor-table-icon icon-insert" onMouseDown={(even) => this.onHandleTable(even, 'center')}>CENTER_COL</span>
                <span className="editor-table-icon icon-insert" onMouseDown={(even) => this.onHandleTable(even, 'right')}>RIGHT_COL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default Table;
