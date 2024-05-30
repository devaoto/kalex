"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Button, Image } from "@nextui-org/react";

import { Anime } from "@/types/consumet";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/swiper.css";

export function HeroSlider({ animeData }: { animeData: Anime[] }) {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={50}
    >
      {animeData.map((anime) => (
        <SwiperSlide key={anime.id}>
          <div className="relative">
            <Image
              alt={anime.title.english ?? anime.title.romaji}
              className="aspect-video max-h-[250px] min-h-[250px] min-w-[1280px] rounded-none object-cover lg:max-h-[450px] lg:min-h-[450px]"
              src={anime.cover}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent to-black/45">
              <div className="ml-5 flex h-full items-end">
                <div>
                  <h1
                    className="text-xl font-bold md:text-2xl lg:text-3xl"
                    style={{ color: anime.color ?? "#FFFFFF" }}
                  >
                    {anime.title.english ?? anime.title.romaji}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: anime.description.replace(/<br>/g, ""),
                    }}
                    className="hidden max-w-[500px] text-sm md:line-clamp-3 lg:line-clamp-4"
                  />
                  <Button className="mb-5" color="primary" radius="lg">
                    Watch Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
