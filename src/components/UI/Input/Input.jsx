import Error from "../Error/Error";
import cssClass from "./Input.module.css";

export default function Inputs({ id, name, type, label, placeholder, error }) {
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
}
