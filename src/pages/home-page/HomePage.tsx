import './HomePage.css'
import {useEffect} from "react";
import {homeSLiceAction} from "../../redux/store/slices/homeSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import TrendingSliderComponent from "../../components/trending-slider/TrendingSliderComponent.tsx";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const {trendingMovie,status, error} = useAppSelector(state => state.homeSlice)

    useEffect(() => {
        dispatch(homeSLiceAction.loadHomePageContent())
    }, [dispatch]);

    return (
        <div>
            <h1>Home Page</h1>
            <h2>Status: {status}</h2>
            {error && <h3>Error: {error}</h3>}


            {status === 'succeeded' && (
                <TrendingSliderComponent trendingMovies={trendingMovie} />
            )}
        </div>
    );
};

export default HomePage;