import React from 'react';

const PrismSpan = (props) => {
  const { children, attributes, mark } = props;
  const { data } = mark;
  let className = '';
  if (data.get && typeof data.get === 'function') {
    className = data.get('className');
  }
  return (
    <span {...attributes} className={`token ${className}`}>
      {children}
    </span>
  );
};
export default PrismSpan;
