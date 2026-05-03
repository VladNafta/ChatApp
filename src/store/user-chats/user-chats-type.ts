import { UserChatType } from "../../types/dbTypes";

export type UserChatsStateType = {
  chats: ExtendedUserChatType[];
  loading: boolean;
  error: string;
};

export type ExtendedUserChatType = UserChatType & {
  name: string | null;
  photoURL: string | null;
};
