// import { useEffect } from "react";
import defaultAvatar from "../../assets/default-avatar2.jpg";
import ChatHeader from "../SidebarHeader/SidebarHeader";
import ChatItem from "../ChatItem/ChatItem";

import classes from "./ChatSidebar.module.css";
// import { getUserChats } from "../../firebase/firebaseAuth";
// import { auth } from "../../firebase/firebase-config";

let usersArray: { id: string; src: string; name: string; text: string }[] = [];

for (let i = 0; i < 15; i++) {
  usersArray.push({
    id: String(Math.random()),
    src: defaultAvatar,
    name: "Christopher Campbell",
    text: "In front of the Bar, about which you can see a lot of people",
  });
}

const ChatSidebar = ({ className = "" }) => {
  return (
    <aside className={`${classes.aside} ${className}`}>
      <ChatHeader />
      <ul className={classes.ul}>
        {usersArray.map((user) => (
          <li className={classes.li} key={user.id}>
            <ChatItem src={user.src} name={user.name} text={user.text} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
