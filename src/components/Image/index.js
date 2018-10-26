import React from 'react';
import ImageDrag from 'image-drag';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      title: ''
    };
    this.onInput = false;
    this.width = 0;
    this.height = 0;
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
  render() {
    console.log('props---->', this.props);
    const { isSelected } = this.props;
    console.log('isSelected---->', isSelected);
    const { src, title } = this.state;
    const dragProps = {
      width: 600,
      image: src,
      title,
      toolBar: {
        isUse: true,
        isShow: !isSelected
      }
    };
    return (
      <span {...this.props.attribute}>
        <ImageDrag {...dragProps} />
      </span>
    );
  }
}
export default Image;
