import { doc, onSnapshot } from "firebase/firestore";
import {
  addToUserChats,
  checkIfChatExistsInUser,
  createChat,
} from "../../firebase/firebase-chat";
import { db } from "../../firebase/firebase-config";
import { chatObjectType } from "../../types/chat";
import { AppDispatch } from "../store";
import { setError, setLoading, setUserChats } from "./user-chats-slice";

export const subscribeToUserChats =
  (userId: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    const userChatsDocRef = doc(db, "usersChats", userId);

    const unsubscribe = onSnapshot(
      userChatsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userChatsData = docSnap.data();
          const chatsArray: chatObjectType[] = userChatsData.chats;
          dispatch(setUserChats(chatsArray));
        } else {
          dispatch(setUserChats([]));
        }
        dispatch(setLoading(false));
      },
      (error) => {
        dispatch(setError(error.message));
        console.error("Помилка підписки на чати користувача: ", error.message);
        dispatch(setLoading(false));
      }
    );

    return unsubscribe;
  };

export const addChatToUsers =
  (userId: string, receiverId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const isChatExistsInUser = await checkIfChatExistsInUser(userId, receiverId);

      console.log("hello");
      
      if (isChatExistsInUser) {
        return;
      }

      const chatId = await createChat();

      await addToUserChats(userId, receiverId, chatId);
      await addToUserChats(receiverId, userId, chatId);
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка додавання чатів:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
