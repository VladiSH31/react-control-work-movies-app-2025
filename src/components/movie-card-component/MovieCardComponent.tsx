import './MovieCardComponent.css'
import type {IMovie} from "../../models/IMovie.ts";
import type {FC} from "react";
import {Link} from "react-router-dom";

type MoviePropsType = {
    movie: IMovie
}

const MovieCardComponent: FC<MoviePropsType> = ({movie}) => {
    const imageUrl = import.meta.env.VITE_API_IMAGE_BASE_URL

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-title-container">
                    <h2 className="movie-title">{movie.title}</h2>
                </div>

                <img src={imageUrl + movie.poster_path} alt={movie.title}/>
            </div>
        </Link>

    );
};

export default MovieCardComponent;