import classes from "./MessageItem.module.css";

interface MessageProps {
  text: string;
  className?: string;
  ref: React.Ref<HTMLLIElement>;
  isSenderMessage: boolean;
  createdAt: number;
}

const MessageItem = ({
  text,
  className = "",
  ref,
  isSenderMessage,
  createdAt,
}: MessageProps) => {
  const date = new Date(createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();

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
