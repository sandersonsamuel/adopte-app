"use client";

import { AnimalType } from "@/types/animal.type";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AnimalLink } from "../animal-link";
import { AnimalImg } from "../animal-link/img";

type Props = {
  animals: AnimalType[];
};
export const AnimalCarousel = ({ animals }: Props) => {
  return (
    <Swiper
      title="clique para ver mais detalhes do animal"
      className="w-full"
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
            <AnimalLink animal={animal}>
              <AnimalImg animal={animal} />
            </AnimalLink>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
