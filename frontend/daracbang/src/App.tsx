import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Daracbang from "./pages/Daracbang";
import Diary from "./pages/Diary";
import DiaryWrite from "./pages/DiaryWrite";
import Neighbor from "./pages/Neighbor";
import Guestbook from "./pages/Guestbook";
import SignUp from "./pages/SignUp";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PublicPage from "./pages/PublicPage";
import PrivatePage from "./pages/PriviatePage";
import { Global } from "@emotion/react";
import reset from "./style/reset";

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} />
      <Routes>
        <Route element={<PublicPage />}>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Main />}></Route>
        </Route>
        <Route element={<PrivatePage />}>
          <Route path="/daracbang/:memberId" element={<Daracbang />}></Route>
          <Route path="/daracbang/:memberId/diary/:diaryId" element={<Diary />}></Route>
          <Route path="/diary-write" element={<DiaryWrite />}></Route>
          <Route path="/daracbang/:memberId/neighbor" element={<Neighbor />}></Route>
          <Route path="/daracbang/:memberId/guestbook" element={<Guestbook />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
