import { api } from "@/lib/utils/axios/client";

export const createAnimalMutation = async (data: FormData) => {
  const res = await api.post("animals/create", data);
  if (res.status === 200) {
    return res.data;
  }

  return res;
};
