import React from "react";

const Table = (props) => {
  return (
    <table>
      <tbody {...props.attributes}>{props.children}</tbody>
    </table>
  )
};
export default Table;
