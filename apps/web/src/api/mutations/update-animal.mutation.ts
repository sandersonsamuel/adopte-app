import { api } from "@/lib/utils/axios/server";

type UpdateAnimalMutationProps = {
  formData: FormData;
  id: string;
};

export const updateAnimalMutation = async ({
  formData,
  id,
}: UpdateAnimalMutationProps) => {
  const { data } = await api.put(`/animals/${id}`, formData);
  return data;
};
