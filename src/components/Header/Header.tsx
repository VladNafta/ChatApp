import { Outlet, Link, useLocation } from "react-router";

import classes from "./Header.module.css";
import logo from "../../assets/logo.svg";
import BlueButton from "../UI/BlueButton/BlueButton";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <div className="container">
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
      </header>
      {/* <main className={classes.main}>
      </main> */}
      <Outlet />
    </div>
  );
}
