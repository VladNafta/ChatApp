import addIcon from "../../../assets/add-icon.svg";
import classes from "./ChatHeaderForm.module.css";

interface ChatHeaderFormProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  type: "email" | "text"
}

const ChatHeaderForm = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  type
}: ChatHeaderFormProps) => {
  return (
    <form onSubmit={onSubmit} className={classes["form"]}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button>
        <img src={addIcon} alt="add" />
      </button>
    </form>
  );
};

export default ChatHeaderForm;
