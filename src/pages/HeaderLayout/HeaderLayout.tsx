import { Outlet, useLocation, useNavigate } from "react-router";
import classes from "./HeaderLayout.module.css";

import { useEffect, useLayoutEffect } from "react";
import Header from "../../components/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { watchAuthState } from "../../store/auth/auth-actions";
import { setVerificationMessage } from "../../store/auth/auth-slice";
import { subscribeToUserData } from "../../store/user/user-actions";

const HeaderLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const verificationMessage = useAppSelector(
    (state) => state.auth.verificationMessage
  );

  const userIdAuth = useAppSelector((state) => state.auth.user?.uid);

  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = dispatch(watchAuthState());

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userIdAuth) return;
    const unsubscribe = dispatch(subscribeToUserData(userIdAuth));

    return () => unsubscribe();
  }, [userIdAuth]);

  useLayoutEffect(() => {
    if (!loading && !!user?.emailVerified) {
      navigate("/chat");
    } else if (!loading && !user && pathname == "/chat") {
      navigate("/log-in");
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
      <Modal
        open={!!verificationMessage}
        text={verificationMessage}
        buttonText="Ok"
        onClose={() => {
          if (pathname == "/sign-up") navigate("/log-in");
          dispatch(setVerificationMessage(""));
        }}
      />
    </div>
  );
};

export default HeaderLayout;
