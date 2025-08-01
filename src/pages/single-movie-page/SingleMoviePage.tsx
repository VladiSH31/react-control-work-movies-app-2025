import './SingleMoviePage.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {IMovieDetails} from "../../models/IMovieDetails/IMovieDetails.ts";
import {moviesService} from "../../services/global.api.service.ts";

const SingleMoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<IMovieDetails | null>(null);

    useEffect(() => {
        if (id) {
            moviesService.getById(id).then(movie => setMovie(movie))
        }

    }, [id]);

    if (!movie) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-teal-400 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

   const imageUrl = import.meta.env.VITE_API_IMAGE_BASE_URL + movie.poster_path;
    return (
        <div className="details-container">
            {/* Ліва колонка з постером */}
            <div className="details-poster-wrapper">
                <img src={imageUrl} alt={`Poster for ${movie.title}`} className="details-poster-img" />
            </div>

            {/* Права колонка з інформацією */}
            <div className="details-info-wrapper">
                <h1 className="details-title">{movie.title}</h1>

                {/* Теглайн, якщо він є */}
                {movie.tagline && <p className="details-tagline">"{movie.tagline}"</p>}

                <h3 className="details-section-title">Overview</h3>
                <p>{movie.overview}</p>

                <h3 className="details-section-title">Genres</h3>
                <div className="genres-list">
                    {movie.genres.map(genre => (
                        <span key={genre.id} className="genre-item">{genre.name}</span>
                    ))}
                </div>

                <h3 className="details-section-title">Rating</h3>
                <p>{movie.vote_average.toFixed(1)} / 10 (based on {movie.vote_count.toLocaleString()} votes)</p>

                <h3 className="details-section-title">Additional Details</h3>
                <ul className="details-list">
                    <li><strong>Release Date:</strong> {movie.release_date}</li>
                    <li><strong>Runtime:</strong> {movie.runtime} minutes</li>
                    <li><strong>Budget:</strong> ${movie.budget.toLocaleString()}</li>
                    <li><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</li>
                    <li><strong>Status:</strong> {movie.status}</li>
                </ul>

                <div className="details-links">
                    {movie.homepage && <a href={movie.homepage} target="_blank" rel="noopener noreferrer">Website</a>}
                    {movie.imdb_id && <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">IMDb Page</a>}
                </div>
            </div>
        </div>
    );
};

export default SingleMoviePage;