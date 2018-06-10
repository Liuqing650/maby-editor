import React from "react";

const TableCell = (props) => {
  const textAlign = props.node.get('data').get('align', 'left');
  return (
    <td style={{ textAlign }} {...props.attributes}>{props.children}</td>
  )
};
export default TableCell;
