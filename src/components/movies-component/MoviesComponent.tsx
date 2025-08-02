import './MoviesComponent.css'
import {useEffect} from "react";
import MovieCardComponent from "../movie-card-component/MovieCardComponent.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {movieSliceActions} from "../../redux/store/slices/movieSlice.ts";
import {genreSliceAction} from "../../redux/store/slices/genreSlice.ts";
import {useSearchParams} from "react-router-dom";

const MoviesComponent = () => {


    const dispatch = useAppDispatch();
    const {movies, selectedGenreId, status, error} =useAppSelector(({movieSlice}) => movieSlice)
    const {moviesGenre} =useAppSelector(state => state.genreSlice)


    const [query] =useSearchParams()

    useEffect(() => {
        const page = query.get('page') || '1';

        dispatch(movieSliceActions.loadMovies(Number(page)));

        if (!moviesGenre.length) {
            dispatch(genreSliceAction.loadMovieGenre())
        }

    }, [query, dispatch, moviesGenre.length]);

    const selectedGenre = moviesGenre.find(genre => genre.id === selectedGenreId)

    const pageTitle = selectedGenre ? `Showing results for: ${selectedGenre.name}`
        : "All Movies";

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-teal-400 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="movies-page-title">{pageTitle}</h2>
            <div className="movies-grid">
                {
                    movies.map((movie) => <MovieCardComponent key={movie.id} movie={movie}/>)
                }
            </div>
        </div>

    );
};

export default MoviesComponent;