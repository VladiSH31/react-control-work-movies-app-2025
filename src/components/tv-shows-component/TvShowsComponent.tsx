import './TvShowsComponent.css'
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {genreSliceAction} from "../../redux/store/slices/genreSlice.ts";
import {useSearchParams} from "react-router-dom";
import {tvShowsSliceActions} from "../../redux/store/slices/tvShowsSlice.ts";
import TvShowsCardComponent from "../tv-shows-card-component/TvShowsCardComponent.tsx";

const TvShowsComponent = () => {


    const dispatch = useAppDispatch();
    const {tvShows, selectedGenreId, status, error} =useAppSelector(({tvShowsSlice}) => tvShowsSlice)
    const {tvShowsGenre} =useAppSelector(state => state.genreSlice)


    const [query] =useSearchParams()

    useEffect(() => {
        const page = query.get('page') || '1';

        dispatch(tvShowsSliceActions.loadTvShows(Number(page)));

        if (!tvShowsGenre.length) {
            dispatch(genreSliceAction.loadTvShowGenre())
        }

    }, [query, dispatch, tvShowsGenre.length]);

    const selectedGenre = tvShowsGenre.find(genre => genre.id === selectedGenreId)

    const pageTitle = selectedGenre ? `Showing results for: ${selectedGenre.name}`
        : "All Tv Shows";

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-teal-400 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="tv-shows-page-title">{pageTitle}</h2>
            <div className="tv-shows-grid">
                {
                    tvShows.map((tvShow) => <TvShowsCardComponent key={tvShow.id} tvShow={tvShow}/>)
                }
            </div>
        </div>

    );
};

export default TvShowsComponent;