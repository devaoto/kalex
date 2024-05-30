import { use } from "react";

import AnimeSlider from "@/components/Slider";
import Footer from "@/components/footer";
import { getPopularAnime, getTrendingAnime } from "@/functions/anime";

export default function Home() {
  const [trending, popular] = use(
    Promise.all([getTrendingAnime(), getPopularAnime()]),
  );

  return (
    <div>
      <h1 className="text-4xl font-bold">Trending Anime</h1>
      <AnimeSlider animeData={trending.results} />
      <h1 className="mt-10 text-4xl font-bold">All Time Popular</h1>
      <AnimeSlider animeData={popular.results} />
      <Footer />
    </div>
  );
}
