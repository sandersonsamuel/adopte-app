import { AnimalAgeTranslation, AnimalType } from "@/types/animal.type";
import Image from "next/image";

type Props = {
  animal: AnimalType;
};

export const AnimalContent = ({ animal }: Props) => {
  return (
    <div className="relative">
      <Image
        src={animal.photo}
        alt={animal.name}
        width={720}
        height={960}
        className={`w-[150px] rounded-3xl border-4 ${
          animal.sex === "MALE" ? "border-blue-300" : "border-pink-300"
        }`}
      />
      <div
        className={`absolute bottom-0 w-[150px] h-1/3 p-2 pl-3 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl border-b-4 border-l-4 border-r-4 ${
          animal.sex === "MALE" ? "border-blue-300" : "border-pink-300"
        }`}
      >
        <p className="text-white font-medium text-sm">
          {animal.name}
        </p>
        <p className="text-white font-medium text-sm">
          {AnimalAgeTranslation[animal.age]}
        </p>
      </div>
    </div>
  );
};
