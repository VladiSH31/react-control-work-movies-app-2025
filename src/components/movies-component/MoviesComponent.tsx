import './MoviesComponent.css'
import {moviesService} from "../../services/global.api.service.ts";
import {useEffect, useState} from "react";
import type {IMovie} from "../../models/IMovie.ts";
import MovieCardComponent from "../movie-card-component/MovieCardComponent.tsx";

const MoviesComponent = () => {
    const [movies, setMovies] = useState<IMovie[]>([])

    useEffect(() => {
        moviesService.getAll().then(value => setMovies(value))
    }, []);

    return (
        <div>
            {
                movies.map(movie => <MovieCardComponent movie={movie}/>)
            }
        </div>
    );
};

export default MoviesComponent;