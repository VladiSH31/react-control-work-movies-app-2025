import axios from 'axios';
import type {IMovie} from "../models/IMovie.ts";
import type {IResponseMoviesModel} from "../models/IResponseMoviesModel.ts";
import type {IGenre} from "../models/IGenre.ts";
import type {IMovieDetails} from "../models/IMovieDetails/IMovieDetails.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWQwMjFmYzcwMDE1MmU2ZTdiMTY3ZTU3Y2U4ZDU4NiIsIm5iZiI6MTc1MzM4MTEwMS4zNjksInN1YiI6IjY4ODI3OGVkNDlmOWE0ZTZlZjcyZTFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7GRIRuWM7QMBp9WIV5jnnF3C7itWxF1ztduuLeueAkM'
    },
});

// Movies Service

export const moviesService = {
    getMovies: async (genreId?: number | null):Promise<IMovie[]> => {
        const params = genreId ? {with_genres: genreId} : {}
        const {data} = await axiosInstance.get<IResponseMoviesModel<IMovie>>('/discover/movie', {params});
        return data.results
    },
    getById: async (id: string): Promise<IMovieDetails> => {
        const movie = await axiosInstance.get<IMovieDetails>('/movie/'+id);
        return movie.data
    }
}

// TV Shows Service

// Genre Service

export const genreService = {
    getMoviesGenre: async ():Promise<IGenre[]> => {
       const {data}= await axiosInstance.get('/genre/movie/list');
       return data.genres
    },
    getTvShowsGenre: async ():Promise<IGenre[]> => {
        const {data}= await axiosInstance.get('/genre/tv/list');
        return data.genres
    }
}