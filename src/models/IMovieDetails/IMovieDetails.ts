import type {IBelongs_to_collection} from "./IBelongs_to_collection.ts";
import type {IGenreMovies} from "../IGenreMovies.ts";
import type {IProductionCompanies} from "./IProductionCompanies.ts";
import type {IProductionCountries} from "./IProductionCountries.ts";
import type {ISpoken_language} from "./ISpoken_language.ts";

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongs_to_collection;
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
  spoken_languages: ISpoken_language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}