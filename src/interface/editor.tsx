// 定义接口类型

export interface SlateValue { value: any; }

// 顶部导航栏props
export interface ToolBarProps {
  visible: boolean;
  tools?: any;
  containerClassName?: string;
  containerStyle?: object;
}
// 编辑器props
export interface MaybeEditorProps {
  className?: string;
  placeholder?: string;
  toolBar: ToolBarProps;
  onChange?: (slateValue: SlateValue) => void;
}
