import React, {PureComponent} from 'react';
import enhanceWithClickOutside from 'react-click-outside';

class ImageInputContainer extends PureComponent {
  onInputWidthChange = (event) => {
    const { toolBar, onChange, toolInfo } = this.props;
    toolBar.width = isNaN(Number(event.target.value)) ? toolInfo.width : Number(event.target.value);
    onChange(toolBar);
  }
  onInputHeightChange = (event) => {
    const { toolBar, onChange, toolInfo } = this.props;
    // const _toolBar = Object.assign({}, toolBar);
    toolBar.height = isNaN(Number(event.target.value)) ? toolInfo.width : Number(event.target.value);
    onChange(toolBar);
  }
  onFocusChange = (even) => {
    even.preventDefault();
    // this.setState({
    //   isFocus: true,
    // });
    console.log(55555);
  }
  render() {
    const { toolInfo } = this.props;
    const widthProps = {
      onChange: self.onInputWidthChange,
      value: toolInfo.width,
      onClick: self.onFocusChange,
      // onBlur: self.onBlurChange,
    };
    const heightProps = {
      onChange: self.onInputHeightChange,
      value: toolInfo.height,
      // onClick: self.onFocusChange,
      // onBlur: self.onBlurChange,
    };
    return (
      <div contentEditable={false} style={{position: 'absolute'}}>
        width: <span><input {...widthProps} type="text" /></span>
        height: <span><input {...heightProps} /></span>
        <button onClick={toolInfo.sizeChange}>修改尺寸</button>
      </div>
    );
  }
}
export default enhanceWithClickOutside(ImageInputContainer);
