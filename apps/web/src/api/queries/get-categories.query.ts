import { fetchApi } from "@/lib/utils/fetch-api/server";

export const getCategoriesQuery = async () => {
  return fetchApi("/categories/all", "categories");
};
