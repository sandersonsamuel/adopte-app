"use server";

import axios from "axios";
import { createClientServer } from "../../supabase/server";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const supabase = await createClientServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  config.headers.Authorization = `Bearer ${session?.access_token}`;

  return config;
});
