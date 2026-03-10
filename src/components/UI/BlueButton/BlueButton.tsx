import { ButtonHTMLAttributes } from "react";
import classes from "./BlueButton.module.css";

interface BlueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <button className={`${classes.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default BlueButton;
