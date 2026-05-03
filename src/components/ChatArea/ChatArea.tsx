import { useEffect, useMemo, useRef } from "react";
import { ClipLoader } from "react-spinners";
import defaultAvatar from "../../assets/default-avatar2.jpg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import {
  downloadPrevMessages,
  subscribeToChatMessages,
} from "../../store/chat-messages/chat-messages-actions";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageInput from "../MessageInput/MessageInput";
import GroupMessageItem from "../UI/GroupMessageItem/GroupMessageItem";
import MessageItem from "../UI/MessageItem/MessageItem";
import classes from "./ChatArea.module.css";

const ChatArea = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.userChats.chats);
  const user = useAppSelector((state) => state.auth.user);
  const messages = useAppSelector((state) => state.chatMessages.messages);
  const lastDocId = useAppSelector((state) => state.chatMessages.lastDocId);
  const messagesLoading = useAppSelector((state) => state.chatMessages.loading);
  const chatId = useAppSelector((state) => state.chatMessages.chatId);

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

    const unsubscribe = dispatch(subscribeToChatMessages(chatId));

    return () => unsubscribe();
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
              if (user?.uid !== message.senderId)
                return (
                  <GroupMessageItem
                    senderName={message.senderName}
                    isPhotoShow={array[index+1]?.senderId !== message.senderId}
                    isNameShow={array[index-1]?.senderId !== message.senderId}
                    src={message.senderPhotoURL}
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
                    src={message.senderPhotoURL}
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
