import { ChangeEvent, FormEvent, useRef, useState } from "react";
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
  const userAuth = useAppSelector((state) => state.auth.user);
  const user = useAppSelector((state) => state.user.user);

  const [message, setMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const currentChatData = chats.find((chat) => chat.chatId === chatId);
  const receiverId = currentChatData?.participants.find(
    (id) => userAuth?.uid !== id
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    event.preventDefault();
    if (
      message.trim() &&
      user &&
      user.name &&
      user.photoURL &&
      userAuth &&
      userAuth.uid &&
      chatId &&
      currentChatData &&
      receiverId
    ) {
      dispatch(
        sendMessage(chatId, userAuth.uid, user.name, user.photoURL, message)
      );
      setLastMessageToUserChat(userAuth.uid, chatId, message);
      setLastMessageToUserChat(receiverId, chatId, message);
      console.log("Message sent:", message);
    }
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className={`${classes.form} ${className}`}>
      {/* <div className={classes.icon}>
        <img src={image} alt="image" />
      </div> */}
      <input
        placeholder="message"
        value={message}
        onChange={handleChange}
        type="text"
        className={classes.input}
        ref={inputRef}
      />
      <button type="submit" className={classes.btn}>
        <img src={sendImg} alt="send icon" />
      </button>
    </form>
  );
};

export default MessageInput;
