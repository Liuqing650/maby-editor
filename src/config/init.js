import _default from './default';
export default (props, html) => {
  if (!props) {
    console.error('MabyEditor 必须接受一个 onChange 函数，用于回调输入的值！');
    return false;
  }
  if (!props.onChange || typeof (props.onChange) !== 'function') {
    console.error('MabyEditor 必须接受一个 onChange 函数，用于回调输入的值！');
    return false;
  }
  let value = props.value || _default.value;
  const needRules = ['html'];
  if (needRules.includes(props.mode)) {
    if (!props.value) {
      value = '<p></p>';
    } else {
      value = value;
    }
  }
  const result = {
    ..._default,
    ...props,
    value: value
  };
  return result;
};