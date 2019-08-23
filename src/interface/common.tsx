// 公共组件接口类型

export interface SelectProps {
  value?: any;
  defaultValue?: any;
  options: any[];
  disabled?: boolean;
  placeholder?: string;
  selectedWidth?: number;
  onChange?: (value: string, config?: any) => void;
}

export interface IconBtnProps {
  options: any[];
  disabled?: boolean;
  active?: [string];
  defaultActive?: [string];
  onClick?: (value: string, item?: any) => void;
}
