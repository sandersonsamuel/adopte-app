import { api } from "@/lib/utils/axios/client";

type UpdateCategoryMutationProps = {
  id: string;
  name: string;
};
export const updateCategoryMutation = async ({
  id,
  name,
}: UpdateCategoryMutationProps) => {
  try {
    const response = await api.patch(`/categories/update/${id}`, { name });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
