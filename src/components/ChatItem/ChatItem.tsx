import classes from "./ChatItem.module.css";

interface ChatItemProps {
  chatId: string;
  selectedChatId: string | null;
  name: string;
  text: string;
  src: string;
  className?: string;
  onClick: () => void;
}

const ChatItem = ({
  chatId,
  selectedChatId,
  name,
  text,
  src,
  className = "",
  onClick,
}: ChatItemProps) => {
  let liClass = `${classes["chat-item"]} ${className}`;
  if (chatId === selectedChatId) {
    liClass += ` ${classes.selected}`;
  }

  return (
    <li onClick={onClick} className={liClass}>
      <img src={src} alt={`${name} img`} />
      <div className={classes["text"]}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </li>
  );
};

export default ChatItem;
