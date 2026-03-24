import { useState } from "react";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import Header from "../../components/Header/Header";
import ChatArea from "../../components/ChatArea/ChatArea";
import MessageInput from "../../components/MessageInput/MessageInput";
import classes from "./Chat.module.css";

const ChatPage = () => {
  return (
    <div className={`container ${classes["chat-page"]}`}>
      <Header />
      <div className={classes.chat}>
        <ChatSidebar className={classes.sidebar} />
        <div className={classes.messages}>
          <ChatArea />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
