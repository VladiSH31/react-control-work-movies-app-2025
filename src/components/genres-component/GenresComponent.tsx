import './GenresComponent.css'
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {genreSliceAction} from "../../redux/store/slices/genreSlice.ts";
import GenreCardComponent from "../genre-card-component/GenreCardComponent.tsx";

const GenresComponent = () => {
    const dispatch = useAppDispatch();
    const {moviesGenre, tvShowsGenre} = useAppSelector(state => state.genreSlice);

    useEffect(() => {

        if (!moviesGenre.length) {
            dispatch(genreSliceAction.loadMovieGenre())
        }
        if (!tvShowsGenre.length) {
            dispatch(genreSliceAction.loadTvShowGenre())
        }


    }, [moviesGenre.length, tvShowsGenre.length, dispatch]);

    return (

        <div>
            <div className="genres-section">
                <h3 className="genres-title">Movies Genres</h3>
                <div className="genres-container">
                    {
                        moviesGenre.map(genre => <GenreCardComponent key={genre.id} genre={genre}/>)
                    }
                </div>
            </div>

            <div className="genres-section">
                <h3 className="genres-title">TV Shows Genres</h3>
                <div className="genres-container">
                    {
                        tvShowsGenre.map(genre => <GenreCardComponent key={genre.id} genre={genre}/>)
                    }
                </div>
            </div>
        </div>

    );
};

export default GenresComponent;