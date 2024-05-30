"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Image, Link } from "@nextui-org/react";
import { EmblaOptionsType } from "embla-carousel";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import { Anime } from "@/types/consumet";
import "@/styles/slider.css";

export default function AnimeSlider({
  animeData,
  options,
}: {
  animeData: Anime[];
  options?: EmblaOptionsType;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla relative min-w-full">
      <div className="">
        <div className="group">
          <div className="from-transparent-gr to-transparent-gr group-hover:to-gradient-rgba absolute  z-[69420] flex h-full cursor-pointer items-center bg-gradient-to-r transition-all duration-500 ease-out group-hover:from-[#000000]">
            <PrevButton
              disabled={prevBtnDisabled}
              onClick={onPrevButtonClick}
            />
          </div>
          <div className="from-transparent-gr to-transparent-gr group-hover:to-gradient-rgba absolute right-0 z-[69420] flex h-full cursor-pointer items-center bg-gradient-to-l transition-all duration-500 ease-out group-hover:from-[#000000]">
            <NextButton
              disabled={nextBtnDisabled}
              onClick={onNextButtonClick}
            />
          </div>
        </div>
      </div>
      <div ref={emblaRef as any} className="embla__viewport">
        <div className="embla__container">
          {animeData.map((anime) => (
            <div key={anime.id} className="embla__slide">
              <Link
                className="flex flex-col items-start text-foreground"
                href={`/info/${anime.id}?releasing=${anime.status === "Ongoing"}`}
              >
                <Image
                  alt={anime.title.english ?? anime.title.romaji}
                  className="max-h-[290px] min-h-[290px] min-w-[225px] max-w-[225px] object-cover"
                  src={anime.image}
                />
                <h1 className="mt-1 max-w-[225px] truncate font-semibold">
                  {anime.title.english ??
                    anime.title.userPreferred ??
                    anime.title.romaji}
                </h1>
                <div className="flex items-center gap-2 font-medium">
                  <p>{anime.status}</p>
                  <div className="size-[6px] rounded-full bg-foreground" />
                  <p>
                    {anime.totalEpisodes}{" "}
                    {anime.status === "Completed" ? "EPS" : "Episodes"}
                  </p>
                  <div className="size-[6px] rounded-full bg-foreground" />
                  <p>{anime.type}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
