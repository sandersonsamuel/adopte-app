import { api } from "@/lib/utils/axios/client";

type Props = {
  id: string;
  photo: File;
};

export const updateAnimalPhotoMutation = async ({ id, photo }: Props) => {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    const response = await api.patch(`/animals/update-photo/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
