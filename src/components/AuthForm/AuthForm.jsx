import { Link } from "react-router";

import classes from "./AuthForm.module.css";
import BlueButton from "../UI/BlueButton/BlueButton";

export default function AuthForm({
  title,
  descriptions,
  textSubmitBtn,
  children,
  onSubmit,
  offerText,
  offerButtonText,
  offerLink,
}) {
  return (
    <form className={classes["auth-form"]} onSubmit={onSubmit}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.descriptions}>{descriptions}</p>
      <div className={classes.inputs}>{children}</div>
      <BlueButton className={classes["submit-button"]}>
        {textSubmitBtn}
      </BlueButton>
      <div className={classes.offer}>
        <p>{offerText}</p>
        <Link to={offerLink} type="button">
          {offerButtonText}
        </Link>
      </div>
    </form>
  );
}
