import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: ''
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
    const base64 = data.get('base64') || null;
    if (base64) {
      this.setState({ src: base64 });
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
    const { attributes } = this.props;
    const { src } = this.state;
    return (
      <div 
        className="maby-editor-image-wrap"
        draggable={true}
        contentEditable={false}>
        <span 
          className="maby-image-editor"
          onClick={this.onActiveImage}
          contentEditable={false}>
          {src ? <img {...attributes} src={src} /> : <span>Loading...</span>}
        </span>
      </div>
    );
  }
}
export default Image;
