import type {IBelongsToCollection} from "./IBelongsToCollection.ts";
import type {IGenreMovies} from "../IGenreMovies.ts";
import type {IProductionCompanies} from "./IProductionCompanies.ts";
import type {IProductionCountries} from "./IProductionCountries.ts";
import type {ISpokenLanguage} from "./ISpokenLanguage.ts";

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongsToCollection;
  budget: number;
  genres: IGenreMovies[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}