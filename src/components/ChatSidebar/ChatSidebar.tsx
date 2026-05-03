import defaultAvatar from "../../assets/default-avatar2.jpg";
import ChatItem from "../ChatItem/ChatItem";
import SidebarHeader from "../SidebarHeader/SidebarHeader";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import {
  setChatId,
  setChatType,
} from "../../store/chat-messages/chat-messages-slice";
import { subscribeToUserChats } from "../../store/user-chats/user-chats-actions";
import { ChatType } from "../../types/dbTypes";
import ChatItemCheckbox from "../UI/ChatItemCheckbox/ChatItemCheckbox";
import classes from "./ChatSidebar.module.css";

interface ChatSidebarProps {
  className: string;
}

const ChatSidebar = ({ className = "" }: ChatSidebarProps) => {
  const [show, setShow] = useState<"group" | "direct" | "actions" | "">("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const chats = useAppSelector((state) => state.userChats.chats);
  const chatsLoading = useAppSelector((state) => state.userChats.loading);
  const chatId = useAppSelector((state) => state.chatMessages.chatId);
  const user = useAppSelector((state) => state.auth.user);
  const chatMessagesLoading = useAppSelector(
    (state) => state.chatMessages.loading
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = dispatch(subscribeToUserChats(user.uid));

    return () => unsubscribe();
  }, [user]);

  const handleChatSelect = (newChatId: string, chatType: ChatType) => {
    if (chatId === newChatId && !chatMessagesLoading) {
      dispatch(setChatId(null));
      return;
    }
    setShow("");
    dispatch(setChatId(newChatId));
    dispatch(setChatType(chatType));
  };

  const handleUserSelectForGroup = (participants: string[]) => {
    if (!user) return;
    const newUserId = participants.find((userId) => user.uid !== userId);
    if (!newUserId) return;

    setSelectedUsers((prev) => {
      if (prev.includes(newUserId))
        return prev.filter((id) => id !== newUserId);
      else if (!prev.includes(newUserId)) return [...prev, newUserId];
      else return prev;
    });
  };

  return (
    <aside className={`${classes.aside} ${className}`}>
      <SidebarHeader
        show={show}
        setShow={setShow}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
      <ul className={classes.ul}>
        <ClipLoader
          cssOverride={{
            margin: "0 auto",
          }}
          size={16}
          color="#363f54"
          loading={chatsLoading}
        />
        {chats.map((chat) => {
          if (show === "group" && chat.chatType === ChatType.DIRECT)
            return (
              <ChatItemCheckbox
                key={chat.chatId}
                onClick={() => handleUserSelectForGroup(chat.participants)}
                isSelected={selectedUsers.includes(
                  user
                    ? chat.participants.find((userId) => user.uid !== userId) ||
                        ""
                    : ""
                )}
              >
                <ChatItem
                  chatId={chat.chatId}
                  selectedChatId={chatId}
                  src={chat.photoURL ?? defaultAvatar}
                  name={chat.name}
                  text={chat.lastMessage}
                  updatedAt={chat.updatedAt}
                />
              </ChatItemCheckbox>
            );
          else
            return (
              <ChatItem
                chatId={chat.chatId}
                selectedChatId={chatId}
                onClick={
                  !(show === "group")
                    ? () => handleChatSelect(chat.chatId, chat.chatType)
                    : undefined
                }
                src={chat.photoURL ?? defaultAvatar}
                name={chat.name}
                text={chat.lastMessage}
                updatedAt={chat.updatedAt}
                key={chat.chatId}
              />
            );
        })}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
