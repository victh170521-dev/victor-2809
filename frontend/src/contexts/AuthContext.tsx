import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  type User,
} from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());

  function refreshUser() {
    setUser(getCurrentUser());
  }

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}