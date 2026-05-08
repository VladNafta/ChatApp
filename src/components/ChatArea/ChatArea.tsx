import { useEffect, useMemo, useRef } from "react";
import { ClipLoader } from "react-spinners";
import defaultAvatar from "../../assets/default-avatar2.jpg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import {
  downloadPrevMessages,
  getUsersInGroupChat,
  subscribeToChatMessages,
} from "../../store/chat-messages/chat-messages-actions";
import { ChatType } from "../../types/dbTypes";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageInput from "../MessageInput/MessageInput";
import GroupMessageItem from "../UI/GroupMessageItem/GroupMessageItem";
import MessageItem from "../UI/MessageItem/MessageItem";
import classes from "./ChatArea.module.css";

const ChatArea = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.userChats.chats);
  const user = useAppSelector((state) => state.auth.user);
  const {
    chatId,
    messages,
    chatType,
    users,
    lastDocId,
    loading: messagesLoading,
  } = useAppSelector((state) => state.chatMessages);

  const isDownloadedNewMessageRef = useRef(false);
  const firstMessageRef = useRef<HTMLLIElement>(null);
  const prevFirstMessageRef = useRef<HTMLLIElement>(null);
  const lastMessageRef = useRef<HTMLLIElement>(null);

  const currentChatData = useMemo(
    () => chats.find((chat) => chat.chatId === chatId),
    [chatId]
  );
  
  useEffect(() => {
    if (!chatId) return;
  
    let unsubscribe: (() => void) | undefined;
  
    (async () => {
      if (chatType === ChatType.GROUP) {
        await dispatch(getUsersInGroupChat(chatId));
      }
  
      unsubscribe = dispatch(subscribeToChatMessages(chatId));
    })();
  
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chatId]);
  

  useEffect(() => {
    if (lastMessageRef.current && !isDownloadedNewMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "auto" });
    } else if (prevFirstMessageRef.current) {
      prevFirstMessageRef.current.scrollIntoView({ behavior: "auto" });
    }
    isDownloadedNewMessageRef.current = false;
  }, [messages]);

  useEffect(() => {
    if (
      firstMessageRef.current === null ||
      chatId === null ||
      lastDocId === null
    ) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !messagesLoading) {
          dispatch(downloadPrevMessages(chatId, lastDocId));
          isDownloadedNewMessageRef.current = true;
        }
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    observer.observe(firstMessageRef.current);

    return () => {
      if (firstMessageRef.current) {
        observer.unobserve(firstMessageRef.current);
      }
    };
  }, [chatId, firstMessageRef.current, lastDocId]);

  return (
    <main key={chatId} className={`${classes.main} ${className}`}>
      {chatId && (
        <>
          <ChatHeader
            name={currentChatData?.name ?? "No one user selected"}
            description="lorem lorem lorem"
            src={currentChatData?.photoURL ?? defaultAvatar}
          />
          <ClipLoader
            cssOverride={{
              position: "absolute",
              left: "50%",
              top: "4rem",
            }}
            size={16}
            color="#363f54"
            loading={messagesLoading}
          />
          <ul className={classes.ul} onScroll={(e) => e.preventDefault()}>
            {messages.map((message, index, array) => {
              prevFirstMessageRef.current = firstMessageRef.current;
              if (user?.uid !== message.senderId && chatType === ChatType.GROUP)
                return (
                  <GroupMessageItem
                    senderName={users?.[message.senderId]?.name ?? "Unknown"}
                    isPhotoShow={
                      array[index + 1]?.senderId !== message.senderId
                    }
                    isNameShow={array[index - 1]?.senderId !== message.senderId}
                    src={users?.[message.senderId]?.name ?? defaultAvatar}
                    key={message.messageId + message.createdAt}
                    ref={
                      index === 0
                        ? firstMessageRef
                        : index === messages.length - 1
                        ? lastMessageRef
                        : null
                    }
                    text={message.text}
                    createdAt={message.createdAt}
                  />
                );
              else
                return (
                  <MessageItem
                    src={users?.[message.senderId]?.name ?? defaultAvatar}
                    isYourMessage={user?.uid === message.senderId}
                    key={message.messageId + message.createdAt}
                    ref={
                      index === 0
                        ? firstMessageRef
                        : index === messages.length - 1
                        ? lastMessageRef
                        : null
                    }
                    text={message.text}
                    createdAt={message.createdAt}
                  />
                );
            })}
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
