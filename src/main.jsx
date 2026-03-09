import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";

import HomePage from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";

createRoot(document.getElementById("root")).render(
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
