import './GenrePage.css'
import {useEffect, useState} from "react";
import type {IGenre} from "../../models/IGenre.ts";
import {genreService} from "../../services/global.api.service.ts";

const GenrePage = () => {
    const [genres, setGenres] = useState<IGenre[]>([])
    useEffect(() => {
        genreService.getMoviesGenre().then(value => setGenres(value))
    }, []);

    return (
        <div>
            Genre Page
            {
                genres.map(genre => <div>{genre.name} {genre.id}</div>)
            }
        </div>
    );
};

export default GenrePage;