import './GenreCardComponent.css'
import type {FC} from "react";
import type {IGenreMovies} from "../../models/IGenreMovies.ts";

type GenrePropsType = {
    genre: IGenreMovies,
    onClick: (id: number) => void;
}

const GenreCardComponent:FC<GenrePropsType> = ({genre, onClick}) => {
    return (
        <div>
            <button className="genre-card" onClick={() => onClick(genre.id)}>{genre.name}</button>
        </div>
    );
};

export default GenreCardComponent;