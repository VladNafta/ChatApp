import Error from "../Error/Error.js";
import cssClass from "./Input.module.css";

interface InputsProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  error: { [key: string]: string };
}

const Inputs = ({ id, name, type, label, placeholder, error }: InputsProps) => {
  return (
    <div className={cssClass["input-container"]}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required
      />
      {error[name] && <Error message={error[name]} />}
    </div>
  );
};

export default Inputs;
