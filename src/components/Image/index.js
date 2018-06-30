import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: '',
      title: ''
    }
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
    const src = data.get('base64') || data.get('src') ||null;
    if (src) {
      const title = data.get('title') || '';
      this.setState({ src, title });
    }
  };
  modifyNode = (base64) => {
    const { editor, node } = this.props;
    editor.change(c => c.setNodeByKey(node.key, { data: {base64} }));
  };
  loadImage(file) {
    const reader = new FileReader();
    const self = this;
    reader.addEventListener('load', () => {
      self.setState({ src: reader.result });
      self.modifyNode(reader.result);
    }, false);
    if (file && file.type) {
      reader.readAsDataURL(file);
    }
  }
  render() {
    const { attributes, isSelected } = this.props;
    const { src, title } = this.state;
    if (isSelected) {
      console.log('isSelected---->', isSelected);
    }
    return (
      <div 
        className="maby-editor-image-wrap"
        draggable={true}
        contentEditable={false}>
        <span>
          {src ? <img {...attributes} title={title} src={src} /> : <span>Loading...</span>}
        </span>
      </div>
    );
  }
}
export default Image;
