import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { chatObjectType } from "../types/types";
import { db } from "./firebase-config";

export const createChat = async () => {
  const chatsCollectionRef = collection(db, "chats");
  const responseCreateChat = await addDoc(chatsCollectionRef, {
    created: new Date(),
  });
  return responseCreateChat.id;
};

export const addChatToUser = async (
  userId: string,
  receiverId: string,
  chatId: string
) => {
  console.log("start");

  const userChatDocRef = doc(db, "users", userId, "userChats", chatId);

  await setDoc(userChatDocRef, {
    chatId,
    receiverId,
    lastMessage: "",
    updatedAt: Date.now(),
    isSeen: true,
  });
  console.log("Документ чату створений.");
};

export const setLastMessageToUserChat = async (
  userId: string,
  chatId: string,
  lastMessage: string
) => {
  const userChatDocRef = doc(db, "users", userId, "userChats", chatId);

  await updateDoc(userChatDocRef, {
    updatedAt: Date.now(),
    isSeen: true,
    lastMessage,
  });
};

type ChatObjectType = {
  chatId: string;
  receiverId: string;
  lastMessage: string;
  updatedAt: number;
  isSeen: boolean;
};

export const getUserChats = async (userId: string) => {
  const userChatsRef = collection(db, "users", userId, "userChats");

  const querySnapshot = await getDocs(userChatsRef);

  const chatsArray: ChatObjectType[] = querySnapshot.docs.map(
    (doc) => doc.data() as ChatObjectType
  );

  if (chatsArray.length === 0) {
    return [];
  }

  return chatsArray;
};

export const convertUserChats = async (chatsArray: chatObjectType[]) => {
  const newChats = await Promise.all(
    chatsArray.map(async (chat) => {
      const userDocRef = doc(db, "users", chat.receiverId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return null;
      }

      const userData = userDoc.data();
      const email: string = userData.email;
      const userName: string = userData.userName;

      return {
        chatId: chat.chatId,
        email,
        userName,
        receiverId: chat.receiverId,
        lastMessage: chat.lastMessage,
        updatedAt: chat.updatedAt,
        isSeen: chat.isSeen,
      };
    })
  );
  return newChats.filter((chat) => chat !== null);
};

export const checkIfChatExistsInUser = async (
  userId: string,
  receiverId: string
) => {
  if (userId === receiverId) {
    return true;
  }

  const chatsArray = await getUserChats(userId);

  if (chatsArray.length === 0) {
    return false;
  }

  const isChatExists = chatsArray.some(
    (chat) => chat.receiverId === receiverId
  );

  return isChatExists;
};
