import './SingleMoviePage.css';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {movieSliceActions} from "../../redux/store/slices/movieSlice.ts";

const SingleMoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { movieDetails, movieDetailsStatus, movieDetailsError} = useAppSelector(state => state.movieSlice);

    useEffect(() => {
        if (id) {
            dispatch(movieSliceActions.loadMovieById(id))
        }

    }, [id, dispatch]);

    if (movieDetailsStatus === 'loading') {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-teal-400 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (movieDetailsStatus === 'failed') {
        return <div className={'status-error'}>Error: {movieDetailsError}</div>;
    }

    if (!movieDetails) {
        return <div>No movie details found.</div>;
    }

   const imageUrl = import.meta.env.VITE_API_IMAGE_BASE_URL + movieDetails.poster_path;
    return (
        <div className="details-container">
            {/* Ліва колонка з постером */}
            <div className="details-poster-wrapper">
                <img src={imageUrl} alt={`Poster for ${movieDetails.title}`} className="details-poster-img" />
            </div>

            {/* Права колонка з інформацією */}
            <div className="details-info-wrapper">
                <h1 className="details-title">{movieDetails.title}</h1>

                {/* Теглайн, якщо він є */}
                {movieDetails.tagline && <p className="details-tagline">"{movieDetails.tagline}"</p>}

                <h3 className="details-section-title">Overview</h3>
                <p>{movieDetails.overview}</p>

                <h3 className="details-section-title">Genres</h3>
                <div className="genres-list">
                    {movieDetails.genres.map(genre => (
                        <span key={genre.id} className="genre-item">{genre.name}</span>
                    ))}
                </div>

                <h3 className="details-section-title">Rating</h3>
                <p>{movieDetails.vote_average.toFixed(1)} / 10 (based on {movieDetails.vote_count.toLocaleString()} votes)</p>

                <h3 className="details-section-title">Additional Details</h3>
                <ul className="details-list">
                    <li><strong>Release Date:</strong> {movieDetails.release_date}</li>
                    <li><strong>Runtime:</strong> {movieDetails.runtime} minutes</li>
                    <li><strong>Budget:</strong> ${movieDetails.budget.toLocaleString()}</li>
                    <li><strong>Revenue:</strong> ${movieDetails.revenue.toLocaleString()}</li>
                    <li><strong>Status:</strong> {movieDetails.status}</li>
                </ul>

                <div className="details-links">
                    {movieDetails.homepage && <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer">Website</a>}
                    {movieDetails.imdb_id && <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`} target="_blank" rel="noopener noreferrer">IMDb Page</a>}
                </div>
            </div>
        </div>
    );
};

export default SingleMoviePage;