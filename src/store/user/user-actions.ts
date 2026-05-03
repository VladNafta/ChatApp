import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { UserType } from "../../types/dbTypes";
import { AppDispatch } from "../store";
import { setError, setLoading, setUser } from "./user-slice";

export const subscribeToUserData =
  (userId: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(""));

    const userChatsCollectionRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(
      userChatsCollectionRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserType;

          dispatch(setUser(userData));
        } else {
          dispatch(setUser(null));
        }
        dispatch(setLoading(false));
      },
      (error) => {
        dispatch(setError(error.message));
        console.error("Помилка підписки на дані користувача: ", error.message);
        dispatch(setLoading(false));
      }
    );

    return unsubscribe;
  };

export const updateUserField =
  (userId: string, field: string, value: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(""));

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { [field]: value });
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error(`Помилка оновлення поля ${field}: `, error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
