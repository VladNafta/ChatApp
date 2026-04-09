export type UserChatsStateType = {
  chats: ChatObjectType[];
  loading: boolean;
  error: string;
};

export type ChatObjectType = {
  chatId: string;
  receiverId: string;
  lastMessage: string;
  updatedAt: string;
  isSeen: boolean;
};

// export type ChatType = ChatObjectType & {
//   email: string;
// };
