import { api } from "@/lib/utils/axios/client";

export const deleteAnimalMutation = async (id: string) => {
  return await api.delete(`/animals/${id}`);
};
