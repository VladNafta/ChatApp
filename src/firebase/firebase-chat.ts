import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ExtendedUserChatType } from "../store/user-chats/user-chats-type";
import {
  ChatType,
  GroupChatType,
  UserChatType,
  UserType,
} from "../types/dbTypes";
import { db } from "./firebase-config";

export const createDirectChat = async (participants: string[]) => {
  const chatsCollectionRef = collection(db, "directChats");
  const responseCreatedChat = await addDoc(chatsCollectionRef, {
    created: new Date(),
    participants,
  });
  return responseCreatedChat.id;
};

export const createGroupChat = async (
  adminId: string,
  groupName: string,
  participants: string[],
  photoURL: string | null
) => {
  const chatsCollectionRef = collection(db, "groupChats");
  const responseCreatedChat = await addDoc(chatsCollectionRef, {
    adminId,
    groupName,
    participants,
    photoURL,
    created: new Date(),
  });
  return responseCreatedChat.id;
};

export const addChatToUser = async (
  userId: string,
  participants: string[],
  chatId: string,
  chatType: ChatType
) => {
  const userChatDocRef = doc(db, "users", userId, "userChats", chatId);

  await setDoc(userChatDocRef, {
    chatId,
    participants,
    lastMessage: "",
    updatedAt: Date.now(),
    chatType,
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
    lastMessage,
  });
};

export const getUserChats = async (userId: string) => {
  const userChatsRef = collection(db, "users", userId, "userChats");

  const querySnapshot = await getDocs(userChatsRef);

  const chatsArray = querySnapshot.docs.map(
    (doc) => doc.data() as UserChatType
  );

  if (chatsArray.length === 0) {
    return [];
  }

  return chatsArray;
};

export const convertDirectChat = async (
  userId: string,
  chat: UserChatType
): Promise<ExtendedUserChatType | null> => {
  const receiverId = chat.participants.find((id) => userId !== id);
  if (!receiverId) {
    return null;
  }

  const userDocRef = doc(db, "users", receiverId);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    return null;
  }

  // !!!!!!!!
  const userData = userDoc.data() as UserType;
  // !!!!!!!! should log
  return {
    chatId: chat.chatId,
    chatType: chat.chatType,
    name: userData.name,
    photoURL: userData.photoURL,
    participants: chat.participants,
    lastMessage: chat.lastMessage,
    updatedAt: chat.updatedAt,
  };
};

export const convertGroupChat = async (
  chat: UserChatType
): Promise<ExtendedUserChatType | null> => {
  const groupChatDocRef = doc(db, "groupChats", chat.chatId);
  const groupChatDoc = await getDoc(groupChatDocRef);

  if (!groupChatDoc.exists()) {
    return null;
  }

  const groupChatData = groupChatDoc.data() as GroupChatType;

  return {
    chatId: chat.chatId,
    chatType: chat.chatType,
    name: groupChatData.groupName,
    photoURL: groupChatData.photoURL,
    participants: chat.participants,
    lastMessage: chat.lastMessage,
    updatedAt: chat.updatedAt,
  };
};

export const convertUserChats = async (
  userId: string,
  chatsArray: UserChatType[]
) => {
  const newChats = await Promise.all(
    chatsArray.map(async (chat) => {
      if (chat.chatType === ChatType.DIRECT) {
        return await convertDirectChat(userId, chat);
      } else if (chat.chatType === ChatType.GROUP) {
        return await convertGroupChat(chat);
      } else return null;
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

  const isChatExists = chatsArray.some((chat) => {
    if (chat.chatType === ChatType.GROUP) return false;
    chat.participants.some((userId) => userId === receiverId);
  });

  return isChatExists;
};
