import classes from "./MessageItem.module.css";

interface MessageProps {
  text: string;
  className?: string;
  ref: React.Ref<HTMLLIElement>;
  isSenderMessage: boolean;
}

const MessageItem = ({
  text,
  className = "",
  ref,
  isSenderMessage,
}: MessageProps) => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();

  let messageClass = `${classes.message} ${className}`;
  if (isSenderMessage) {
    messageClass += classes["sender-message"];
  }
  return (
    <li ref={ref} className={messageClass}>
      <p className={classes.text}>{text}</p>
      <p className={classes.time}>{`${hours}:${minutes}`}</p>
    </li>
  );
};

export default MessageItem;
