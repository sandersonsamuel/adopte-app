import { api } from "@/lib/utils/axios/server";
import { AnimalType } from "@/types/animal.type";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";

export const getAnimalsQuery = async (params: AnimalsQueryParamsType) => {
  const searchParams = new URLSearchParams(params);
  return await api.get<AnimalType[]>(
    `/animals/paginate?${searchParams.toString()}`
  );
};
