import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { chatObjectType } from "../types/chat";
import { db } from "./firebase-config";

export const createChat = async () => {
  const chatsCollectionRef = collection(db, "chats");
  const responseCreateChat = await addDoc(chatsCollectionRef, {
    created: new Date(),
    message: [],
  });
  return responseCreateChat.id;
};

export const addToUserChats = async (
  userId: string,
  receiverId: string,
  chatId: string
) => {
  try {
    const userChatsDocRef = doc(db, "usersChats", userId);
    const userChatsDoc = await getDoc(userChatsDocRef);

    if (!userChatsDoc.exists()) {
      await setDoc(userChatsDocRef, {
        chats: [
          {
            chatId,
            receiverId,
            lastMessage: "",
            updatedAt: new Date(),
            isSeen: true,
          },
        ],
      });
      console.log("Документ створено і додано перший чат.");
    } else {
      await updateDoc(userChatsDocRef, {
        chats: arrayUnion({
          chatId,
          receiverId,
          lastMessage: "",
          updatedAt: new Date(),
          isSeen: true,
        }),
      });
      console.log("Додано чат до користувача.");
    }
  } catch (error) {
    console.error("Помилка додавання чату до користувача: ", error);
  }
};

export const getUserChats = async (userId: string) => {
  const userChatsDocRef = doc(db, "usersChats", userId);
  const userChatsDoc = await getDoc(userChatsDocRef);
  if (!userChatsDoc.exists()) {
    return [];
  }

  const userChatsData = userChatsDoc.data();
  const chatsArray: chatObjectType[] = userChatsData.chats;

  return chatsArray;
};

export const checkIfChatExistsInUser = async (
  userId: string,
  receiverId: string
) => {
  if (userId === receiverId) {
    return true;
  }
  const chatsArray = await getUserChats(userId);
  console.log(chatsArray);
  if (chatsArray.length === 0) {
    return false;
  }

  const isChatExists = chatsArray.some(
    (chat) => chat.receiverId === receiverId
  );

  return isChatExists;
};

// export const sendLastMessageToChat = (
//   chatId: string,
//   lastMessage: string
// ) => {

// };
