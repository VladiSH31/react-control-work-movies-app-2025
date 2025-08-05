import './MovieCardComponent.css'
import type {IMovie} from "../../models/IMovie.ts";
import type {FC} from "react";
import {Link} from "react-router-dom";


type MoviePropsType = {
    movie: IMovie
}

const MovieCardComponent: FC<MoviePropsType> = ({movie}) => {


    let imageUrl;

    if (movie.poster_path) {
        imageUrl = import.meta.env.VITE_API_IMAGE_BASE_URL + movie.poster_path;
    } else {
        imageUrl = 'https://placehold.co/500x750/2d3748/e2e8f0?text=No+Image'
    }


    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-title-container">
                    <h2 className="movie-title">{movie.title}</h2>
                </div>

                <img src={imageUrl} alt={movie.title}/>
            </div>
        </Link>

    );
};

export default MovieCardComponent;