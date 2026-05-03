import backArrow from "../../assets/back-arrow.png";
import infoIcon from "../../assets/info-icon.svg";
import { useAppDispatch } from "../../hooks/redux-custom-hooks";
import { setChatId } from "../../store/chat-messages/chat-messages-slice";

import classes from "./ChatHeader.module.css";

interface MessagesHeaderProps {
  name: string;
  description: string;
  src: string;
  className?: string;
}

const ChatsHeader = ({ name, description, src, className }: MessagesHeaderProps) => {
  const dispatch = useAppDispatch();

  const handleBackToSidebar = () => {
    dispatch(setChatId(null));
  };

  return (
    <div className={`${classes.header} ${className}`}>
      <button
        onClick={handleBackToSidebar}
        className={classes["back-button"]}
        aria-label="Go back"
      >
        <img
          className={classes["back-arrow"]}
          src={backArrow}
          alt="Back arrow"
        />
      </button>
      <div className={classes.box}>
        <img className={classes.avatar} src={src} alt="avatar" />
        <div className={classes.text}>
          <h3>{name}</h3>
          {/* <p>{description}</p> */}
        </div>
      </div>
      {/* <img className={classes["info-icon"]} src={infoIcon} alt="info icon" /> */}
    </div>
  );
};

export default ChatsHeader;
