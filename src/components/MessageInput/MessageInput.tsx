import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import emojiImg from "../../assets/emoji.png";
import image from "../../assets/img.png";
import sendImg from "../../assets/send-icon.svg";
import { setLastMessageToUserChat } from "../../firebase/firebase-chat";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { sendMessage } from "../../store/chat-messages/chat-messages-actions";
import classes from "./MessageInput.module.css";

interface MessageInputProps {
  className: string;
}

const MessageInput = ({ className }: MessageInputProps) => {
  const dispatch = useAppDispatch();
  const chatId = useAppSelector((state) => state.chatMessages.chatId);
  const chats = useAppSelector((state) => state.userChats.chats);
  const user = useAppSelector((state) => state.auth.user);

  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentChatData = chats.find((chat) => chat.chatId === chatId);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    event.preventDefault();
    if (message.trim() && user && user.uid && chatId && currentChatData) {
      dispatch(sendMessage(chatId, user.uid, message));
      setLastMessageToUserChat(user.uid, chatId, message);
      setLastMessageToUserChat(currentChatData.receiverId, chatId, message);
      console.log("Message sent:", message);
    }
    setMessage("");
  };

  const handleEmojiClick = (event: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
  };

  return (
    <form onSubmit={handleSubmit} className={`${classes.form} ${className}`}>
      <div className={classes.icon}>
        <img src={image} alt="image" />
      </div>
      <div
        className={classes.emoji}
        onClick={() => setOpenEmoji((prevState) => !prevState)}
      >
        <div className={classes.picker}>
          <EmojiPicker open={openEmoji} onEmojiClick={handleEmojiClick} />
        </div>
        <img src={emojiImg} alt="emoji" />
      </div>
      <input
        placeholder="massage"
        value={message}
        onChange={handleChange}
        type="text"
        className={classes.input}
        ref={inputRef}
      />
      <button type="submit" className={classes.btn} disabled={!message}>
        <img src={sendImg} alt="send icon" />
      </button>
    </form>
  );
};

export default MessageInput;
