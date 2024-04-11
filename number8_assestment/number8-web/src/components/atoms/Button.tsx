import { ButtonProps } from "@interfaces/button";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isPrimary = false,
  size = "small",
  style,
  disabled = false,
}) => {
  const baseColor = isPrimary ? "bg-red-500" : "bg-gray-300";
  const hoverColor = isPrimary ? "hover:bg-red-700" : "hover:bg-gray-700";
  const padding = {
    small: "py-1 px-2",
    medium: "py-2 px-4",
    large: "py-3 px-6",
  }[size];

  const fontSize = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  }[size];

  return (
    <button
      className={`${baseColor} ${hoverColor} text-white font-bold rounded focus:outline-none focus:shadow-outline ${padding} ${fontSize}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
