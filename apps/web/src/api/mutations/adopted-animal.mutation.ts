import { api } from "@/lib/utils/axios/client";

export const adoptedAnimalMutation = async (id: string) => {
  const response = await api.patch(`/animals/adopted/${id}`);

  return response.data;
};
