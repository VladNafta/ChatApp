import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { AppDispatch } from "../store";
import { setError, setLoading, setMessages } from "./chat-messages-slice";
import { MessageObjectType } from "./chat-messages-type";

export const subscribeToChatMessages =
  (chatId: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const usersChatCollectionRef = collection(db, "chats", chatId, "messages");

    const userChatsQuery = query(
      usersChatCollectionRef,
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      userChatsQuery,
      (collectionSnap) => {
        if (!collectionSnap.empty) {
          const messageArray = collectionSnap.docs.map(
            (doc) => doc.data() as MessageObjectType
          );
          
          messageArray.reverse(); 

          dispatch(setMessages(messageArray));
        } else {
          dispatch(setMessages([]));
        }
        dispatch(setLoading(false));
      },
      (error) => {
        console.error("Помилка підписки на повідомлення чату: ", error.message);
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    );

    return unsubscribe;
  };

export const sendMessage =
  (chatId: string, senderId: string, text: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const chatMessagesCollectionRef = collection(
        db,
        "chats",
        chatId,
        "messages"
      );
      const newMessage = {
        chatId,
        senderId,
        text,
        createdAt: Date.now(),
      };

      const response = await addDoc(chatMessagesCollectionRef, newMessage);
      return response.id;
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка надсилання повідомлення:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

//сортування повідомлень по часу
//збереження дати не у вигляді цілого обєкта
