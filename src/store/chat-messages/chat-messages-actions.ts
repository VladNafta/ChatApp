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
import { ChatType, GroupChatType, UserType } from "../../types/dbTypes";
import { AppDispatch, RootState } from "../store";
import {
  addPrevMessages,
  setError,
  setLastDoc,
  setLoading,
  setMessages,
  setUsers,
} from "./chat-messages-slice";
import { ExtendedMessageType } from "./chat-messages-type";

const messagesLimit = 40;

export const subscribeToChatMessages =
  (chatId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));

    const chatType = getState().chatMessages.chatType;
    let chatCollectionName: string;
    switch (chatType) {
      case ChatType.DIRECT:
        chatCollectionName = "directChats";
        break;
      case ChatType.GROUP:
        chatCollectionName = "groupChats";
        break;
      default:
        throw new Error(`Невідомий тип чату: ${chatType}`);
    }
    const messagesCollectionRef = collection(
      db,
      chatCollectionName,
      chatId,
      "messages"
    );
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
            .map(
              (change) =>
                ({
                  messageId: change.doc.id,
                  ...change.doc.data(),
                } as ExtendedMessageType)
            );

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

export const downloadPrevMessages =
  (chatId: string, lastDocId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));

      const chatType = getState().chatMessages.chatType;
      let chatCollectionName: string;

      switch (chatType) {
        case ChatType.DIRECT:
          chatCollectionName = "directChats";
          break;
        case ChatType.GROUP:
          chatCollectionName = "groupChats";
          break;
        default:
          throw new Error(`Невідомий тип чату: ${chatType}`);
      }

      const lastDocRef = doc(
        db,
        chatCollectionName,
        chatId,
        "messages",
        lastDocId
      );
      const lastDocSnap = await getDoc(lastDocRef);

      const messagesCollectionRef = collection(
        db,
        chatCollectionName,
        chatId,
        "messages"
      );

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
              .map(
                (change) =>
                  ({
                    messageId: change.doc.id,
                    ...change.doc.data(),
                  } as ExtendedMessageType)
              )
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

export const sendMessage =
  (chatId: string, senderId: string, text: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));

    const chatType = getState().chatMessages.chatType;
    try {
      let chatCollectionName: string;

      switch (chatType) {
        case ChatType.DIRECT:
          chatCollectionName = "directChats";
          break;
        case ChatType.GROUP:
          chatCollectionName = "groupChats";
          break;
        default:
          throw new Error(`Невідомий тип чату: ${chatType}`);
      }
      const messagesCollectionRef = collection(
        db,
        chatCollectionName,
        chatId,
        "messages"
      );
      const newMessage = {
        chatId,
        senderId,
        text,
        createdAt: Date.now(),
      };

      const response = await addDoc(messagesCollectionRef, newMessage);
      return response.id;
    } catch (error: any) {
      dispatch(setError(String(error.message)));
      console.error("Помилка надсилання повідомлення:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getUsersInGroupChat =
  (chatId: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const chatDocRef = doc(db, "groupChats", chatId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        throw new Error("Чат не знайдено");
      }

      const chatData = chatDocSnap.data() as GroupChatType;
      const participants = chatData.participants;

      const usersData = await Promise.all(
        participants.map(async (userId) => {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);
          if (!userDocSnap.exists()) return null;
          const userData = userDocSnap.data() as UserType;
          return { userId, ...userData };
        })
      );

      const result = usersData.reduce<Record<string, UserType>>((acc, user) => {
        if (user) {
          acc[user.userId] = user;
        }
        return acc;
      }, {});

      dispatch(setUsers(result));
    } catch (error: any) {
      dispatch(setError(error.message));
      console.error("Помилка отримання користувачів:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
