import { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import {
  downloadPrevMessages,
  subscribeToChatMessages,
} from "../../store/chat-messages/chat-messages-actions";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageInput from "../MessageInput/MessageInput";
import MessageItem from "../UI/MessageItem/MessageItem";
import classes from "./ChatArea.module.css";

const ChatArea = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.userChats.chats);
  const user = useAppSelector((state) => state.auth.user);
  const messages = useAppSelector((state) => state.chatMessages.messages);
  const lastDocId = useAppSelector((state) => state.chatMessages.lastDocId);
  const prevMessagesLoading = useAppSelector(
    (state) => state.chatMessages.loading
  );
  const chatId = useAppSelector((state) => state.chatMessages.chatId);

  const currentChatData = chats.find((chat) => chat.chatId === chatId);
  const isDownloadedNewMessageRef = useRef(false);

  const firstMessageRef = useRef<HTMLLIElement>(null);
  const prevFirstMessageRef = useRef<HTMLLIElement>(null);
  const lastMessageRef = useRef<HTMLLIElement>(null);

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
        if (entries[0].isIntersecting && !prevMessagesLoading) {
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
            name={String(currentChatData?.userName)}
            description="lorem lorem lorem"
          />
          <ClipLoader
            cssOverride={{
              position: "absolute",
              left: "50%",
              top: "4rem",
            }}
            size={16}
            color="#363f54"
            loading={prevMessagesLoading}
          />
          <ul className={classes.ul} onScroll={(e) => e.preventDefault()}>
            {messages.map((item, index) => {
              prevFirstMessageRef.current = firstMessageRef.current;
              return (
                <MessageItem
                  isSenderMessage={user?.uid !== item.senderId}
                  key={item.createdAt}
                  ref={
                    index === 0
                      ? firstMessageRef
                      : index === messages.length - 1
                      ? lastMessageRef
                      : null
                  }
                  text={item.text}
                  createdAt={item.createdAt}
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
