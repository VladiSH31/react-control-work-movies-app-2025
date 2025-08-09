import type {IMovie} from "./IMovie.ts";
import type {ITvShow} from "./ITvShow.ts";

export type IMultiSearchResult = (IMovie | ITvShow) & { media_type: 'movie' | 'tv' };
