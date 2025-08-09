import './GenresComponent.css'
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {genreSliceAction} from "../../redux/store/slices/genreSlice.ts";
import GenreCardComponent from "../genre-card-component/GenreCardComponent.tsx";
import {useNavigate} from "react-router-dom";
import {movieSliceActions} from "../../redux/store/slices/movieSlice.ts";
import {tvShowsSliceActions} from "../../redux/store/slices/tvShowsSlice.ts";

const GenresComponent = () => {

    const dispatch = useAppDispatch();
    const {moviesGenre, tvShowsGenre} = useAppSelector(state => state.genreSlice);
    const navigate = useNavigate();

    useEffect(() => {

        if (!moviesGenre.length) {
            dispatch(genreSliceAction.loadMovieGenre())
        }
        if (!tvShowsGenre.length) {
            dispatch(genreSliceAction.loadTvShowGenre())
        }


    }, [moviesGenre.length, tvShowsGenre.length, dispatch]);

    const handleMovieGenreClick = (genreId: number) => {
        dispatch(movieSliceActions.setSelectedGenreId(genreId));
        dispatch(movieSliceActions.loadMovies(1))
        navigate('/movies')
    }

    const handleTvShowsGenreClick = (genreId: number) => {
        dispatch(tvShowsSliceActions.setSelectedGenreId(genreId));
        dispatch(tvShowsSliceActions.loadTvShows(1))
        navigate('/tvshows')
    }

    return (

        <div>
            <div className="genres-section">
                <h3 className="genres-title">Movies Genres</h3>
                <div className="genres-container">
                    {
                        moviesGenre.map(genre => <GenreCardComponent key={genre.id} genre={genre} onClick={handleMovieGenreClick}/>)
                    }
                </div>
            </div>

            <div className="genres-section">
                <h3 className="genres-title">TV Shows Genres</h3>
                <div className="genres-container">
                    {
                        tvShowsGenre.map(genre => <GenreCardComponent key={genre.id} genre={genre} onClick={handleTvShowsGenreClick}/>)
                    }
                </div>
            </div>
        </div>

    );
};

export default GenresComponent;