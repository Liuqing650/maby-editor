import React from "react";
import DICT from "../../static";

class TableCell extends React.Component {
  render() {
    const props = this.props;
    const textAlign = props.node.get('data').get('align', DICT.TABLE_TEXT_ALIGIN);
    return (
      <td 
        style={{ textAlign }}
        className="table-td"
        {...props.attributes}
        >
        {props.children}
      </td>
    )
  }
};
export default TableCell;
