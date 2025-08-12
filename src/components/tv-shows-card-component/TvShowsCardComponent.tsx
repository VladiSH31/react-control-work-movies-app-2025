import './TvShowsCardComponent.css'
import type {FC} from "react";
import {Link} from "react-router-dom";
import type {ITvShow} from "../../models/ITvShow.ts";
import StarsRatingComponent from "../stars-rating-component/StarsRatingComponent.tsx";


type TvShowPropsType = {
    tvShow: ITvShow
}

const TvShowsCardComponent: FC<TvShowPropsType> = ({tvShow}) => {


    let imageUrl;

    if (tvShow.poster_path) {
        imageUrl = import.meta.env.VITE_API_IMAGE_BASE_URL + tvShow.poster_path;
    } else {
        imageUrl = 'https://placehold.co/500x750/2d3748/e2e8f0?text=No+Image'
    }


    return (
        <Link to={`/tvshows/${tvShow.id}`} className="tv-shows-card-link">
            <div className="tv-shows-card">
                <div className="tv-shows-title-container">
                    <h2 className="tv-shows-title">{tvShow.name}</h2>
                    <StarsRatingComponent rating={tvShow.vote_average} />
                </div>

                <img src={imageUrl} alt={tvShow.name}/>
            </div>
        </Link>

    );
};

export default TvShowsCardComponent;