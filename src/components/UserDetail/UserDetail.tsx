import { useState } from "react";
import classes from "./UserDetail.module.css";

interface UserDetailProps {
  userName: string;
  avatarSrc: string;
  description: string;
}

const UserDetail = ({ userName, avatarSrc, description }: UserDetailProps) => {
  const [userNameState, setUserNameState] = useState(userName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserNameState(event.target.value);
  }

  let editableNameField = <p className={classes.userName}>{userNameState}</p>;

  if (isEditing) {
    editableNameField = (
      <input
        type="text"
        required
        value={userNameState}
        onChange={handleChange}
      />
    );
  }
  return (
    <div className={classes.dialog}>
      <main className={classes.main}>
        <div className={classes["edit"]}>
          <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </div>
        <div className={classes.avatarImg}>
          <img src={avatarSrc} alt="avatar" />
        </div>
        {editableNameField}
        <p className={classes.description}>{description}</p>
      </main>
    </div>
  );
};

export default UserDetail;
