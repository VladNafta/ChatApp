import { ChatType, MessageType } from "../../types/dbTypes";

export type ChatMessagesStateType = {
  chatId: string | null;
  chatType: ChatType | null;
  messages: ExtendedMessageType[];
  lastDocId: string | null;
  loading: boolean;
  error: string;
};

export type ExtendedMessageType = MessageType & { messageId: string };
