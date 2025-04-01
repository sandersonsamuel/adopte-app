import { AnimalType } from "@/types/animal.type";
import { Pencil } from "lucide-react";
import { AnimalImg } from "../animal-content/img";

type Props = {
  animal: AnimalType;
};

export const AnimalPhotoUpdate = ({ animal }: Props) => {
  return (
    <div className="flex justify-center items-center my-3 relative">
      <AnimalImg animal={animal} redirectToEdit={false} />
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
        <Pencil className="size-7 text-white" />
      </div>
    </div>
  );
};
