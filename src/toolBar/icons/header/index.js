import React from 'react';
import Select from 'components/Select';
import { haveBlocks } from 'utils';

const Option = Select.Option;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.item.defaultSelected || '',
    };
  }
  onChangeType = (value, itemData) => {
    const { change, onChange } = this.props;
    const isActive = haveBlocks(change, itemData.type);
    change.setBlocks(isActive ? itemData.unlock : itemData.type);
    if (onChange && typeof onChange === 'function') {
      onChange(change);
    }
    this.setState({
      value
    });
  }
  renderOptions = () => {
    const { item } = this.props;
    const options = item.options;
    const output = [];
    if (!options || options.length === 0) {
      return null;
    }
    options.map((opt, index) => {
      output.push(<Option value={opt.title} key={`opt-${index}`} itemData={opt}>{opt.title}</Option>);
    });
    return output;
  }
  render() {
    const { item } = this.props;
    const { value } = this.state;
    const iconProps = {
      className: 'icon-select-box',
      title: item.title,
    };
    return (
      <div {...iconProps}>
        <Select value={value} onChange={this.onChangeType}>
          {this.renderOptions()}
        </Select>
      </div>
    );
  }
}
export default Header;
