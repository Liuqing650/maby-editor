import * as React from 'react';

import { Popover } from 'antd';
import { CirclePicker } from 'react-color';
import { ColorPickerProps } from '../../../interface/common';

import IconButton from './IconButton';

interface State {
  background?: string;
  visible: boolean;
  colors: string[];
}

class ColorPicker extends React.Component<ColorPickerProps, State> {
  public static defaultProps = {
    defaultColor: '#222222',
  };
  constructor(props: ColorPickerProps) {
    super(props);
    this.state = {
      background: props.defaultColor,
      visible: false,
      colors: [
        '#000000', '#222222', '#595959', '#bfbfbf', '#e9e9e9', 'transparent',
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
        '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39',
        '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'
      ]
    };
  }
  public handlePopoverChange = (visible: boolean): void => {
    this.setState({visible});
  }
  public handleChangeComplete = (color: any): void => {
    const background = { background: color.hex };
    this.setState(background);
    this.handlePopoverChange(false);
    if (this.props.onChange) {
      this.props.onChange(background);
    }
  }
  public renderPickerDom = (): React.ReactNode => {
    const { colors, background } = this.state;
    const colorPickerProps = {
      color: background,
      colors,
      onChangeComplete: this.handleChangeComplete
    };
    return (
      <div>
        <CirclePicker {...colorPickerProps} />
      </div>
    );
  }
  public render() {
    const { visible, background } = this.state;
    const config = {
      icon: this.props.icon,
      type: this.props.type,
      title: this.props.title,
    };
    return (
      <Popover
        placement="bottom"
        trigger="click"
        visible={visible}
        onVisibleChange={this.handlePopoverChange}
        content={this.renderPickerDom()}
      >
        <span>
          <IconButton config={config} color={background} />
        </span>
      </Popover>
    );
  }
}
export default ColorPicker;
