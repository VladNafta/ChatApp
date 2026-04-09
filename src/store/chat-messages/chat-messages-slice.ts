import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessagesStateType, MessageObjectType } from "./chat-messages-type";

const initialState: ChatMessagesStateType = {
  chatId: null,
  messages: [],
  loading: false,
  error: "",
};

const chatMessageSlice = createSlice({
  name: "chat-messages",
  initialState,
  reducers: {
    setChatId: (state, actions: PayloadAction<string | null>) => {
      state.chatId = actions.payload;
      state.messages = [];
    },

    setMessages: (state, actions: PayloadAction<MessageObjectType[]>) => {
      state.messages = actions.payload;
    },

    addMessage: (state, actions: PayloadAction<MessageObjectType>) => {
      state.messages.push(actions.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setChatId, setMessages, addMessage, setLoading, setError } =
  chatMessageSlice.actions;
export default chatMessageSlice.reducer;
