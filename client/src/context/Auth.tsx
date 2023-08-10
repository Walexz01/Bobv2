import { ReactNode, createContext, useEffect, useState } from "react";

export interface ContextProps {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
}

interface UserData {
  id: number;
  username: string;
  img: string;
  role: string;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<ContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
