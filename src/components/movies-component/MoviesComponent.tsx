import './MoviesComponent.css'
import {useEffect} from "react";
import MovieCardComponent from "../movie-card-component/MovieCardComponent.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {movieSliceActions} from "../../redux/store/slices/movieSlice.ts";

const MoviesComponent = () => {


    const dispatch = useAppDispatch();
    const {movies} =useAppSelector(({movieSlice}) => movieSlice)

    useEffect(() => {
        dispatch(movieSliceActions.loadMovies())
    }, [dispatch]);

    return (
        <div className="movies-grid">
            {
                movies.map((movie) => <MovieCardComponent key={movie.id} movie={movie}/>)
            }
        </div>
    );
};

export default MoviesComponent;