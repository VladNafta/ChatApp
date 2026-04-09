import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import HomePage from "./pages/Home/Home";
import { store } from "./store/store";

import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import ChatPage from "./pages/Chat/Chat";
import HeaderLayout from "./pages/HeaderLayout/HeaderLayout";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/log-in" />} />
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
