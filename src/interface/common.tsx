// 公共组件接口类型

export interface SelectProps {
  value?: any;
  defaultValue?: any;
  options: any[];
  disabled?: boolean;
  placeholder?: string;
  title?: string;
  selectedWidth?: number;
  selectedValue?: any | HTMLElement;
  onChange?: (value: string, config?: any) => void;
}

// 颜色组件接口了类型
export interface ColorPickerProps {
  defaultColor?: string;
  icon: string;
  type: string;
  title?: string;
  onChange?: (value: any) => void;
}

// 顶部按钮接口类型
export interface IconButtonProps {
  options: any[];
  onChange?: (type: string, selectItem: any) => void;
}
