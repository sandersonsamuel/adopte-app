import { api } from "@/lib/utils/axios/server";
import { AnimalPaginteType } from "@/types/animal.type";

export const getAdoptedAnimalsQuery = async () => {
  try {
    const response = await api.get<AnimalPaginteType>(
      "/animals/paginate?adopted=true"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
