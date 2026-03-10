import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
// import App from "./App.tsx";

import HomePage from "./pages/Home/Home";
import Header from "./components/Header/Header";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route element={<Header />}>
        <Route index element={<HomePage />} />
          <Route path="log-in" index element={<LogIn />} />
          <Route path="sign-up" index element={<SignUp />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
