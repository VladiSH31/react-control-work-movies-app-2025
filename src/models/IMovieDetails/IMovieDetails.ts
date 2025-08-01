import type {IBelongs_to_collection} from "./IBelongs_to_collection.ts";
import type {IGenre} from "../IGenre.ts";
import type {IProduction_companies} from "./IProduction_companies.ts";
import type {IProduction_countries} from "./IProduction_countries.ts";
import type {ISpoken_language} from "./ISpoken_language.ts";

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongs_to_collection;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProduction_companies[];
  production_countries: IProduction_countries[];
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