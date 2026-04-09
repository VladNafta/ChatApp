import { FormEvent, useState } from "react";

import classes from "./SidebarHeader.module.css";

import plusIcon from "../../assets/plus-icon.svg";
import { getUserIdByEmail } from "../../firebase/firebase-user";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { addChatToUsers } from "../../store/user-chats/user-chats-actions";

const ChatHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log(user);
    
    if (user === null || !email.trim()) {
      return;
    }

    const newUserId = await getUserIdByEmail(email.trim());

    if (newUserId === null) {
      return;
    }

    await dispatch(addChatToUsers(user.uid, newUserId));

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
