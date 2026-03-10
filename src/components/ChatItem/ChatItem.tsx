import { FC, ImgHTMLAttributes } from "react";

import classes from "./ChatItem.module.css";

interface ChatItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  text: string;
}

const ChatItem: FC<ChatItemProps> = ({ name, text, src }) => {
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
