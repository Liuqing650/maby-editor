import React from 'react';

const ToolBar = ({
  tools,
  hasMark,
  hasBlock,
  onClickMark,
  onClickBlock
}) => {
  const renderToolbar = () => {
    let output = [];
    if (!tools) {
      return;
    }
    tools.map((item, index) => {
      let id = (index + 1);
      if (item.type === 'mark') {
        output.push(renderMarkButton(item.key, item[item.key], id));
      }
      if (item.type === 'block') {
        output.push(renderBlockButton(item.key, item[item.key], id));
      }
    });
    return (
      <div className="menu toolbar-menu">
        {output}
      </div>
    )
  }
  const renderMarkButton = (type, icon, idx) => {
    const isActive = hasMark(type)
    const onMouseDown = event => onClickMark(event, type)

    return (
      <span className="button" key={idx} onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }
  const renderBlockButton = (type, icon, idx) => {
    const isActive = hasBlock(type)
    const onMouseDown = event => onClickBlock(event, type)

    return (
      <span className="button" key={idx} onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }
  return (
    <div className="maby-nav">
      {renderToolbar()}
    </div>
  );
}
export default ToolBar;
