import classes from "./ChatItem.module.css";

export default function ChatItem({ name, text, img }) {
  return (
    <div className={classes["chat-item"]}>
      <img src={img} alt={`${name} img`} />
      <div className={classes["text"]}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
