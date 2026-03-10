import classes from "./Error.module.css";

interface ErrorProps {
  message: string;
  className?: string;
}

const Error = ({ message, className = "" }: ErrorProps) => {
  return <p className={`${classes.error} ${className}`}>{message}</p>;
};

export default Error;
