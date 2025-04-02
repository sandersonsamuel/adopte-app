import { api } from "@/lib/utils/axios/server";

export const getAdoptedAnimalsQuery = async () => {
  try {
    const response = await api.get("/animals/paginate?adopted=true");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
