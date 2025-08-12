import './HomePage.module.css'
import {useEffect} from "react";
import {homeSLiceAction} from "../../redux/store/slices/homeSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import TrendingSliderComponent from "../../components/trending-slider/TrendingSliderComponent.tsx";
import MoviesCarouselComponent from "../../components/movies-carousel-component/MoviesCarouselComponent.tsx";
import TvShowsCarouselComponent from "../../components/tv-shows-carousel-component/TvShowsCarouselComponent.tsx";
import styles from './HomePage.module.css';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const {trendingMovie, popularMovie, topRatedMovie, popularTvShows, topRatedTvShows, trendingTvShows, status, error} = useAppSelector(state => state.homeSlice)

    useEffect(() => {
        if (status !== 'succeeded' && status !== 'loading') {
            dispatch(homeSLiceAction.loadHomePageContent());
        }
    }, [dispatch, status]);

    if (error) {
        return <div className="text-red-500 text-center p-8">Error: {error}</div>;
    }
    if (status !== 'succeeded') {
        return <div className="flex justify-center items-center h-[50vh]">
            <div className="w-12 h-12 border-4 border-teal-400 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
    }
    return (
        <div className={styles.pageContainer}>
            <TrendingSliderComponent trendingMovies={trendingMovie}/>
            <div className={styles.carouselsWrapper}>
                <MoviesCarouselComponent title="Popular Movies" movies={popularMovie}/>
                <MoviesCarouselComponent title="Top Rated Movies" movies={topRatedMovie}/>
                <TvShowsCarouselComponent title="Trending Tv Shows" tvShows={trendingTvShows}/>
                <TvShowsCarouselComponent title="Popular Tv Shows" tvShows={popularTvShows}/>
                <TvShowsCarouselComponent title="Top Rated Tv Shows" tvShows={topRatedTvShows}/>
            </div>
        </div>
    );
};

export default HomePage;