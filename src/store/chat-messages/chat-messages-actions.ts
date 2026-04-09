import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { messageObjectType } from "../../types/chat";
import { AppDispatch } from "../store";
import { setError, setLoading, setMessages } from "./chat-messages-slice";

export const subscribeToChatMessages =
  (chatId: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const usersChatDocRef = doc(db, "chats", chatId);

    const unsubscribe = onSnapshot(
      usersChatDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const userChatData = docSnap.data();
          const messageArray: messageObjectType[] = userChatData.message;
          dispatch(setMessages(messageArray));
        } else {
          dispatch(setMessages([]));
        }
        dispatch(setLoading(false));
      },
      (error) => {
        dispatch(setError(error.message));
        console.error("Помилка підписки на повідомлення чату: ", error.message);
        dispatch(setLoading(false));
      }
    );

    return unsubscribe;
  };

export const sendMessage =
  (chatId: string | null, senderId: string, text: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      if (chatId === null) {
        throw Error("Chat id is null");
      }

      const chatDocRef = doc(db, "chats", chatId);
      const newMessage = {
        senderId,
        text,
        createdAt: new Date(),
      };
      await updateDoc(chatDocRef, {
        message: arrayUnion(newMessage),
      });
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка при вході через Google:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
