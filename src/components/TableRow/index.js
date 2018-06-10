import React from "react";

const TableRow = (props) => {
  return (
    <tr {...props.attributes}>{props.children}</tr>
  )
};
export default TableRow;
