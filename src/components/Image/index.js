import React from "react";

class Image extends React.Component {
  state = {
    src: '',
  }
  componentDidMount() {
    const { node } = this.props;
    const { data } = node;
    const file = data.get('file');
    this.loadImage(file)
  }
  loadImage(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }), false);
    if (file && file.type) {
      reader.readAsDataURL(file);
    }
  }
  render() {
    const { attributes } = this.props
    const { src } = this.state
    return (
      <div>
        {src ? <img {...attributes} src={src} /> : <span>Loading...</span>}
      </div>
    );
  }
}
export default Image;
