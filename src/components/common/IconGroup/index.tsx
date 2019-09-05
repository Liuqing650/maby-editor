import * as React from 'react';

import * as styles from '../../../style/index.less';

class IconGroup extends React.Component<any, {}> {
  public render() {
    return (
      <div className={styles.meToolbarArea}>
        {this.props.children}
      </div>
    );
  }
}
export default IconGroup;
