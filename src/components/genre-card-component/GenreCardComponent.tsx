import './GenreCardComponent.css'
import type {FC} from "react";
import type {IGenre} from "../../models/IGenre.ts";

type GenrePropsType = {
    genre: IGenre
}

const GenreCardComponent:FC<GenrePropsType> = ({genre}) => {
    return (
        <div>
            <button className="genre-card">{genre.name}</button>
        </div>
    );
};

export default GenreCardComponent;