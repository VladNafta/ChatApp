import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
// import App from "./App.tsx";

import HomePage from "./pages/Home/Home";
import HeaderLayout from "./pages/HeaderLayout/HeaderLayout";
import LogIn from "./components/LogIn/ChatArea";
import SignUp from "./components/SignUp/SignUp";
import ChatPage from "./pages/Chat/Chat";
// import Auth from "./pages/Auth/Auth";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route index element={<HomePage />} />
          <Route path="log-in" index element={<LogIn />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* <Route path="auth" element={<Auth/>} /> */}
        </Route>
          <Route path="chat" element={<ChatPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
