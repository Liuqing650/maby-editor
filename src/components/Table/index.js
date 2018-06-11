import React from "react";

const Table = (props) => {
  return (
    <div className="maby-editor-table">
      <table className="table-content">
        <tbody {...props.attributes}>{props.children}</tbody>
      </table>
      <div className="table-tool-bar">
      </div>
    </div>
  )
};
export default Table;
