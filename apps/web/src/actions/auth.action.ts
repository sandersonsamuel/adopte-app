"use server";

import { createClientServer } from "@/lib/utils/supabase/server";
import { ActionResponse } from "@/types/action-response.type";

export const signIn = async (
  email: string,
  password: string
): Promise<ActionResponse> => {
  const supabase = await createClientServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    data,
    error,
  };
};
