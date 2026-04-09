export type MessageObjectType = {
  chatId: string;
  senderId: string;
  text: string;
  image: string;
  createdAt: string;
};

export type ChatMessagesStateType = {
  chatId: string | null;
  messages: MessageObjectType[];
  loading: boolean;
  error: string;
};
