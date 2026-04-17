import ChatArea from "../../components/ChatArea/ChatArea";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import { useAppSelector } from "../../hooks/redux-custom-hooks";
import classes from "./Chat.module.css";

const ChatPage = () => {
  const chatId = useAppSelector((state) => state.chatMessages.chatId);

  return (
    <div className={`${classes["chat-page"]}`}>
      <ChatSidebar
        className={`${classes.sidebar} ${
          chatId ? classes["hidden-mobile"] : ""
        }`}
      />
      <ChatArea
        className={`${classes.messages} ${
          !chatId ? classes["hidden-mobile"] : ""
        }`}
      />
    </div>
  );
};

export default ChatPage;
