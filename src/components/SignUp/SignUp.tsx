import { FormEvent, useState } from "react";
import AuthForm from "../AuthForm/AuthForm.jsx";
import Input from "../UI/Input/Input.jsx";
import classes from "./SignUp.module.css";

import { useAppDispatch } from "../../hooks/redux-custom-hooks.js";
import { createUserWithEmail } from "../../store/auth/auth-actions.js";

interface ErrorState {
  [key: string]: string;
}

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorState>({});

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError({});

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };

    if (data.password !== data["confirm-password"]) {
      setError({
        password: "The password does not match",
        "confirm-password": "The confirm-password does not match",
      });
      return;
    }

    if (data.password.length <= 7) {
      setError({
        password: "Password must be at least 8 characters long!",
        "confirm-password": "Password must be at least 8 characters long!",
      });
      return;
    }
    dispatch(
      createUserWithEmail({
        email: data.email,
        password: data.password,
      })
    );
  }

  return (
    <>
      <AuthForm
        className={classes.form}
        title="Sign up your account"
        descriptions="Welcome! Please enter your details."
        textSubmitBtn="Sign up"
        onSubmit={handleSubmitForm}
        offerText="Do you have an account?"
        offerButtonText="Log in"
        offerLink="/log-in"
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
        <Input
          id="confirm-password"
          name="confirm-password"
          label="Confirm password"
          type="password"
          placeholder="Confirm password here"
          error={error}
        />
      </AuthForm>
    </>
  );
};

export default SignUp;
