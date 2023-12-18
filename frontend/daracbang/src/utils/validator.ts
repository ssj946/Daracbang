export const loginIdValidator = (loginId: string) => {
  const check = /^[a-zA-Z0-9]{2,10}$/;
  return check.test(loginId);
};

export const nicknameValidator = (nickname: string) => {
  const check = /^[a-zA-Z가-힣0-9]{2,10}$/;
  return check.test(nickname);
};
