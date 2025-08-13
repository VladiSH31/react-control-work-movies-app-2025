import './SingleTvShowPage.css'
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {tvShowsSliceActions} from "../../redux/store/slices/tvShowsSlice.ts";
import StarsRatingComponent from "../../components/stars-rating-component/StarsRatingComponent.tsx";

const SingleTvShowPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { tvShowDetails, tvShowDetailsStatus, tvShowDetailsError} = useAppSelector(state => state.tvShowsSlice);

    useEffect(() => {
        if (id) {
            dispatch(tvShowsSliceActions.loadTvShowById(id))
        }

    }, [id, dispatch]);

    const handleGenreClick = (genreId: number) => {
        dispatch(tvShowsSliceActions.setSelectedGenreId(genreId));
        dispatch(tvShowsSliceActions.loadTvShows(1));
    };

    if (tvShowDetailsStatus === 'loading') {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-teal-400 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (tvShowDetailsStatus === 'failed') {
        return <div className={'status-error'}>Error: {tvShowDetailsError}</div>;
    }

    if (!tvShowDetails) {
        return <div>No movie details found.</div>;
    }

    const imageUrl = import.meta.env.VITE_API_IMAGE_BASE_URL + tvShowDetails.poster_path;
    return (
        <div className="details-container">
            {/* Ліва колонка з постером */}
            <div className="details-poster-wrapper">
                <img src={imageUrl} alt={`Poster for ${tvShowDetails.name}`} className="details-poster-img" />
            </div>

            {/* Права колонка з інформацією */}
            <div className="details-info-wrapper">
                <h1 className="details-title">{tvShowDetails.name}</h1>

                {/* Теглайн, якщо він є */}
                {tvShowDetails.tagline && <p className="details-tagline">"{tvShowDetails.tagline}"</p>}

                <h3 className="details-section-title">Overview</h3>
                <p>{tvShowDetails.overview}</p>

                <h3 className="details-section-title">Genres</h3>
                <div className="genres-list">
                    {tvShowDetails.genres.map(genre => (
                        <Link
                            key={genre.id}
                            to="/tvshows"
                            className="genre-item"
                            onClick={() => handleGenreClick(genre.id)}
                        >
                            {genre.name}
                        </Link>
                    ))}
                </div>

                <h3 className="details-section-title">Rating</h3>
                <div className="flex items-center gap-4">
                    <StarsRatingComponent rating={tvShowDetails.vote_average} />
                    <p className="m-0">{tvShowDetails.vote_average.toFixed(1)} / 10 ({tvShowDetails.vote_count.toLocaleString()} votes)</p>
                </div>

                <h3 className="details-section-title">Additional Details</h3>
                <ul className="details-list">
                    <li><strong>First Air Date:</strong> {tvShowDetails.first_air_date}</li>
                    {tvShowDetails.episode_run_time && tvShowDetails.episode_run_time[0] && (
                        <li><strong>Episode Runtime:</strong> {tvShowDetails.episode_run_time[0]} minutes</li>
                    )}
                    <li><strong>Seasons:</strong> {tvShowDetails.number_of_seasons}</li>
                    <li><strong>Episodes:</strong> {tvShowDetails.number_of_episodes}</li>
                    <li><strong>Status:</strong> {tvShowDetails.status}</li>
                </ul>

                <div className="details-links">
                    {tvShowDetails.homepage && <a href={tvShowDetails.homepage} target="_blank" rel="noopener noreferrer" className="details-link-item">Website</a>}
                </div>
            </div>
        </div>
    );
};

export default SingleTvShowPage;