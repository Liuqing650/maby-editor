import React from 'react';
import ImageDrag from 'image-drag';

class Image extends React.Component {
  state = {
    width: 0,
    height: 0,
    src: '',
    title: '',
    isFocus: false,
  };
  componentDidMount() {
    const { node } = this.props;
    const { data } = node;
    const file = data.get('file');
    if (file) {
      this.loadImage(file);
    } else {
      this.setBaseFileToSrc(data);
    }
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
  setBaseFileToSrc = (data) => {
    const src = data.get('base64') || data.get('src') || null;
    if (src) {
      const title = data.get('title') || '';
      this.setState({ src, title });
    }
  };
  modifyNode = (base64) => {
    const { editor, node } = this.props;
    editor.change(c => c.setNodeByKey(node.key, { data: {base64} }));
  };
  loadImage = (file) => {
    const reader = new FileReader();
    const self = this;
    reader.addEventListener('load', () => {
      self.setState({ src: reader.result });
      self.modifyNode(reader.result);
    }, false);
    if (file && file.type) {
      reader.readAsDataURL(file);
    }
  };
  handleEvent = (event) => {
    event.stopPropagation();
  }
  handleFocus = (isFocus) => {
    this.setState({isFocus});
  }
  handleBlur = (event, toolInfo) => {
    this.updateSize(toolInfo);
  }
  handleKeyPress = (event, toolInfo) => {
    this.handleEvent(event);
    if (event.key === 'Enter') {
      this.updateSize(toolInfo);
    }
  }
  updateState = (toolInfo) => {
    console.log('width------->', toolInfo.width);
    this.setState({
      width: Number(toolInfo.width),
      height: Number(toolInfo.height),
    });
  }
  updateSize = (toolInfo) => {
    const { width, height } = this.state;
    toolInfo.changeSize(width, height);
  }
  render() {
    const { isSelected } = this.props;
    const { src, title, isFocus } = this.state;
    const renderToolBar = (toolInfo) => {
      if (!toolInfo.isUse || !toolInfo.isShow) {
        return;
      }
      const { width, height } = this.state;
      const eventProps = {
        onBlur: (event) => this.handleBlur(event, toolInfo),
        onMouseDown: () => this.handleFocus(true),
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
          width: <span><input {...widthProps} /></span>
          height: <span><input {...heightProps} /></span>
        </div>
      );
    };
    // console.log(isSelected || isFocus);
    const dragProps = {
      width: 600,
      image: src,
      title,
      tabIndex: 'false',
      toolBar: {
        isUse: true,
        isShow: isSelected || isFocus
      },
      onDragEnd: this.updateState,
      onClickImage: this.updateState,
      renderTool: renderToolBar,
    };
    const style = { display: 'block' };
    return (
      <span style={style} {...this.props.attribute}>
        <ImageDrag {...dragProps} />
      </span>
    );
  }
}
export default Image;
