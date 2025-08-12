import './HeaderComponent.css'
import LogoComponent from "./logo-component/LogoComponent.tsx";
import MenuComponent from "./menu-component/MenuComponent.tsx";
import SearchComponent from "./search-component/SearchComponent.tsx";
import UserInfoComponent from "./user-info-component/UserInfoComponent.tsx";

const HeaderComponent = () => {
    return (
        <header className="app-header">
            <div className="header-container">
                <div className="header-left">
                    <LogoComponent />
                </div>
                <div className="header-center">
                    <MenuComponent />
                </div>
                <div className="header-right">
                    <SearchComponent />
                    <UserInfoComponent />
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;