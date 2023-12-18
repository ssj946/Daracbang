// action Type
const LOGIN = "member/LOGIN" as const;
const LOGOUT = "member/LOGOUT" as const;

// state type 정의
type memberState = {
  member: MemberInfo | null;
};

// state 초기 값
const initialState: memberState = {
  member: null,
};

// user 정보
export interface MemberInfo {
  id: number;
  loginId: string;
  nickname: string;
  profileImage: string;
  introduce: string;
}

// 액션 생성 함수
export const loginAction = (data: MemberInfo) => ({
  type: LOGIN,
  payload: data,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

type memberAction = ReturnType<typeof loginAction> | ReturnType<typeof logoutAction>;

export const memberReducer = (state: memberState = initialState, action: memberAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        member: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        member: null,
      };
    default:
      return state;
  }
};
