import classes from "./GroupMessageItem.module.css";

interface GroupMessageItemProps {
  text: string;
  senderName: string;
  isPhotoShow: boolean;
  isNameShow: boolean;
  src: string;
  className?: string;
  ref: React.Ref<HTMLLIElement>;
  createdAt: number;
}

const GroupMessageItem = ({
  text,
  senderName,
  src,
  isPhotoShow,
  isNameShow,
  className = "",
  ref,
  createdAt,
}: GroupMessageItemProps) => {
  const date = new Date(createdAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  let messageClass = `${classes.message} ${className}`;
  if (!isPhotoShow) {
    messageClass += classes["your-prev-message"];
  }

  return (
    <li ref={ref} className={messageClass}>
      {isPhotoShow && <img src={src} alt="avatar" />}
      <div className={classes.content}>
        {isNameShow && <p className={classes["name"]}>{senderName}</p>}
        <p className={classes.text}>{text}</p>
        <p className={classes.time}>{`${hours}:${minutes}`}</p>
      </div>
    </li>
  );
};

export default GroupMessageItem;
