import './MenuComponent.css'
import {NavLink, useSearchParams} from "react-router-dom";
import {movieSliceActions} from "../../../redux/store/slices/movieSlice.ts";
import {useAppDispatch} from "../../../redux/hooks/useAppDispatch.tsx";

const MenuComponent = () => {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive ? 'active' : ''; // Якщо посилання активне, повертаємо клас 'active'
    };

    const dispatch = useAppDispatch()

    const [query] =useSearchParams();

   const handleMoviesLinkClick = () => {
       const page =query.get('page') || '1';

       dispatch(movieSliceActions.setSelectedGenreId(null));
       dispatch(movieSliceActions.loadMovies(Number(page)))
   }

    return (
        <nav>
            <ul>
                <li><NavLink to={'/'} className={getNavLinkClass}>Home Page</NavLink></li>
                <li><NavLink to={'/movies'} className={getNavLinkClass} onClick={handleMoviesLinkClick}>Movies Page</NavLink></li>
                <li><NavLink to={'/tvshows'} className={getNavLinkClass}>TV Shows Page</NavLink></li>
                <li><NavLink to={'/genre'} className={getNavLinkClass}>Genre Page</NavLink></li>
            </ul>
        </nav>
    );
};

export default MenuComponent;