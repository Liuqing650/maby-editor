import * as React from 'react';

interface ParagraphProps {
  attributes: any;
  children: any | HTMLElement;
}

const Paragraph = (props: ParagraphProps) => {
  return (
    <p {...props.attributes}>{props.children}</p>
  );
};
export default Paragraph;
