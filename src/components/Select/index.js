import React from 'react';
import Option from './Option';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      value: props.defaultValue || props.value,
      nullValue: 'Not Found',
      options: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
        label: nextProps.label,
      });
    }
  }
  handleClick = (event, value, itemData) => {
    event.preventDefault();
    const { onChange } = this.props;
    if (onChange) {
      onChange(value, itemData);
    }
    this.setState({
      value
    });
  }
  toggleButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      active: !this.state.active
    });
    document.body.addEventListener('click', this.handleHideList);
  };
  handleHideList = () => {
    this.setState({
      active: false
    });
    document.body.removeEventListener('click', this.handleHideList);
  };
  renderTrigger = () => {
    const { value, active } = this.state;
    return (
      <div className="select-trigger">
        <button className={`trigger-button ${active ? 'trigger-button-active' : ''}`} onClick={this.toggleButton}>
          <span className="trigger-text">{value}</span>
          <span className="trigger-icon-arrow" />
        </button>
      </div>
    );
  };
  renderOptions = () => {
    const { nullValue, value } = this.state;
    const { children } = this.props;
    const output = [];
    if (!children) {
      return (<Option key="null-opt">{nullValue}</Option>);
    }
    if (children.length > 0) {
      this.props.children.forEach((child, idx) => {
        output.push(
          React.cloneElement(child, {
            key: `ot-${idx}`,
            selectValue: value,
            handleClick: this.handleClick
          })
        );
      });
      return output;
    }
    return React.cloneElement(children, {
      selectValue: value,
      handleClick: this.handleClick
    });
  };
  render() {
    const { active } = this.state;
    return (
      <div className="mb-select">
        {this.renderTrigger()}
        <div className={`select-list ${active ? 'select-list-active' : ''}`}>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}
Select.Option = Option;
export default Select;
