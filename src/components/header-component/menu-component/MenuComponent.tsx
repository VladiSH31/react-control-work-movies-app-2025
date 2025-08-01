import './MenuComponent.css'
import {NavLink} from "react-router-dom";
import {movieSliceActions} from "../../../redux/store/slices/movieSlice.ts";
import {useAppDispatch} from "../../../redux/hooks/useAppDispatch.tsx";

const MenuComponent = () => {
    // Функція, яка буде визначати, які класи застосувати
    const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive ? 'active' : ''; // Якщо посилання активне, повертаємо клас 'active'
    };

    const dispatch = useAppDispatch()

   const handleMoviesLinkClick = () => {
       dispatch(movieSliceActions.setSelectedGenreId(null));
       dispatch(movieSliceActions.loadMovies())
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