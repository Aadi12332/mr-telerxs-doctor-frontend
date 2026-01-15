export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return null;
  return JSON.parse(auth)?.tokens?.accessToken;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};


