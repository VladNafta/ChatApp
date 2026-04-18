import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase-config";
import { addUserToDB } from "../../firebase/firebase-user";
import { setChatId } from "../chat-messages/chat-messages-slice";
import { AppDispatch } from "../store";
import {
  setError,
  setLoading,
  setUser,
  setUserEmailVerified,
} from "./auth-slice";

export const watchAuthState = () => (dispatch: AppDispatch) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        console.log(user);
        dispatch(
          setUser({
            uid: user.uid,
            userName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    },
    (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.error("Помилка при підписанні на користувача: ", error.message);
    }
  );
  return unsubscribe;
};

export const logInWithGoogle = () => async (dispatch: AppDispatch) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  try {
    const response = await signInWithPopup(auth, googleProvider);

    const user = {
      userName: response.user.displayName,
      email: response.user.email,
      phoneNumber: response.user.phoneNumber,
      photoURL: response.user.photoURL,
    };

    await addUserToDB(response.user.uid, user);
  } catch (error: any) {
    dispatch(setError(String(error.message)));
    console.error("Помилка при вході через Google:", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createUserWithEmail =
  (userData: { userName: string; email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      await sendEmailVerification(response.user);
      const user = {
        userName: userData.userName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        photoURL: response.user.photoURL,
      };

      localStorage.setItem("temporalityUnconfirmedUser", JSON.stringify(user));
      alert(
        "We have sent you a confirmation email, please confirm and log in."
      );
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка при створенні користувача:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signInUserWithEmail =
  (userData: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const temporalityUnconfirmedUser = localStorage.getItem(
        "temporalityUnconfirmedUser"
      );

      if (!response.user.emailVerified) {
        alert("You have not confirmed your email.");
        return;
      }
      if (!temporalityUnconfirmedUser) {
        return;
      }
      const user = JSON.parse(temporalityUnconfirmedUser);
      await addUserToDB(response.user.uid, user);
      localStorage.removeItem("temporalityUnconfirmedUser");
      dispatch(setUserEmailVerified(response.user.emailVerified));
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка при вході через email:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logOut = () => async (dispatch: AppDispatch) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  dispatch(setChatId(null));
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Помилка при виході:", error.message);
    dispatch(setError(String(error.message)));
  } finally {
    dispatch(setLoading(false));
  }
};
