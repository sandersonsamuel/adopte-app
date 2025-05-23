"use client";

import { AnimalAgeTranslation, AnimalType } from "@/types/animal.type";
import Image from "next/image";

type Props = {
  animal?: AnimalType;
  redirectToEdit?: boolean;
};

export const AnimalImg = ({ animal }: Props) => {
  if (animal) {
    return (
      <div className="relative flex flex-col items-center justify-center">
        <Image
          priority
          src={`${animal.photo}?t=${animal.updatedAt}`}
          alt={`animal chamado ${animal.name}. ${animal.description}`}
          width={150}
          height={197}
          className={`w-[150px] h-[197.33px] object-cover rounded-3xl border-4 ${
            animal.sex === "MALE" ? "border-blue-300" : "border-pink-300"
          }`}
        />
        <div
          className={`absolute bottom-0 w-[150px] h-1/3 p-2 pl-3 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl border-b-4 border-l-4 border-r-4 ${
            animal.sex === "MALE" ? "border-blue-300" : "border-pink-300"
          }`}
        >
          <p className="text-white font-medium text-sm">{animal.name}</p>
          <p className="text-white font-medium text-sm">
            {AnimalAgeTranslation[animal.age]}
          </p>
        </div>
      </div>
    );
  }
};
