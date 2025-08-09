import './TvShowsPage.css'
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useSearchParams} from "react-router-dom";

import PaginationComponent from "../../components/pagination-component/PaginationComponent.tsx";
import TvShowsComponent from "../../components/tv-shows-component/TvShowsComponent.tsx";

const TvShowsPage = () => {
    const { totalPages } = useAppSelector(state => state.tvShowsSlice)
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
            <TvShowsComponent/>
            <PaginationComponent totalPages={totalPages} currentPage={page} onPageChange={handlePageChange}/>
        </div>
    );
};

export default TvShowsPage;