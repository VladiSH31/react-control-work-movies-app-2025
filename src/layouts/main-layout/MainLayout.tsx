import './MainLayout.css'
import {Outlet} from "react-router-dom";
import HeaderComponent from "../../components/header-component/HeaderComponent.tsx";

const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;