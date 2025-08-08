import './MoviesPage.css'
import MoviesComponent from "../../components/movies-component/MoviesComponent.tsx";
import PaginationComponent from "../../components/pagination-component/PaginationComponent.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useSearchParams} from "react-router-dom";

const MoviesPage = () => {
    const { totalPages } = useAppSelector(state => state.movieSlice)
    const [searchParams, setSearchParams] = useSearchParams();

    const pg = searchParams.get('page') || '1'
    const page = Number(pg)

    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page.toString());
        setSearchParams(newSearchParams)
    }

    return (
        <div>
            <MoviesComponent/>
            <PaginationComponent totalPages={totalPages} currentPage={page} onPageChange={handlePageChange}/>
        </div>
    );
};

export default MoviesPage;