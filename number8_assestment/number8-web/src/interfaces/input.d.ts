export interface InputProps {
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  name: string;
}
