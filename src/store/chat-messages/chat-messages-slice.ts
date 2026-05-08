import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType, UserType } from "../../types/dbTypes";
import {
  ChatMessagesStateType,
  ExtendedMessageType,
} from "./chat-messages-type";

const initialState: ChatMessagesStateType = {
  chatId: null,
  chatType: null,
  messages: [],
  users: null,
  lastDocId: null,
  loading: false,
  error: "",
};

const chatMessageSlice = createSlice({
  name: "chat-messages",
  initialState,
  reducers: {
    setChatId: (state, action: PayloadAction<string | null>) => {
      state.chatId = action.payload;
      state.chatType = null;
      state.lastDocId = null;
      state.messages = [];
      state.users = null;
    },

    setChatType: (state, action: PayloadAction<ChatType | null>) => {
      state.chatType = action.payload;
    },

    setMessages: (state, action: PayloadAction<ExtendedMessageType[]>) => {
      state.messages.push(...action.payload);
    },

    addPrevMessages: (
      state,
      action: PayloadAction<{ messages: ExtendedMessageType[]; chatId: string }>
    ) => {
      if (state.chatId === action.payload.chatId) {
        state.messages.unshift(...action.payload.messages);
      }
    },

    setLastDoc: (
      state,
      action: PayloadAction<{ lastDocId: string; chatId: string }>
    ) => {
      if (state.chatId === action.payload.chatId) {
        state.lastDocId = action.payload.lastDocId;
      }
    },

    setUsers: (state, action: PayloadAction<Record<string, UserType> | null>) => {
      state.users = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChatId,
  setChatType,
  setMessages,
  addPrevMessages,
  setLastDoc,
  setUsers,
  setLoading,
  setError,
} = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
