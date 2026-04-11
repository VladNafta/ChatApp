import { useEffect, useRef } from "react";
import { setLastMessageToUserChat } from "../../firebase/firebase-chat";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { subscribeToChatMessages } from "../../store/chat-messages/chat-messages-actions";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageInput from "../MessageInput/MessageInput";
import MessageItem from "../UI/MessageItem/MessageItem";
import classes from "./ChatArea.module.css";

const ChatArea = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.userChats.chats);
  const user = useAppSelector((state) => state.auth.user);
  const messages = useAppSelector((state) => state.chatMessages.messages);
  const chatId = useAppSelector((state) => state.chatMessages.chatId);

  const currentChatData = chats.find((chat) => chat.chatId === chatId);

  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = dispatch(subscribeToChatMessages(chatId));

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "auto" });
    }
    if (user && chatId && messages.length > 0) {
      setLastMessageToUserChat(
        user.uid,
        chatId,
        "",
        // String(currentChatData?.lastMessage)
      );
    }
  }, [messages]);

  return (
    <main className={`${classes.main} ${className}`}>
      {chatId && (
        <>
          <ChatHeader
            name={currentChatData!.userName}
            description="lorem lorem lorem"
          />
          <ul className={classes.ul}>
            {messages.map((item, index) => (
              <MessageItem
                isSenderMessage={user?.uid !== item.senderId}
                key={item.createdAt}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                text={item.text}
                createdAt={item.createdAt}
              />
            ))}
          </ul>
          <MessageInput className={classes.input} />
        </>
      )}
      {!chatId && (
        <h2 className={classes["no-select-chat"]}>Please select chat</h2>
      )}
    </main>
  );
};

export default ChatArea;
