import React from 'react';
import IconBar from '../IconBar';
import { haveMarks } from '../../../utils';

class MarkIcon extends React.Component {
  onMouseDown = (event) => {
    event.preventDefault();
    const { change, item, onChange } = this.props;
    haveMarks(change, item.type);
    change.toggleMark(item.type);
    if (onChange && typeof onChange === 'function') {
      onChange(change);
    }
  }
  render() {
    const { change, item } = this.props;
    const isActive = haveMarks(change, item.type);
    const iconProps = {
      className: 'icon-box',
      title: item.title,
      onMouseDown: this.onMouseDown
    };
    const iconBarProps = {
      type: item.type,
      icon: item.icon,
      isActive
    };
    return (
      <div {...iconProps}>
        <IconBar {...iconBarProps} />
      </div>
    );
  }
}
export default MarkIcon;
