import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessagesStateType, MessageObjectType } from "./chat-messages-type";

const initialState: ChatMessagesStateType = {
  chatId: null,
  messages: [],
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
      state.lastDocId = null;
      state.messages = [];
    },

    setMessages: (state, action: PayloadAction<MessageObjectType[]>) => {
      state.messages.push(...action.payload);
    },

    addPrevMessages: (
      state,
      action: PayloadAction<{ messages: MessageObjectType[]; chatId: string }>
    ) => {
      if (state.chatId === action.payload.chatId) {
        state.messages.unshift(...action.payload.messages);
      }
    },

    setLastDoc: (state, action:  PayloadAction<{ lastDocId: string; chatId: string }>) => {
      if (state.chatId === action.payload.chatId) {
        state.lastDocId = action.payload.lastDocId;
      }
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
  setMessages,
  addPrevMessages,
  setLastDoc,
  setLoading,
  setError,
} = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
