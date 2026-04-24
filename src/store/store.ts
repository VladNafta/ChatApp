import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import chatMessagesReducer from "./chat-messages/chat-messages-slice";
import userChatsReducer from "./user-chats/user-chats-slice";
import userReducer from "./user/user-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chatMessages: chatMessagesReducer,
    userChats: userChatsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
