import _default from './default';
export default (props) => {
  if (!props) {
    console.error('MabyEditor 必须接受一个 onChange 函数，用于回调输入的值！');
    return false;
  }
  if (!props.onChange || typeof (props.onChange) !== 'function') {
    console.error('MabyEditor 必须接受一个 onChange 函数，用于回调输入的值！');
    return false;
  }
  return {
    tools: props.tools ? props.tools : _default.tools,
    value: props.value ? props.value : _default.value,
    mode: props.model ? props.mode : _default.mode,
    onChange: props.onChange,
  }
};