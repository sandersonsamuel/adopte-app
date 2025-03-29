import { api } from "@/lib/utils/axios/server";
import { AnimalType } from "@/types/animal.type";

export const getAnimalByIdQuery = async (id: string) => {
  const { data } = await api.get<AnimalType>(`/animals/${id}`);
  return data;
};
