import { CSSProperties } from "react";

export interface ButtonProps {
  text?: string;
  onClick?: (e: any) => void;
  bgColor?: string;
  type?: HTMLButtonElement['type'];
  loading?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  hideTitle?: boolean;
}
