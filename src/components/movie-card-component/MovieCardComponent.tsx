import './MovieCardComponent.css'
import type {IMovie} from "../../models/IMovie.ts";
import type {FC} from "react";

type MoviePropsType = {
    movie: IMovie
}

const MovieCardComponent:FC<MoviePropsType> = ({movie}) => {
    const imageUrl = import.meta.env.VITE_API_IMAGE_BASE_URL

    return (
        <div>
            <h4>{movie.title}</h4>
            <img src={imageUrl+movie.poster_path} alt={movie.title} />
        </div>
    );
};

export default MovieCardComponent;