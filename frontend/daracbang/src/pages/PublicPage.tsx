import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/rootReducer";

//로그인 안한 유저만 접근 가능.
// EX) 로그인, 회원가입 페이지
function PublicPage() {
  const member = useSelector((state: RootState) => {
    return state.memberReducer.member;
  });

  // 로그인이 돼 있으면 그냥 다락방 페이지로 이동
  return member != null ? <Navigate to={`/daracbang/${member.id}`} /> : <Outlet />;
}

export default PublicPage;
