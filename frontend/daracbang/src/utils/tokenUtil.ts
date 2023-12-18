const TOKEN_KEY = "darac_token";

export const getToken = (): string | null => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (!token) {
    return null;
  }
  return token;
};

export const saveToken = (accessToken: string): void => {
  sessionStorage.setItem(TOKEN_KEY, accessToken);
};

export const deleteToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
