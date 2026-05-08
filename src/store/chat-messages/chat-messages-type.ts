import { ChatType, MessageType, UserType } from "../../types/dbTypes";

export type ChatMessagesStateType = {
  chatId: string | null;
  chatType: ChatType | null;
  messages: ExtendedMessageType[];
  users: Record<string, UserType> | null;
  lastDocId: string | null;
  loading: boolean;
  error: string;
};

export type ExtendedMessageType = MessageType & { messageId: string };
