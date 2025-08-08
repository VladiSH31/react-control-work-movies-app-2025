import './PaginationComponent.css'
import type {FC} from "react";

type PaginationPropsType = {
    totalPages: number,
    currentPage: number,
    onPageChange: (page: number) => void
}

const PaginationComponent:FC<PaginationPropsType> = ({ totalPages, currentPage, onPageChange}) => {

    const handelOnClickPreviousPage = () => {
        onPageChange(currentPage - 1);
    }

    const handelOnClickNextPage = () => {
        onPageChange(currentPage + 1);
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