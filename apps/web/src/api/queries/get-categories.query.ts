import { api } from "@/lib/utils/axios/server";

export const getCategoriesQuery = async () => {
  try {
    const { data } = await api.get("/categories/all");
    return data;
  } catch (error) {
    console.log("Error fetching categories", error);
  }
};
