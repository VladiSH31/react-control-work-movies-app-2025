import type {IGenreTvShows} from "../IGenreTvShows.ts";
import type {ILastEpisodeToAir} from "./ILastEpisodeToAir.ts";
import type {INetworks} from "./INetworks.ts";
import type {IProductionCountries} from "./IProductionCountries.ts";
import type {ISeason} from "./ISeason.ts";
import type {ISpokenLanguage} from "./ISpokenLanguage.ts";
import type {ICreatedBy} from "./ICreatedBy.ts";
import type {IProductionCompanies} from "../IMovieDetails/IProductionCompanies.ts";


export interface ITvShowDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: ICreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: IGenreTvShows[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: ILastEpisodeToAir;
  name: string;
  next_episode_to_air?: ILastEpisodeToAir | null;
  networks: INetworks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  seasons: ISeason[];
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}