"use server";

import { createClientServer } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = await createClientServer();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  redirect("/login");
};
