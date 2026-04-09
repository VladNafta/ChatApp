import { Outlet, useLocation, useNavigate } from "react-router";
import classes from "./HeaderLayout.module.css";

import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { watchAuthState } from "../../store/auth/auth-actions";

const HeaderLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const unsubscribe = dispatch(watchAuthState());

    return () => unsubscribe();
  }, []);

  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && !user && pathname !== "/sign-up") {
      navigate("/log-in");
    } else if (user) {
      navigate("/chat");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="container">
        <Header />
        <h1 className={classes.loading}>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      <Outlet />
    </div>
  );
};

export default HeaderLayout;
