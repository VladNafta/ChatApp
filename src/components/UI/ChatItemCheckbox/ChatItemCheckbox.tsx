import classes from "./ChatItemCheckbox.module.css";

interface ChatItemCheckboxProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const ChatItemCheckbox = ({
  children,
  isSelected,
  onClick,
}: ChatItemCheckboxProps) => {
  const spanClassName: string = isSelected ? classes.selected : "";
  return (
    <div className={classes.box} onClick={onClick}>
      <span className={spanClassName}></span>
      {children}
    </div>
  );
};

export default ChatItemCheckbox;
