import { FormEvent, useState } from "react";

import classes from "./SidebarHeader.module.css"

import plusIcon from "../../assets/plus-icon.svg";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import {
  addChatToUser,
  createDirect,
  getUserIdByEmail,
} from "../../firebase/firebaseAuth";

const ChatHeader = () => {
  const [email, setEmail] = useState("");

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!email.trim()) {
      const userId = await getUserIdByEmail(email.trim());

      if (userId == null) {
        return;
      }

      const chatId = await createDirect([auth.currentUser!.uid, userId]);

      if (chatId == null) {
        return;
      }

      await addChatToUser(auth.currentUser!.uid, chatId);
      await addChatToUser(userId, chatId);

      console.log(chatId);
    }

    setEmail(" ");
  };
  return (
    <form onSubmit={handleOnSubmit} className={classes.form}>
      <h3 className={classes.title}>Chats</h3>
      <div className={classes.box}>
        <input
          type="email"
          className={classes.input}
          placeholder="Enter email to add chat"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button className={classes.button}>
          <img className={classes.img} src={plusIcon} alt="add chat" />
        </button>
      </div>
    </form>
  );
};

export default ChatHeader;
