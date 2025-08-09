import axios from 'axios';
import type {IMovie} from "../models/IMovie.ts";
import type {IPaginatedResponse} from "../models/IPaginatedResponse.ts";
import type {IGenreMovies} from "../models/IGenreMovies.ts";
import type {IMovieDetails} from "../models/IMovieDetails/IMovieDetails.ts";
import type {ITvShow} from "../models/ITvShow.ts";
import type {ITvShowDetails} from "../models/ITvShowDetails/ITvShowDetails.ts";
import type {IMultiSearchResult} from "../models/IMultiSearchResult.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWQwMjFmYzcwMDE1MmU2ZTdiMTY3ZTU3Y2U4ZDU4NiIsIm5iZiI6MTc1MzM4MTEwMS4zNjksInN1YiI6IjY4ODI3OGVkNDlmOWE0ZTZlZjcyZTFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7GRIRuWM7QMBp9WIV5jnnF3C7itWxF1ztduuLeueAkM'
    },
});

// Movies Service

export const moviesService = {
    getMovies: async (page: number, genreId?: number | null): Promise<IPaginatedResponse<IMovie>> => {
        const params: { with_genres?: number, page: number } = {page}

        if (genreId) {
            params.with_genres = genreId;
        }
        const {data} = await axiosInstance.get<IPaginatedResponse<IMovie>>('/discover/movie', {params});
        return data
    },
    getById: async (id: string): Promise<IMovieDetails> => {
        const movie = await axiosInstance.get<IMovieDetails>('/movie/' + id);
        return movie.data
    },
    getTrending:async ():Promise<IPaginatedResponse<IMovie>> => {
        const {data} =await axiosInstance.get<IPaginatedResponse<IMovie>>('/trending/movie/week');
        return data;
    },
    getPopular:async ():Promise<IPaginatedResponse<IMovie>> => {
        const {data} =await axiosInstance.get<IPaginatedResponse<IMovie>>('/movie/popular');
        return data;
    },
    getTopRated:async ():Promise<IPaginatedResponse<IMovie>> => {
        const {data} =await axiosInstance.get<IPaginatedResponse<IMovie>>('/movie/top_rated');
        return data;
    }
}

// TV Shows Service
export const tvShowsService = {
    getTvShows: async (page: number, genreId?: number | null): Promise<IPaginatedResponse<ITvShow>> => {

        const params: { with_genres?: number, page: number } = {page}

        if (genreId) {
            params.with_genres = genreId;
        }
        const {data} = await axiosInstance.get<IPaginatedResponse<ITvShow>>('/discover/tv', {params});
        return data
    },
    getById: async (id: string): Promise<ITvShowDetails> => {
        const tvShow = await axiosInstance.get<ITvShowDetails>('/tv/' + id);
        return tvShow.data
    },
    getTrending:async ():Promise<IPaginatedResponse<ITvShow>> => {
        const {data} =await axiosInstance.get<IPaginatedResponse<ITvShow>>('/trending/tv/week');
        return data;
    },
    getPopular:async ():Promise<IPaginatedResponse<ITvShow>> => {
        const {data} =await axiosInstance.get<IPaginatedResponse<ITvShow>>('/tv/popular');
        return data;
    },
    getTopRated:async ():Promise<IPaginatedResponse<ITvShow>> => {
        const {data} =await axiosInstance.get<IPaginatedResponse<ITvShow>>('/tv/top_rated');
        return data;
    }
}
// Genre Service

export const genreService = {
    getMoviesGenre: async (): Promise<IGenreMovies[]> => {
        const {data} = await axiosInstance.get('/genre/movie/list');
        return data.genres
    },
    getTvShowsGenre: async (): Promise<IGenreMovies[]> => {
        const {data} = await axiosInstance.get('/genre/tv/list');
        return data.genres
    }
}

// Search Service

export const searchService = {
    searchMulti: async (query: string, page: number):Promise<IPaginatedResponse<IMultiSearchResult>> => {
        const {data} = await axiosInstance.get<IPaginatedResponse<IMultiSearchResult>>('/search/multi', {
            params: {
                query,
                page
            }
        })
        return data;
    }
}