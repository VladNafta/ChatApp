export type MessageObjectType = {
  chatId: string;
  senderId: string;
  text: string;
  image: string;
  createdAt: number;
};

export type ChatMessagesStateType = {
  chatId: string | null;
  messages: MessageObjectType[];
  lastDocId: string | null,
  loading: boolean;
  error: string;
};
