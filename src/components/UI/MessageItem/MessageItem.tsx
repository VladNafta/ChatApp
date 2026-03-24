import classes from "./MessageItem.module.css";

interface MessageProps {
  text: string;
}

const MessageItem = ({ text }: MessageProps) => {
  return (
    <div className={classes.message}>
      <p>{text}</p>
    </div>
  );
};

export default MessageItem;
