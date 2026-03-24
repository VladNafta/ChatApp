import Input from "../UI/Input/Input";
import { FormEvent, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
// import ExtraAuthOptions from "../ExtraAuthOptions/ExtraAuthOptions";

import googleIcon from "../../assets/google-icon.svg";
import SocialMedia from "../SocialMedia/SocialMedia";
import {
  logInWithGoogle,
  signInUserWithEmail,
} from "../../firebase/firebaseAuth";

const LogIn = () => {
  const [error, setError] = useState({});

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

    signInUserWithEmail({ email: data.email, password: data.password });
  };

  const handleLogInWithGoogle = () => {
    logInWithGoogle();
  };

  return (
    <>
      <AuthForm
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
      <SocialMedia
        onClick={handleLogInWithGoogle}
        src={googleIcon}
        alt="google"
      />
    </>
  );
};

export default LogIn;
