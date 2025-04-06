"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { createClient } from "../../supabase/client";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error.response.data.message);
    console.log(error.response.data);
    return Promise.reject(error);
  }
);

api.interceptors.request.use(async (config) => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  config.headers.Authorization = `Bearer ${session?.access_token}`;

  return config;
});
