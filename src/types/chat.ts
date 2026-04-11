export type chatObjectType = {
  chatId: string;
  receiverId: string;
  lastMessage: string;
  updatedAt: number;
  isSeen: boolean;
};

export type messageObjectType = {
  chatId: string;
  senderId: string;
  text: string;
  image: string;
  createdAt: number;
};