import classes from "./Message.module.css";

interface MessageProps {
  text: string;
}

const Message = ({ text }: MessageProps) => {
  return (
    <div className={classes.message}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
