import './SearchPage.css'
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {searchSliceAction} from "../../redux/store/slices/searchSlice.ts";
import MovieCardComponent from "../../components/movie-card-component/MovieCardComponent.tsx";

const SearchPage = () => {
    const dispatch = useAppDispatch();
    const {searchMovieResult, status, error} = useAppSelector(state => state.searchSlice)
    const [searchParams] = useSearchParams();

    const query = searchParams.get('query');
    const pg = searchParams.get('page') || '1'
    const page = Number(pg)


    useEffect(() => {
        if (query) {
           dispatch(searchSliceAction.searchMovie({query, page}))
        }
    }, [query, page, dispatch]);

    if (status === 'loading') {
        return <div className={'spinner-container'}>
            <div className={'spinner'}></div>
        </div>
    }
    if (status === 'failed') {
        return <div className={'status-error'}>Error: {error}</div>
    }

    if (!query) {
        return <div className="text-center text-white text-2xl mt-10">
            Please enter something to search for.
        </div>
    }
 let result;
    if (searchMovieResult.length > 0) {
        result = (
            <div className="search-results-grid">
                {
                    searchMovieResult.map(movie => <MovieCardComponent key={movie.id} movie={movie}/>)
                }
            </div>
        )

    } else {
        result = (
            <div className="no-results-message">
                No movies found for "{query}". Please try another search term.
            </div>
            )

    }

    return <div className="search-page-container">
        <h1 className="search-page-title">
            Search results for: <span className="search-query-highlight">"{query}"</span>
        </h1>

        {result}
    </div>
};

export default SearchPage;