import { Link, useLocation } from "react-router";

import defaultAvatar from "../../assets/default-avatar2.jpg";
import logo from "../../assets/logo.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { logOut } from "../../store/auth/auth-actions";
import classes from "./Header.module.css";

export default function Header() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogOut = () => {
    dispatch(logOut());
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
              <Link to="/log-in">
                <button className={classes["log-in-button"]}>Log in</button>
              </Link>
            </li>
          )}
          {pathname === "/log-in" && (
            <li>
              <Link to="/sign-up">
                <button className={classes["sign-up-button"]}>Sign up</button>
              </Link>
            </li>
          )}
          {pathname === "/chat" && (
            <>
              <li>
                <button
                  className={classes["log-out-button"]}
                  onClick={handleLogOut}
                >
                  log out
                </button>
              </li>
              <button className={classes.profile}>
                <img src={defaultAvatar} alt={`avatar img`} />
              </button>
            </>
          )}
        </ul>
      </nav>

      {/* <button
        onClick={() => {
          console.log(auth.currentUser);
        }}
      >
        console.log(auth.currentUser)
      </button>
      <button
        onClick={() => {
          console.log(user);
        }}
      >
        console.log(user)
      </button> */}
    </header>
  );
}
