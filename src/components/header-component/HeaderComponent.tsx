import './HeaderComponent.css'
import LogoComponent from "./logo-component/LogoComponent.tsx";
import MenuComponent from "./menu-component/MenuComponent.tsx";
import SearchComponent from "./search-component/SearchComponent.tsx";
import UserInfoComponent from "./user-info-component/UserInfoComponent.tsx";
import {useState} from "react";

const HeaderComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="app-header relative">

            <div className="header-container">

                <div className="header-left">
                    <LogoComponent />
                </div>

                <div className="header-center hidden lg:block">
                    <MenuComponent />
                </div>

                <div className="header-right">
                    <div className="hidden md:block">
                        <SearchComponent />
                    </div>
                    <div className="hidden lg:flex">
                        <UserInfoComponent />
                    </div>

                    {/*Меню гамбургер*/}
                    <button
                        className="hamburger-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

            </div>

            {/* Мобільне меню */}
            {isMenuOpen && (
                <div id="mobile-menu" className="mobile-menu-container">
                    <MenuComponent />
                </div>
            )}

        </header>
    );
};

export default HeaderComponent;