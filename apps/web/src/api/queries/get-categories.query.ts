import { fetchApi } from "@/lib/utils/fetch-api/server";

export const getCategoriesQuery = async () => {
  const data = await fetchApi("/categories/all", "categories");
  return data || [];
};
