import React from 'react';
import { Checkbox } from 'antd';

class TodoLiList extends React.Component {
  state = {
    checked: false,
  };
  componentWillMount() {
    const { node } = this.props;
    const { data } = node;
    this.initChecked(data);
  }
  onChecked = (checked) => {
    this.setState({ checked });
  }
  onChange = (event) => {
    const { editor, node } = this.props;
    editor.change(c =>
      c.setNodeByKey(node.key, {
        data: {
          checked: event.target.checked
        }
      }));
    this.onChecked(event.target.checked);
  }
  initChecked = (data) => {
    const checked = data.get('checked') || false;
    this.onChecked(checked);
  }
  render() {
    const props = this.props;
    const { checked } = this.state;
    const activeCss = checked ? 'task-li-selected' : '';
    return (
      <li {...props.attributes} className="task-li">
        <div contentEditable={false} className="task-li-checkbox">
          <Checkbox checked={checked} onChange={this.onChange} />
        </div>
        <div className={activeCss}>
          {props.children}
        </div>
      </li>
    );
  }
}
export default TodoLiList;
