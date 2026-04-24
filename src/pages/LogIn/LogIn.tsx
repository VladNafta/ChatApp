import { FormEvent, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import Input from "../../components/UI/Input/Input";

import { useAppDispatch } from "../../hooks/redux-custom-hooks";
import { signInUserWithEmail } from "../../store/auth/auth-actions";
import { setVerificationMessage } from "../../store/auth/auth-slice";
import { store } from "../../store/store";
import classes from "./LogIn.module.css";

const LogIn = () => {
  const [error, setError] = useState({});
  const dispatch = useAppDispatch();

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError({});

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };

    if (data.password.length <= 7) {
      setError({
        password: "Password must be at least 8 characters long!",
      });
      return;
    }
    await dispatch(
      signInUserWithEmail({
        email: data.email,
        password: data.password,
      })
    );
    
    const authError = store.getState().auth.error;
    const user = store.getState().auth.user;

    if (user?.email === data.email && !user?.emailVerified && !authError)
      dispatch(setVerificationMessage("Your email is not confirmed."));
  };

  return (
    <>
      <AuthForm
        className={classes.form}
        title="Log in to your account"
        descriptions="Welcome back! Please enter your details."
        textSubmitBtn="Sign in"
        onSubmit={handleSubmitForm}
        offerText="Don’t have an account?"
        offerButtonText="Sign up"
        offerLink={"/sign-up"}
      >
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="exampl@gmail.com"
          error={error}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password here"
          error={error}
        />
      </AuthForm>
    </>
  );
};

export default LogIn;
