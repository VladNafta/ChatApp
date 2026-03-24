import classes from "./ChatItem.module.css";

interface ChatItemProps {
  name: string;
  text: string;
  src: string;
}

const ChatItem = ({ name, text, src }: ChatItemProps) => {
  return (
    <div className={classes["chat-item"]}>
      <img src={src} alt={`${name} img`} />
      <div className={classes["text"]}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatItem;
