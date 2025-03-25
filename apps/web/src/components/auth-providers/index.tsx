import { createClientServer } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { AuthContextProvider } from "./auth-context-provier";
import { TabBar } from "../tabbar";
export const AuthProvider = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClientServer();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <AuthContextProvider>
      {children}
      <TabBar />
    </AuthContextProvider>
  )
};
