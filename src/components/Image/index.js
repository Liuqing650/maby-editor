import React from 'react';
import ImageDrag from 'image-drag';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      title: '',
      toolBar: {},
      // isFocus: false,
    };
  }
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
  setBaseFileToSrc = (data) => {
    const src = data.get('base64') || data.get('src') || null;
    if (src) {
      const title = data.get('title') || '';
      this.setState({ src, title });
    }
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
  render() {
    const { isSelected } = this.props;
    const { src, title, toolBar } = this.state;
    console.log('toolBar----->', toolBar);
    const self = this;
    const dragProps = {
      width: 600,
      image: src,
      title,
      tabIndex: 'false',
      toolBar: {
        ...toolBar,
        isUse: true,
        isShow: isSelected || this.isFocus
      },
      onDragEnd: (toolInfo) => {
        console.log('drag end...', toolInfo);
      },
      renderTool(toolInfo) {
        if (!toolInfo.isUse || !toolInfo.isShow) {
          return;
        }
        const eventProps = {
          onBlur: (event) => self.handleBlur(event, toolInfo),
          onMouseDown: self.handleFocus,
          onClick: self.handleEvent,
          onKeyPress: (event) => self.handleKeyPress(event, toolInfo),
        };
        const widthProps = {
          ...eventProps,
          onChange: (event) => self.onInputWidthChange(event, toolInfo),
          value: toolInfo.width,
        };
        const heightProps = {
          ...eventProps,
          onChange: (event) => self.onInputHeightChange(event, toolInfo),
          value: toolInfo.height,
        };
        return (
          <div contentEditable={false} style={{position: 'absolute'}}>
            width: <span><input {...widthProps} type="text" /></span>
            height: <span><input {...heightProps} /></span>
          </div>
        );
      }
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
