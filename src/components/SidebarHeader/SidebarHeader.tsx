import { FormEvent, useState } from "react";

import classes from "./SidebarHeader.module.css";

import closeIcon from "../../assets/close-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import { getUserIdByEmail } from "../../firebase/firebase-user";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { setChatId } from "../../store/chat-messages/chat-messages-slice";
import {
  addNewDirectChatToUsers,
  addNewGroupChatToUsers,
} from "../../store/user-chats/user-chats-actions";
import ChatHeaderForm from "../UI/ChatHeaderForm/ChatHeaderForm";

interface SidebarHeaderProps {
  show: string;
  setShow: (
    value: React.SetStateAction<"group" | "direct" | "actions" | "">
  ) => void;
  selectedUsers: string[];
  setSelectedUsers: (value: React.SetStateAction<string[]>) => void;
}

const SidebarHeader = ({
  show,
  setShow,
  selectedUsers,
  setSelectedUsers,
}: SidebarHeaderProps) => {
  const [enteredValue, setEnteredValue] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleAddNewDirectChat = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user === null || !enteredValue.trim()) {
      return;
    }

    const newUserId = await getUserIdByEmail(enteredValue.trim());

    if (newUserId === null) {
      return;
    }

    await dispatch(addNewDirectChatToUsers(user.uid, newUserId));

    setEnteredValue(" ");
  };

  const handleAddNewGroupChat = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user === null || !enteredValue.trim()) {
      return;
    }
    const participants = [user.uid, ...selectedUsers];

    await dispatch(
      addNewGroupChatToUsers(user.uid, participants, null, enteredValue)
    );

    setShow("");
    setEnteredValue(" ");
  };

  const handleSelectActionClick = () => {
    dispatch(setChatId(null));
    setShow((prev) => {
      if (prev !== "") {
        setEnteredValue("");
        setSelectedUsers([]);
        return "";
      } else {
        return "actions";
      }
    });
  };

  const handleDirectClick = () => {
    setShow("direct");
  };

  const handleGroupClick = () => {
    setShow("group");
  };

  return (
    <header className={classes.header}>
      <div className={classes["top-box"]}>
        <h3 className={classes.title}>Chats</h3>
        <button
          onClick={handleSelectActionClick}
          className={classes["select-action-btn"]}
        >
          <img src={show === "" ? editIcon : closeIcon} alt="add" />
        </button>
      </div>
      {show === "actions" && (
        <div className={classes.buttons}>
          <button onClick={handleDirectClick} className={classes["add-button"]}>
            Add direct
          </button>
          <button onClick={handleGroupClick} className={classes["add-button"]}>
            Create group
          </button>
        </div>
      )}
      {show === "direct" && (
        <ChatHeaderForm
          placeholder="Enter email to add chat"
          value={enteredValue}
          onChange={(event) => setEnteredValue(event.target.value)}
          onSubmit={handleAddNewDirectChat}
          type="email"
        />
      )}
      {show === "group" && (
        <ChatHeaderForm
          placeholder="Enter group name"
          value={enteredValue}
          onChange={(event) => setEnteredValue(event.target.value)}
          onSubmit={handleAddNewGroupChat}
          type="text"
        />
      )}
    </header>
  );
};

export default SidebarHeader;
