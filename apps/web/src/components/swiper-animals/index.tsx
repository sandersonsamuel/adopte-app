"use client";

import { AnimalType } from "@/types/animal.type";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimalContent } from "../animal-content";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Props = {
  animals: AnimalType[];
};
export const SwiperAnimals = ({ animals }: Props) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      slidesPerView={1}
      loop={true}
      breakpoints={{
        360: {
          slidesPerView: 2,
        },
        530: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
      }}
    >
      {animals.map((animal) => (
        <SwiperSlide
          className="flex justify-center items-center h-full"
          key={animal.id}
        >
          <div className="flex justify-center items-center w-full">
            <AnimalContent animal={animal} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
