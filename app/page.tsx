import { use } from "react";

import AnimeSlider from "@/components/Slider";
import Footer from "@/components/footer";
import { getPopularAnime, getTrendingAnime } from "@/functions/anime";
import { HeroSlider } from "@/components/HeroSlider";
import { Link } from "@nextui-org/link";

export default function Home() {
  const [trending, popular] = use(
    Promise.all([getTrendingAnime(), getPopularAnime()]),
  );

  return (
    <div>
      <HeroSlider animeData={trending.results} />
      <div className="mb-2 mt-10 flex justify-between text-4xl font-medium">
        <span>| Trending Anime</span>{" "}
        <Link href="/trending" underline="hover">
          View More
        </Link>
      </div>
      <AnimeSlider animeData={trending.results} />
      <div className="mb-2 mt-10 flex justify-between text-4xl font-medium">
        <span>| All Time Popular</span>{" "}
        <Link href="/popular" underline="hover">
          View More
        </Link>
      </div>
      <AnimeSlider animeData={popular.results} />
      <Footer />
    </div>
  );
}
