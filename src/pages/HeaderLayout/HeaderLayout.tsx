import { Outlet } from "react-router";

import Header from "../../components/Header/Header";
import classes from "./HeaderLayout.module.css";

const HeaderLayout = () => {
  return (
    <div className="container">
      <Header />

      {/* <main className={classes.main}>
      </main> */}
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
