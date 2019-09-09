import * as React from 'react';

interface BoldProps {
  attributes: any;
  children: any | HTMLElement;
}

export default class Bold extends React.Component<BoldProps, {}> {
  public render() {
    return (
      <strong {...this.props.attributes}>{this.props.children}</strong>
    );
  }
}
