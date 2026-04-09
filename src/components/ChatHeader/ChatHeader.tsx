import defaultAvatar from "../../assets/default-avatar2.jpg";
import infoIcon from "../../assets/more-info-icon.svg";

import classes from "./ChatHeader.module.css";

interface MessagesHeaderProps {
  name: string | null;
  description: string;
  className?: string;
}

const ChatsHeader = ({ name, description, className }: MessagesHeaderProps) => {
  return (
    <div className={`${classes.header} ${className}`}>
      <div className={classes.box}>
        <img className={classes.avatar} src={defaultAvatar} alt="avatar" />
        <div className={classes.text}>
          <h3>{name === null ? "No one user selected" : name}</h3>
          <p>{description}</p>
        </div>
      </div>

      <img className={classes["info-icon"]} src={infoIcon} alt="info icon" />
    </div>
  );
};

export default ChatsHeader;
