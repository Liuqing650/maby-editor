import * as React from 'react';

interface SpanMarkProps {
  attributes: any;
  children: any | HTMLElement;
}

export default class SpanMark extends React.Component<SpanMarkProps, {}> {
  public render() {
    return (
      <span {...this.props.attributes}>{this.props.children}</span>
    );
  }
}
