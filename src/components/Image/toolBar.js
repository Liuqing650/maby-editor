import React from 'react';

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height
    };
    this.timeIndex = 0;
  }
  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState({
        width: newProps.width,
        height: newProps.height
      });
    }
  }
  componentWillUnmount = () => {
    clearTimeout(this.timeIndex);
  }
  onInputWidthChange = (event) => {
    if (!isNaN(Number(event.target.value))) {
      this.setState({
        width: Number(event.target.value)
      });
    }
  }
  onInputHeightChange = (event) => {
    if (!isNaN(Number(event.target.value))) {
      this.setState({
        height: Number(event.target.value)
      });
    }
  }
  handleEvent = (event) => {
    event.stopPropagation();
  }
  handleUpdate = () => {
    const {width, height} = this.state;
    if (this.props.onChangeSize) {
      this.props.onChangeSize(width, height);
    }
  }
  handleFocus = (event) => {
    this.isFocus = true;
    this.timeIndex = setTimeout(() => {
      this.isFocus = false;
    }, 0);
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }
  handleBlur = (event) => {
    this.handleUpdate();
    if (!this.isFocus) {
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }
  }
  handleKeyPress = (event) => {
    this.handleEvent(event);
    if (event.key === 'Enter') {
      this.handleUpdate();
    }
  }
  render() {
    const { width, height } = this.state;
    const { visible } = this.props;
    const eventProps = {
      onBlur: this.handleBlur,
      onMouseDown: this.handleFocus,
      onClick: this.handleEvent,
      onKeyPress: this.handleKeyPress,
    };
    const widthProps = {
      ...eventProps,
      onChange: this.onInputWidthChange,
      value: width,
    };
    const heightProps = {
      ...eventProps,
      onChange: this.onInputHeightChange,
      value: height,
    };
    const toolBarStyle = {
      position: 'absolute',
      opacity: visible ? 1 : 0
    };
    return (
      <div
        contentEditable={false}
        style={toolBarStyle}
      >
        width: <span><input {...widthProps} type="text" /></span>
        height: <span><input {...heightProps} /></span>
      </div>
    );
  }
}
export default ToolBar;
