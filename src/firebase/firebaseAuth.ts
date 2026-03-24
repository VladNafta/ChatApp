import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, googleProvider } from "./firebase-config";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const logInWithGoogle = async () => {
  try {
    await logOut();
    const response = await signInWithPopup(auth, googleProvider);

    const userDocRef = doc(db, "users", response.user.uid);

    await setDoc(userDocRef, { email: response.user.email, chats: [] });
  } catch (error) {
    console.error("Помилка при вході через Google:", error);
  }
};

export const createUserWithEmail = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    await logOut();
    const response = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const userDocRef = doc(db, "users", response.user.uid);

    await setDoc(userDocRef, { email: response.user.email, chats: [] });
  } catch (error) {
    console.error("Помилка при створенні користувача:", error);
  }
};

export const signInUserWithEmail = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    await signInWithEmailAndPassword(auth, userData.email, userData.password);
  } catch (error) {
    console.error("Помилка при вході через email:", error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Помилка при виході:", error);
  }
};

export const getUserIdByEmail = async (email: string) => {
  try {
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`Користувача з email ${email} не знайдено.`);
    }

    const usersId = querySnapshot.docs[0].id;
    return usersId;
  } catch (error) {
    console.error("Помилка при отриманні id користувача:", error);
    return null;
  }
};

export const checkIfChatExists = async (user1Uid: string, user2Uid: string) => {
  try {
    const chatCollection = collection(db, "chats");

    const q = query(
      chatCollection,
      where("participants", "array-contains", user1Uid)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.some((doc) => {
      const participants = doc.data().participants;
      return participants.includes(user2Uid) && participants.length === 2;
    });
  } catch (error) {
    console.error("Помилка при перевірці існування чату:", error);
    return null;
  }
};

export const createDirect = async (arrayId: string[]) => {
  try {
    const chatExists = await checkIfChatExists(arrayId[0], arrayId[1]);

    if (chatExists) {
      throw new Error("Чат вже існує між цими користувачами.");
    }

    if (chatExists === null) {
      throw new Error("Помилка при перевірці існування чату:");
    }

    const chatsCollectionRef = collection(db, "chats");
    const response = await addDoc(chatsCollectionRef, {
      participants: arrayId,
      timestamp: new Date(),
    });
    return response.id;
  } catch (error) {
    console.error("Помилка при створені чату:", error);
    return null;
  }
};

export const addChatToUser = async (userId: string, chatId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      chats: arrayUnion(chatId),
    });
    console.log(
      `Чат з ID ${chatId} успішно додано до користувача з ID ${userId}!`
    );
  } catch (error) {
    console.error("Помилка при додаванні чату користувачу:", error);
  }
};

export const getUserChats = async (userId: string) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    console.log(docSnap.data);
  } catch (error) {
    console.error("Помилка при отримані чатів користувача:", error);
  }
};
