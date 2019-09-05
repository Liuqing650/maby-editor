import * as React from 'react';

import { IconButtonProps } from '../../../interface/common';
import IconGroup from '../IconGroup';
import IconButton from './Button';

class IconButtonGroup extends React.Component<IconButtonProps, {}> {
  public handleClick = (type: string, selectItem: any) => {
    if (this.props.onChange) {
      this.props.onChange(type, selectItem);
    }
  }

  public renderIconBtns = (options: any[]) => {
    const output: any = [];
    options.map((item, index) => {
      output.push(
        <IconButton key={`icon-${index}`} config={item} onChange={this.handleClick} />
      );
    });
    return output;
  }
  public render() {
    const { options } = this.props;
    return (
      <IconGroup>
        {this.renderIconBtns(options)}
      </IconGroup>
    );
  }
}
export default IconButtonGroup;
