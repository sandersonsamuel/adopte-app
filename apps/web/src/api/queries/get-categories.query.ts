import { api } from "@/lib/utils/axios/server";

export const getCategories = async () => {
  const res = await api.get("/categories/all");
  return res.data;
};
