import { api } from "@/lib/utils/axios/server";
import { AnimalType } from "@/types/animal.type";

export const getAnimalByIdQuery = async (id: string) => {
  try {
    const { data } = await api.get<AnimalType>(`/animals/${id}`);
    return data;
  } catch (error) {
    console.log("Error fetching animal by id", error);
  }
};
