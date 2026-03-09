import classes from "./Message.module.css";

export default function Message({ text }) {
  return (
    <div className={classes.message}>
      <p>{text}</p>
    </div>
  );
}
