"use client";

import { AnimalType } from "@/types/animal.type";
import { Pencil } from "lucide-react";
import { AnimalImg } from "../animal-content/img";
import { useEffect, useState } from "react";
import { updateAnimalPhotoMutation } from "@/api/mutations/update-animal-photo.mutation";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

type Props = {
  animal: AnimalType;
};

export const AnimalPhotoUpdate = ({ animal }: Props) => {
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const mutation = useMutation({
    mutationFn: updateAnimalPhotoMutation,
    onSuccess: (data: AnimalType) => {
      toast.success("Foto atualizada com sucesso");
      animal.photo = data.photo;
      animal.updatedAt = data.updatedAt;
    },
  });

  useEffect(() => {
    if (photo) {
      mutation.mutate({ id: animal.id, photo });
    }
  }, [photo]);

  return (
    <div className="flex justify-center items-center my-3 relative">
      <label htmlFor="photo" className="cursor-pointer">
        <AnimalImg animal={animal} redirectToEdit={false} />
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
          <Pencil className="size-7 text-white" />
        </div>
      </label>

      <input
        onChange={handlePhotoChange}
        type="file"
        id="photo"
        className="hidden"
      />
    </div>
  );
};
