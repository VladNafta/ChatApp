import classes from "./Error.module.css";

export default function Error({ message, className = "", ...props }) {
  return (
    <p className={`${classes.error} ${className}`} {...props}>
      {message}
    </p>
  );
}
