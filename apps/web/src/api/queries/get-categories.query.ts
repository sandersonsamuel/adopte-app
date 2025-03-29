import { api } from "@/lib/utils/axios/server";

export const getCategoriesQuery = async () => {
  const res = await api.get("/categories/all");
  return res.data;
};
