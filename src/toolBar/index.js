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
        output.push(renderMarkButton(item, item[item.key], id));
      }
      if (item.type === 'block') {
        output.push(renderBlockButton(item, item[item.key], id));
      }
    });
    return (
      <div className="menu toolbar-menu">
        {output}
      </div>
    )
  }
  const renderMarkButton = (item, icon, idx) => {
    const isActive = hasMark(item.key)
    const onMouseDown = event => onClickMark(event, item.key)

    return (
      <span className="button" key={idx} title={item.title ? item.title : ''} onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }
  const renderBlockButton = (item, icon, idx) => {
    const isActive = hasBlock(item.key)
    const onMouseDown = event => onClickBlock(event, item.key)

    return (
      <span className="button" key={idx} title={item.title ? item.title : ''} onMouseDown={onMouseDown} data-active={isActive}>
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
