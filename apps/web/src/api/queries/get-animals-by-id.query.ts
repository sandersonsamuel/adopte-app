import { api } from "@/lib/utils/axios/server";
import { AnimalType } from "@/types/animal.type";
export const getAnimalsByIdQuery = async (id: string) => {
  const { data } = await api.get<AnimalType>(`/animals/${id}`);
  return data;
};
