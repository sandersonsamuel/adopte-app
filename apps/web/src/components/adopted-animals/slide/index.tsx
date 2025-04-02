"use client";

import { AnimalType } from "@/types/animal.type";
import { PawPrint } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Props = {
  animals: AnimalType[];
};

export const AdoptedAnimalsSlide = ({ animals }: Props) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      slidesPerView={3}
      spaceBetween={10}
      loop
    >
      <div className="flex gap-3">
        {animals.map((animal) => (
          <SwiperSlide key={animal.id}>
            <h4 className="flex items-center gap-2 w-full text-gray-700">
              <PawPrint />
              {animal.name}
            </h4>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};
