export interface SelectOptions {
  id: string;
  name: string;
}

export interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOptions[];
  label?: string;
}
