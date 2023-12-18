import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/rootReducer";

// 로그인 한 유저만 접근 가능.

function PrivatePage() {
  const member = useSelector((state: RootState) => {
    return state.memberReducer.member;
  });

  // user 로그인이 안돼있으면 로그인 페이지로 이동
  return member == null ? <Navigate to="/" /> : <Outlet />;
}

export default PrivatePage;
