import { api } from "@/lib/utils/axios/server";
import { AnimalPaginteType } from "@/types/animal.type";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";

export const getAnimalsQuery = async (
  params?: AnimalsQueryParamsType
): Promise<AnimalPaginteType | undefined> => {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
  }

  try {
    const { data } = await api.get<AnimalPaginteType>(
      `/animals/paginate?${searchParams.toString()}`
    );
    return data;
  } catch (error) {
    console.log("Error fetching animals", error);
  }
};
