import './HomePage.css'
import {useEffect} from "react";
import {homeSLiceAction} from "../../redux/store/slices/homeSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import TrendingSliderComponent from "../../components/trending-slider/TrendingSliderComponent.tsx";
import MoviesCarouselComponent from "../../components/movies-carousel-component/MoviesCarouselComponent.tsx";
import TvShowsCarouselComponent from "../../components/tv-shows-carousel-component/TvShowsCarouselComponent.tsx";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const {trendingMovie, popularMovie, topRatedMovie, popularTvShows, topRatedTvShows, trendingTvShows, status, error} = useAppSelector(state => state.homeSlice)

    useEffect(() => {
        dispatch(homeSLiceAction.loadHomePageContent())
    }, [dispatch]);

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Status: {status}</h2>
            {error && <h3>Error: {error}</h3>}


            {status === 'succeeded' && (
                <div>
                    <TrendingSliderComponent trendingMovies={trendingMovie}/>
                    <MoviesCarouselComponent title="Popular Movies" movies={popularMovie}/>
                    <MoviesCarouselComponent title="Top Rated Movies" movies={topRatedMovie}/>
                    <TvShowsCarouselComponent title="Trending Tv Shows" tvShows={trendingTvShows}/>
                    <TvShowsCarouselComponent title="Popular Tv Shows" tvShows={popularTvShows}/>
                    <TvShowsCarouselComponent title="Top Rated Tv Shows" tvShows={topRatedTvShows}/>
                </div>
            )}
        </div>
    );
};

export default HomePage;