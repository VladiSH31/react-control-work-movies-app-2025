import './GenreCardComponent.css'
import type {FC} from "react";
import type {IGenre} from "../../models/IGenre.ts";

type GenrePropsType = {
    genre: IGenre,
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