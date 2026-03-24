import { Link, useLocation } from "react-router";

import classes from "./Header.module.css";
import logo from "../../assets/logo.svg";
import BlueButton from "../UI/BlueButton/BlueButton";
import { auth } from "../../firebase/firebase-config";
import { logOut } from "../../firebase/firebaseAuth";
import defaultAvatar from "../../assets/default-avatar2.jpg";

export default function Header() {
  const { pathname } = useLocation();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes["logo-area"]}>
        <img src={logo} alt="logo" />
        <h1>Chat app</h1>
      </div>
      <nav>
        <ul className={classes["nav-links"]}>
          {pathname === "/sign-up" && (
            <li>
              <Link to="log-in">
                <button className={classes["log-in-button"]}>Log in</button>
              </Link>
            </li>
          )}
          {pathname === "/log-in" && (
            <li>
              <Link to="sign-up">
                <BlueButton className={classes["sign-up-button"]}>
                  Sign up
                </BlueButton>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <BlueButton onClick={handleLogOut}>log out</BlueButton>
      <button
        onClick={() => {
          console.log(auth.currentUser);
        }}
      >
        console.log(auth.currentUser)
      </button>
      <button className={classes.profile}>
        <img src={defaultAvatar} alt={`avatar img`} />
      </button>
    </header>
  );
}
