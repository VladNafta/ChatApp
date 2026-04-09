import defaultAvatar from "../../assets/default-avatar2.jpg";
import ChatItem from "../ChatItem/ChatItem";
import ChatHeader from "../SidebarHeader/SidebarHeader";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { setChatId } from "../../store/chat-messages/chat-messages-slice";
import { subscribeToUserChats } from "../../store/user-chats/user-chats-actions";
import classes from "./ChatSidebar.module.css";

type UserChatsType = {
  chatId: string;
  email: string;
  lastMessage: string;
  updatedAt: string;
  isSeen: boolean;
};

interface ChatSidebarProps {
  className: string;
}

const ChatSidebar = ({ className = "" }: ChatSidebarProps) => {
  const chats = useAppSelector((state) => state.userChats.chats);
  const chatId = useAppSelector((state) => state.chatMessages.chatId);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const [chatsToDisplay, setChatsToDisplay] = useState<UserChatsType[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = dispatch(subscribeToUserChats(user.uid));

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const convertUserChats = async () => {
      if (chats.length === 0) return;

      try {
        const newChats = await Promise.all(
          chats.map(async (chat) => {
            const userDocRef = doc(db, "users", chat.receiverId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
              return null;
            }

            const userData = userDoc.data();
            const userEmail: string = userData.email;

            return {
              chatId: chat.chatId,
              email: userEmail,
              lastMessage: chat.lastMessage,
              updatedAt: chat.updatedAt,
              isSeen: chat.isSeen,
            };
          })
        );
        setChatsToDisplay(newChats.filter((chat) => chat !== null));
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    };

    convertUserChats();
  }, [user, chats]);

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
        {chatsToDisplay.map((chat) => (
          <ChatItem
            chatId={chat.chatId}
            selectedChatId={chatId}
            onClick={() => handleChatClick(chat.chatId)}
            src={defaultAvatar}
            name={chat.email}
            text={chat.lastMessage}
            className={classes.li}
            key={chat.chatId}
          />
        ))}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
