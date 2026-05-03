import { Link } from "react-router";

import SocialMedia from "../SocialMedia/SocialMedia";
import classes from "./AuthForm.module.css";

import googleIcon from "../../assets/google-icon.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { logInWithGoogle } from "../../store/auth/auth-actions";
import { setError } from "../../store/auth/auth-slice";
import Modal from "../UI/Modal/Modal";

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
  const authError = useAppSelector((state) => state.auth.error);

  const handleLogInWithGoogle = async () => {
    dispatch(logInWithGoogle());
  };

  let messageText = "";
  
  switch (authError) {
    case "Firebase: Error (auth/too-many-requests).":
      messageText = "Too many requests.";
      break;
    case "Firebase: Error (auth/email-already-in-use).":
      messageText = "This account already in use.";
      break;
    case "Firebase: Error (auth/invalid-credential).":
      messageText = "Invalid credential";
      break;
    default:
      messageText = authError;
      break;
  }
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    onSubmit(event);
  };
  return (
    <>
      <form
        className={`${classes["auth-form"]} ${className} container`}
        onSubmit={handleOnSubmit}
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
      <Modal
        open={!!messageText}
        text={messageText}
        buttonText="Ok"
        onClose={() => dispatch(setError(""))}
      ></Modal>
    </>
  );
};

export default AuthForm;
