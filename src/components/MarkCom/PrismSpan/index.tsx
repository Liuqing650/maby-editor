import * as React from 'react';

interface PrismSpanProps {
  attributes: any;
  mark: any;
  children: any | HTMLElement;
}

const PrismSpan = (props: PrismSpanProps) => {
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
