import { FormEvent, useState } from "react";
import Input from "../UI/Input/Input.jsx";
// import classes from "./SignUp.module.css";
import AuthForm from "../AuthForm/AuthForm.jsx";
// import { FirebaseError } from "firebase/app";

import googleIcon from "../../assets/google-icon.svg";
import SocialMedia from "../SocialMedia/SocialMedia";
import {
  createUserWithEmail,
  logInWithGoogle,
} from "../../firebase/firebaseAuth.js";

interface ErrorState {
  [key: string]: string;
}

const SignUp = () => {
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

    createUserWithEmail({ email: data.email, password: data.password });
  }

  const handleLogInWithGoogle = () => {
    logInWithGoogle();
  };

  return (
    <>
      <AuthForm
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
      <SocialMedia
        onClick={handleLogInWithGoogle}
        src={googleIcon}
        alt="google"
      />
    </>
  );
};

export default SignUp;
