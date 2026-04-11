import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase-config";
import { addUserToDB } from "../../firebase/firebase-user";
import { AppDispatch } from "../store";
import { setError, setLoading, setUser } from "./auth-slice";

export const watchAuthState = () => (dispatch: AppDispatch) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid }));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    },
    (error) => {
      dispatch(setError(error.message));
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
      userName: String(response.user.displayName),
      email: String(response.user.email),
    };
    await addUserToDB(response.user.uid, user);
    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(String(error.message)));
    console.error("Помилка при вході через Google:", error.message);
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
        userName: userData.userName,
        email: response.user.email as string,
      };

      await addUserToDB(response.user.uid, user);
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка при створенні користувача:", error.message);
    }
  };

export const signInUserWithEmail =
  (userData: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setError(""));
    dispatch(setLoading(true));
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);

      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка при вході через email:", error.message);
    }
  };

export const logOut = () => async (dispatch: AppDispatch) => {
  dispatch(setError(""));
  dispatch(setLoading(true));
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Помилка при виході:", error.message);
    dispatch(setError(String(error.message)));
  } finally {
    dispatch(setLoading(false));
  }
};
