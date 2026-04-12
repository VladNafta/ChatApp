import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  addChatToUser,
  checkIfChatExistsInUser,
  convertUserChats,
  createChat,
} from "../../firebase/firebase-chat";
import { db } from "../../firebase/firebase-config";
import { chatObjectType } from "../../types/chat";
import { AppDispatch } from "../store";
import { setError, setLoading, setUserChats } from "./user-chats-slice";

export const subscribeToUserChats =
  (userId: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    const userChatsCollectionRef = collection(db, "users", userId, "userChats");

    const userChatsCollectionQuery = query(
      userChatsCollectionRef,
      orderBy("updatedAt", "desc")
    );
    const unsubscribe = onSnapshot(
      userChatsCollectionQuery,
      async (collectionSnap) => {
        if (!collectionSnap.empty) {
          const chatsArray = collectionSnap.docs.map(
            (doc) => doc.data() as chatObjectType
          );
          const convertedChatsArray = await convertUserChats(chatsArray);
          dispatch(setUserChats(convertedChatsArray));
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
      const isChatExistsInUser = await checkIfChatExistsInUser(
        userId,
        receiverId
      );
      console.log("чи існує.", isChatExistsInUser);

      if (isChatExistsInUser) {
        return;
      }

      const chatId = await createChat();

      await addChatToUser(userId, receiverId, chatId);
      await addChatToUser(receiverId, userId, chatId);
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка додавання чатів:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
