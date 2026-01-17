export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const auth = localStorage.getItem("accessToken");
  if (!auth) return null;
  return auth;
  // return JSON.parse(auth)?.tokens?.accessToken;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};


