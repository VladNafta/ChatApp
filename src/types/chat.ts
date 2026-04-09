export type chatObjectType = {
  chatId: string;
  receiverId: string;
  lastMessage: string;
  updatedAt: string;
  isSeen: boolean;
};

export type messageObjectType = {
  chatId: string;
  senderId: string;
  text: string;
  image: string;
  createdAt: string;
};