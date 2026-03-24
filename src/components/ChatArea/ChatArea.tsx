import { useEffect, useRef, useState } from "react";
import MessageItem from "../UI/MessageItem/MessageItem";
import classes from "./ChatArea.module.css";
import MessageInput from "../MessageInput/MessageInput";
import ChatHeader from "../ChatHeader/ChatHeader";

// interface MessagesAreaProps {
//   messages: {
//     id: string;
//     text: string;
//   }[];
// }

interface Message {
  id: string;
  text: string;
}

const ChatArea = () => {
  const lastMessageRef = useRef<HTMLLIElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const handleAddMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <main className={classes.main}>
      <ChatHeader name="Vlad" description="lorem lorem lorem lorem" />
      <ul className={classes.ul}>
        {messages.map((item, index) => (
          <li
            className={classes.li}
            key={item.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <MessageItem text={item.text} />
          </li>
        ))}
      </ul>
      <MessageInput className={classes.input} addMessage={handleAddMessage} />
    </main>
  );
};

export default ChatArea;
