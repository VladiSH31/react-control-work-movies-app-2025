import './MoviesPage.css'
import MoviesComponent from "../../components/movies-component/MoviesComponent.tsx";
import PaginationComponent from "../../components/pagination-component/PaginationComponent.tsx";

const MoviesPage = () => {


    return (
        <div>
            <MoviesComponent/>
            <PaginationComponent/>
        </div>
    );
};

export default MoviesPage;