import React from 'react';
import ImageDrag from 'image-drag';
import ToolBar from './toolBar';

class Image extends React.Component {
  state = {
    width: 0,
    height: 0,
    style: {},
    src: '',
    title: '',
    isFocus: false,
  };
  componentWillMount() {
    const { node } = this.props;
    const { data } = node;
    this.initImage(data);
  }
  setBaseFileToSrc = (data) => {
    const src = data.get('base64') || data.get('src') || null;
    if (src) {
      const title = data.get('title') || '';
      this.setState({ src, title });
    }
  };
  initImage = (data) => {
    const style = data.get('style');
    const file = data.get('file');
    if (file) {
      this.loadImage(file);
    } else {
      this.setBaseFileToSrc(data);
    }
    this.setState({style});
  }
  isValid = () => {
    const node = this.props.node;
    const src = node.get('base64') || node.get('src');
    return !!src;
  }
  isSelected = () => {
    const {isSelected, editor} = this.props;
    const isFocus = this.state.isFocus;
    return isSelected && editor.value.isCollapsed || isFocus;
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
  handleEvent = (event) => {
    event.stopPropagation();
  }
  handleFocus = () => {
    this.setState({isFocus: true});
  }
  handleBlur = () => {
    this.setState({isFocus: false});
  }
  updateState = (toolInfo) => {
    this.setState({
      width: Number(toolInfo.width),
      height: Number(toolInfo.height),
    });
  }
  updateSize = (width, height, toolInfo) => {
    toolInfo.changeSize(width, height);
    this.setState({
      width,
      height,
    });
  }
  handleClickImage = (toolInfo) => {
    const { width, height } = this.state;
    if (width === 0 && height === 0) {
      this.setState({
        width: Number(toolInfo.width),
        height: Number(toolInfo.height),
      });
    }
  }
  renderToolBar = (toolInfo) => {
    const { width, height } = this.state;
    const isValid = this.isValid();
    if (isValid) {
      return;
    }
    const toolBarProps = {
      width,
      height,
      visible: this.isSelected(),
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChangeSize: (width, height) => this.updateSize(width, height, toolInfo),
    };
    return (<ToolBar {...toolBarProps} />);
  };
  render() {
    const { src, title, style } = this.state;
    const isShow = this.isSelected();
    const dragProps = {
      width: style && style.width ? style.width : 600,
      height: style && style.height ? style.height : 400,
      image: src,
      title,
      tabIndex: 'false',
      toolBar: {
        isUse: true,
        isShow
      },
      onDragEnd: this.updateState,
      onClickImage: this.handleClickImage,
      renderTool: this.renderToolBar,
    };
    const imgStyle = { display: 'block' };
    return (
      <span style={imgStyle} {...this.props.attribute}>
        <ImageDrag {...dragProps} />
      </span>
    );
  }
}
export default Image;
