import { api } from "@/lib/utils/axios/client";

export const deleteCategoryMutation = async (id: string) => {
  try {
    const response = await api.delete(`/categories/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
