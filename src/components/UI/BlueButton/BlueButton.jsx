import classes from "./BlueButton.module.css";

export default function BlueButton({ className = "", children, ...props }) {
  return (
    <button className={`${classes.button} ${className}`} {...props}>
      {children}
    </button>
  );
}
