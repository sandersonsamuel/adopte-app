import { api } from "@/lib/utils/axios/client";
import { CreateCategorySchema } from "@/schemas/create-category.schema";

export const createCategoryMutation = async (data: CreateCategorySchema) => {
  const response = await api.post("/categories/create", data);
  return response.data;
};
