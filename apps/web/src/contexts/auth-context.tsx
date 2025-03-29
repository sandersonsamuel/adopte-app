import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type AuthContextType = {
  user: User | null;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logOut: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
