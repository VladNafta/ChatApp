import classes from "./ChatItem.module.css";

interface ChatItemProps {
  chatId: string;
  selectedChatId: string | null;
  name: string | null;
  text: string;
  src: string;
  className?: string;
  onClick?: () => void;
  updatedAt: number;
}

const ChatItem = ({
  chatId,
  selectedChatId,
  name,
  text,
  src,
  className = "",
  onClick,
  updatedAt,
}: ChatItemProps) => {
  let liClass = `${classes.li} ${className}`;
  if (chatId === selectedChatId) {
    liClass += ` ${classes.selected}`;
  }
  const currentDate = new Date();
  const date = new Date(updatedAt);
  let dateToDisplay = "";
  if (currentDate.toDateString() === date.toDateString()) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    dateToDisplay = `${hours}:${minutes}`;
  } else {
    dateToDisplay = date.toLocaleDateString();
  }

  return (
    <li onClick={onClick} className={liClass}>
      <img src={src} alt={`${name} img`} />
      <div className={classes.text}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
      <p className={classes.time}>{dateToDisplay}</p>
    </li>
  );
};

export default ChatItem;
