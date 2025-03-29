"use client";

import { AuthContext } from "@/contexts/auth-context";
import { createClient } from "@/lib/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type AuthContextProviderProps = {
  children: React.ReactNode;
  user: User | null;
};

export const AuthContextProvider = ({
  children,
  user,
}: AuthContextProviderProps) => {
  const logOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
