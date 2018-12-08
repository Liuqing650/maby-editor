import React from 'react';

const TodoUlList = (props) => {
  return (
    <ul {...props.attributes} className="task-ul">{props.children}</ul>
  );
};
export default TodoUlList;
