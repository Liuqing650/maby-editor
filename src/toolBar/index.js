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
      const icon = item.icon ? item.icon : item[item.key];
      if (item.type === 'mark') {
        output.push(renderMarkButton(item, icon, id));
      } else {
        output.push(renderBlockButton(item, icon, id));
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
    if (item.loop && item.loop.length > 0) {
      const output = [];
      item.loop.map((child, cidx) => {
        output.push(
          <span className="button" key={`${idx}-${cidx}`} title={child.title ? child.title : ''} onMouseDown={onMouseDown} data-active={hasMark(child.key)}>
          <i className={`iconfont ${child.icon ? child.icon : child[child.key]}`} />
        </span>)
      })
      return output;
    }
    return (
      <span className="button" key={idx} title={item.title ? item.title : ''} onMouseDown={onMouseDown} data-active={isActive}>
        <i className={`iconfont ${icon}`} />
      </span>
    )
  }
  const renderBlockButton = (item, icon, idx) => {
    // 数组类型的数据
    if (item.loop && item.loop.length > 0) {
      const output = [];
      item.loop.map((child, cidx) => {
        const onMouseDown = event => onClickBlock(event, child.key);
        output.push(
          <span className="button" key={`${idx}-${cidx}`} title={child.title ? child.title : ''} onMouseDown={onMouseDown} data-active={hasBlock(child.key)}>
            <i className={`iconfont ${child.icon ? child.icon : child[child.key]}`}/>
          </span>);
      })
      return output;
    }
    // 不是数组类型的数据
    const isActive = hasBlock(item.key);
    const onMouseDown = event => onClickBlock(event, item.key);
    return (
      <span className="button" key={idx} title={item.title ? item.title : ''} onMouseDown={onMouseDown} data-active={isActive}>
        <i className={`iconfont ${icon}`} />
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
