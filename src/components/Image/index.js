import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: '',
      title: ''
    }
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
  onChangeInputStatus = (status) => {
    this.onInput = status;
  };
  createMark = () => {
    this.width = this.imageRef.offsetWidth;
    this.height = this.imageRef.offsetHeight;
    console.log('imageRef---width-->', this.width)
    console.log('imageRef---height-->', this.height)
    return (
      <div>
        <input 
          onFocus={() => this.onChangeInputStatus(true)}
          type="text"
          onBlur={() => this.onChangeInputStatus(false)}
        />
      </div>
    );
    // const config = {
    //   LT: 'lt',
    //   RT: 'rt',
    //   RB: 'rb',
    //   LB: 'lb',
    // };
    // const self = this;
    // const random = Math.round(Math.random() * 100000000);
    // const output = [];
    // Object.keys(config).map((key, index) => {
    //   output.push(
    //     <div
    //       key={`image-${random}-${index}`}
    //       className={`maby-image-holder maby-image-${config[key]}`}>
    //     </div>
    //   );
    // });
    // return output;
  };
  render() {
    const { attributes, isSelected } = this.props;
    const { src, title } = this.state;
    
    return (
      <div 
        className="maby-editor-image-wrap"
        draggable={true}
        contentEditable={false}>
        <span className="maby-image-block">
          <div className="maby-image-content">
            <div className="maby-image-editor">
              {src ? <img {...attributes} ref={(n) => { this.imageRef = n; }} title={title} src={src} /> : <span>Loading...</span>}
              {isSelected ? this.createMark() : null}
            </div>
          </div>
        </span>
      </div>
    );
  }
}
export default Image;
