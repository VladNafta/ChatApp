import Input from "../UI/Input/Input";
import classes from "./LogIn.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { auth } from "../../firebase";

export default function LogIn() {
  const [error, setError] = useState({});

  function handleSubmitForm(event) {
    event.preventDefault();

    setError({});

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password.length <= 7) {
      setError({
        ...prevState,
        password: "Password must be at least 8 characters long!",
      });
      return;
    }

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (  
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
  );
}
