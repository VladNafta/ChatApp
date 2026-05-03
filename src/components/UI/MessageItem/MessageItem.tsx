import classes from "./MessageItem.module.css";

interface MessageItemProps {
  text: string;
  src?:string;
  className?: string;
  ref: React.Ref<HTMLLIElement>;
  isYourMessage: boolean;
  createdAt: number;
}

const MessageItem = ({
  text,
  className = "",
  ref,
  isYourMessage,
  createdAt,
}: MessageItemProps) => {
  const date = new Date(createdAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  let messageClass = `${classes.message} ${className}`;
  if (isYourMessage) {
    messageClass += classes["your-message"];
  }
  return (
    <li ref={ref} className={messageClass}>
      <p className={classes.text}>{text}</p>
      <p className={classes.time}>{`${hours}:${minutes}`}</p>
    </li>
  );
};

export default MessageItem;
