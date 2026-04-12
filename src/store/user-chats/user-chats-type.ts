export type UserChatsStateType = {
  chats: UserChatsType[];
  loading: boolean;
  error: string;
};

// export type ChatObjectType = {
//   chatId: string;
//   receiverId: string;
//   lastMessage: string;
//   updatedAt: string;
//   isSeen: boolean;
// };

export type UserChatsType = {
  chatId: string;
  receiverId: string;
  userName: string;
  email: string;
  lastMessage: string;
  updatedAt: number;
  isSeen: boolean;
};

// export type ChatType = ChatObjectType & {
//   email: string;
// };
