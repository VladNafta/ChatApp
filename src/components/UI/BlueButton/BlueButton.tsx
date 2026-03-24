import classes from "./BlueButton.module.css";

interface BlueButtonProps {
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BlueButton = ({
  className = "",
  children,
  type,
  onClick,
}: BlueButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${classes.button} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default BlueButton;
