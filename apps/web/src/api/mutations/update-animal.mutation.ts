import { api } from "@/lib/utils/axios/client";
import { UpdateAnimalFormData } from "@/schemas/update-animal.schema";

type UpdateAnimalMutationProps = {
  animal: UpdateAnimalFormData;
  id: string;
};

export const updateAnimalMutation = async ({
  animal,
  id,
}: UpdateAnimalMutationProps) => {
  return await api.put(`/animals/update/${id}`, animal);
};
