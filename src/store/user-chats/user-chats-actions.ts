import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  addChatToUser,
  checkIfChatExistsInUser,
  convertUserChats,
  createDirectChat,
  createGroupChat,
} from "../../firebase/firebase-chat";
import { db } from "../../firebase/firebase-config";
import { ChatType, UserChatType } from "../../types/dbTypes";
import { AppDispatch } from "../store";
import { setError, setLoading, setUserChats } from "./user-chats-slice";

export const subscribeToUserChats =
  (userId: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(""));

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
            (doc) => doc.data() as UserChatType
          );

          const convertedChatsArray = await convertUserChats(
            userId,
            chatsArray
          );

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

export const addNewDirectChatToUsers =
  (userId: string, newUserId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const isChatExistsInUser = await checkIfChatExistsInUser(
        userId,
        newUserId
      );
      console.log("чи існує.", isChatExistsInUser);
      if (isChatExistsInUser) return;
      const participants = [userId, newUserId];
      const chatId = await createDirectChat(participants);
      
      participants.forEach(async (userId) => {
        await addChatToUser(userId, participants, chatId, ChatType.DIRECT);
      });
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка додавання прямих чатів:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const addNewGroupChatToUsers =
  (
    userId: string,
    participants: string[],
    photoURL: string | null,
    groupName: string,
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const chatId = await createGroupChat(
        userId,
        groupName,
        participants,
        photoURL
      );

      participants.forEach(async (userId) => {
        await addChatToUser(userId, participants, chatId, ChatType.GROUP);
      });
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка додавання групових чатів:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
