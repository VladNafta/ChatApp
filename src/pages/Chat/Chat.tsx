import ChatArea from "../../components/ChatArea/ChatArea";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import classes from "./Chat.module.css";

const ChatPage = () => {
  return (
    <div className={`${classes["chat-page"]}`}>
      <ChatSidebar className={classes.sidebar} />
      <ChatArea className={classes.messages} />
    </div>
  );
};

export default ChatPage;
