import React from 'react';

const Option = ({ selectValue, value, handleClick, children, itemData }) => {
  const onMouseDown = (event, value) => {
    event.preventDefault();
    handleClick(event, value, itemData);
  };
  if (selectValue === value) {
    return (
      <a className="select-item-active" title={value} onMouseDown={(event) => onMouseDown(event, value)}>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <a className="select-item" title={value} onMouseDown={(event) => onMouseDown(event, value)}>
      <span>{children}</span>
    </a>
  );
};
export default Option;
