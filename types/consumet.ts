export interface AnimeTitle {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

export interface AnimeTrailer {
  id?: string;
  site?: string;
  thumbnail: string;
  thumbnailHash: string;
}

export interface Anime {
  id: string;
  malId: number;
  title: AnimeTitle;
  image: string;
  imageHash: string;
  trailer: AnimeTrailer;
  description: string;
  status: string;
  cover: string;
  coverHash: string;
  rating: number;
  releaseDate: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
}

export interface TrendingAnimeResponse {
  currentPage: number;
  hasNextPage: boolean;
  results: Anime[];
}

export interface PopularAnimeResponse {
  currentPage: number;
  hasNextPage: boolean;
  results: Anime[];
}
