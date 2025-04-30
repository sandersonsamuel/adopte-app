"use client";

import { AnimalType } from "@/types/animal.type";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IconButton } from "@/components/ui/icon-button";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Props = {
  adoptedAnimals: AnimalType[];
};

export const AdoptedAnimalsCarousel = ({ adoptedAnimals }: Props) => {
  return (
    <Swiper
      className="w-full"
      modules={[Autoplay]}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      slidesPerView={3}
      loop={true}
      spaceBetween={10}
      breakpoints={{
        530: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
    >
      {adoptedAnimals.length > 0 ? (
        adoptedAnimals.map((animal) => (
          <SwiperSlide
            key={animal.id}
            className="flex justify-center items-center"
          >
            <div className="flex justify-center items-center w-full">
              <IconButton className="flex items-center gap-2 px-3">
                <span className="text-center">{animal.name}</span>
              </IconButton>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p className="text-gray-700">
          Nenhum animal foi adotado ainda. Seja o primeiro a fazer a diferença
          na vida de um pet!
        </p>
      )}
    </Swiper>
  );
};
