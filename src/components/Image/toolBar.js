import React from 'react';

class ToolBar extends React.Component {
  state = {
    width: 0,
    height: 0,
    // isFocus: false,
  };
  componentWillMount() {
    this.updateState(this.props);
  }
  onInputWidthChange = (event, toolInfo) => {
    const { toolBar } = this.state;
    if (!isNaN(Number(event.target.value))) {
      toolBar.width = Number(event.target.value);
      this.setState({
        toolBar
      });
    }
  }
  onInputHeightChange = (event, toolInfo) => {
    const { toolBar } = this.state;
    if (!isNaN(Number(event.target.value))) {
      toolBar.height = Number(event.target.value);
      this.setState({
        toolBar
      });
    }
  }
  updateState = (props) => {
    const { width, height } = props;
    this.setState({
      width,
      height
    });
  };
  handleEvent = (event) => {
    event.stopPropagation();
  }
  handleFocus = (event, toolInfo) => {
    this.isFocus = true;
  }
  handleBlur = (event, toolInfo) => {
    this.isFocus = false;
    if (toolInfo.sizeChange) {
      toolInfo.sizeChange();
    }
    this.setState({
      toolBar: {}
    });
  }
  handleKeyPress = (event, toolInfo) => {
    this.handleEvent(event);
    if (event.key === 'Enter') {
      if (toolInfo.sizeChange) {
        toolInfo.sizeChange();
      }
    }
  }
  render() {
    const { width, height } = this.state;
    const eventProps = {
      onBlur: (event) => this.handleBlur(event, toolInfo),
      onMouseDown: this.handleFocus,
      onClick: this.handleEvent,
      onKeyPress: (event) => this.handleKeyPress(event, toolInfo),
    };
    const widthProps = {
      ...eventProps,
      onChange: (event) => this.onInputWidthChange(event, toolInfo),
      value: width,
    };
    const heightProps = {
      ...eventProps,
      onChange: (event) => this.onInputHeightChange(event, toolInfo),
      value: height,
    };
    return (
      <div contentEditable={false} style={{position: 'absolute'}}>
        width: <span><input {...widthProps} type="text" /></span>
        height: <span><input {...heightProps} /></span>
      </div>
    );
  }
}
export default ToolBar;
