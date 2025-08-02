import './PaginationComponent.css'

import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";

const PaginationComponent = () => {
    const [, setQuery] = useSearchParams()
    const {currentPage, totalPages}=useAppSelector(state => state.movieSlice)

    const handelOnClickPreviousPage = () => {
        setQuery({ page: (currentPage - 1).toString() });
    }

    const handelOnClickNextPage = () => {
        setQuery({ page: (currentPage + 1).toString() });
    }

    if (totalPages <= 1) {
        return null;
    }
    const displayTotalPages = totalPages > 500 ? 500 : totalPages;
    return (
        <div className="pagination-container">
            <button onClick={handelOnClickPreviousPage} disabled={currentPage <= 1}>Previous Page</button>
            <span>Page {currentPage} of {displayTotalPages}</span>
            <button onClick={handelOnClickNextPage} disabled={currentPage >= 500}>Next Page</button>
        </div>
    );
};

export default PaginationComponent;