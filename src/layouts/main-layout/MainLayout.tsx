import './MainLayout.css'
import {Outlet} from "react-router-dom";
import HeaderComponent from "../../components/header-component/HeaderComponent.tsx";

const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <main className={"p-6"}>
                <Outlet/>
            </main>

        </div>
    );
};

export default MainLayout;