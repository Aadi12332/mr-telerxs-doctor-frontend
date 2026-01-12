import { createContext, useContext, useState } from "react";

type AuthState = {
  user: any;
  doctor: any;
  tokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState | null>(null);

  const login = (data: any) => {
    setAuth(data);
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
