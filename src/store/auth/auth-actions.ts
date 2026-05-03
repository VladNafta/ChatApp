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
    async (user) => {
      if (user) {
        await user.getIdToken(true);
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
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
      name: response.user.displayName,
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

      const user = {
        name: userData.userName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        photoURL: response.user.photoURL,
      };
      await addUserToDB(response.user.uid, user);
      await sendEmailVerification(response.user);
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
