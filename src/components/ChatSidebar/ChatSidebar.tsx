import defaultAvatar from "../../assets/default-avatar2.jpg";
import ChatItem from "../ChatItem/ChatItem";
import ChatHeader from "../SidebarHeader/SidebarHeader";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { setChatId } from "../../store/chat-messages/chat-messages-slice";
import { subscribeToUserChats } from "../../store/user-chats/user-chats-actions";
import classes from "./ChatSidebar.module.css";

interface ChatSidebarProps {
  className: string;
}

const ChatSidebar = ({ className = "" }: ChatSidebarProps) => {
  const chats = useAppSelector((state) => state.userChats.chats);
  const chatId = useAppSelector((state) => state.chatMessages.chatId);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = dispatch(subscribeToUserChats(user.uid));

    return () => unsubscribe();
  }, [user]);

  const handleChatClick = (newChatId: string) => {
    if (chatId === newChatId) {
      dispatch(setChatId(null));
      return;
    }
    dispatch(setChatId(newChatId));
  };

  return (
    <aside className={`${classes.aside} ${className}`}>
      <ChatHeader />

      <ul className={classes.ul}>
        {chats.map((chat) => (
          <ChatItem
            chatId={chat.chatId}
            selectedChatId={chatId}
            onClick={() => handleChatClick(chat.chatId)}
            src={defaultAvatar}
            name={chat.userName}
            text={chat.lastMessage}
            className={classes.li}
            updatedAt={chat.updatedAt}
            key={chat.chatId}
          />
        ))}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
