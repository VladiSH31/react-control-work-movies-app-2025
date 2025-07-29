import './MenuComponent.css'
import {NavLink} from "react-router-dom";

const MenuComponent = () => {
    // Функція, яка буде визначати, які класи застосувати
    const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive ? 'active' : ''; // Якщо посилання активне, повертаємо клас 'active'
    };

    return (
        <nav>
            <ul>
                <li><NavLink to={'/'} className={getNavLinkClass}>Home Page</NavLink></li>
                <li><NavLink to={'/movies'} className={getNavLinkClass}>Movies Page</NavLink></li>
                <li><NavLink to={'/tvshows'} className={getNavLinkClass}>TV Shows Page</NavLink></li>
                <li><NavLink to={'/genre'} className={getNavLinkClass}>Genre Page</NavLink></li>
            </ul>
        </nav>
    );
};

export default MenuComponent;