import { Link } from "react-router";

import SocialMedia from "../SocialMedia/SocialMedia";
import classes from "./AuthForm.module.css";

import googleIcon from "../../assets/google-icon.svg";
import { useAppDispatch } from "../../hooks/redux-custom-hooks";
import { logInWithGoogle } from "../../store/auth/auth-actions";

interface AuthFormProps {
  className?: string;
  title: string;
  descriptions: string;
  textSubmitBtn: string;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  offerText: string;
  offerButtonText: string;
  offerLink: string;
}

const AuthForm = ({
  title,
  descriptions,
  textSubmitBtn,
  children,
  onSubmit,
  offerText,
  offerButtonText,
  offerLink,
  className = "",
}: AuthFormProps) => {
  const dispatch = useAppDispatch();

  const handleLogInWithGoogle = async () => {
    dispatch(logInWithGoogle());
  };
  return (
    <form
      className={`${classes["auth-form"]} ${className} container`}
      onSubmit={onSubmit}
    >
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.descriptions}>{descriptions}</p>
      <div className={classes.inputs}>{children}</div>
      <button className={classes["submit-button"]}>{textSubmitBtn}</button>
      <div className={classes.or}>
        <div className={classes.line}></div>
        <span>OR</span>
        <div className={classes.line}></div>
      </div>
      <SocialMedia
        type={"button"}
        className={classes.google}
        onClick={handleLogInWithGoogle}
        src={googleIcon}
        alt="google"
      />
      <div className={classes.offer}>
        <p>{offerText}</p>
        <Link to={offerLink} type="button">
          {offerButtonText}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
