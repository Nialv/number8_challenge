export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isPrimary?: boolean;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  disabled?: boolean;
}
