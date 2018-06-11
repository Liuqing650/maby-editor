import React from "react";

const Table = (props) => {
  return (
    <div className="maby-editor-table">
      <table>
        <tbody {...props.attributes}>{props.children}</tbody>
      </table>
    </div>
  )
};
export default Table;
