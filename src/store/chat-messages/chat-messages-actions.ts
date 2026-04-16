import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { AppDispatch } from "../store";
import {
  addPrevMessages,
  setError,
  setLastDoc,
  setLoading,
  setMessages,
} from "./chat-messages-slice";
import { MessageObjectType } from "./chat-messages-type";

const messagesLimit = 10;

export const subscribeToChatMessages =
  (chatId: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const messagesCollectionRef = collection(db, "chats", chatId, "messages");

    const messagesQuery = query(
      messagesCollectionRef,
      orderBy("createdAt", "desc"),
      limit(messagesLimit)
    );

    let isFirst = true;

    const unsubscribe = onSnapshot(
      messagesQuery,
      (collectionSnap) => {
        if (!collectionSnap.empty) {
          const messageArray = collectionSnap
            .docChanges()
            .filter((change) => change.type === "added")
            .map((change) => change.doc.data() as MessageObjectType);

          messageArray.reverse();
          dispatch(setMessages(messageArray));

          if (isFirst) {
            isFirst = false;

            dispatch(
              setLastDoc({
                lastDocId:
                  collectionSnap.docs[collectionSnap.docs.length - 1].id,
                chatId,
              })
            );
          }
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

export const downloadPrevMessages =
  (chatId: string, lastDocId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const lastDocRef = doc(db, "chats", chatId, "messages", lastDocId);
      const lastDocSnap = await getDoc(lastDocRef);

      const messagesCollectionRef = collection(db, "chats", chatId, "messages");

      const prevMessagesQuery = query(
        messagesCollectionRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDocSnap),
        limit(messagesLimit)
      );

      const querySnapshot = await getDocs(prevMessagesQuery);
      if (!querySnapshot.empty) {
        dispatch(
          addPrevMessages({
            messages: querySnapshot
              .docChanges()
              .filter((change) => change.type === "added")
              .map((change) => change.doc.data() as MessageObjectType)
              .reverse(),
            chatId,
          })
        );

        dispatch(
          setLastDoc({
            lastDocId: querySnapshot.docs[querySnapshot.docs.length - 1].id,
            chatId,
          })
        );
      }
    } catch (error: any) {
      console.error(
        "Помилка отримання попередніх повідомлень: ",
        error.message
      );
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
