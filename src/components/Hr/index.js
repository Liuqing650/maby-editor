import React from 'react';

const Hr = (props) => {
  return (
    <div className="hr-wrap" contentEditable={false}>
      <div {...props.attributes} className="hr">{props.children}</div>
    </div>
  );
};
export default Hr;
