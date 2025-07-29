import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/main-layout/MainLayout.tsx";
import HomePage from "../pages/home-page/HomePage.tsx";
import MoviesPage from "../pages/movies-page/MoviesPage.tsx";
import TvShowsPage from "../pages/tv-shows-page/TvShowsPage.tsx";
import GenrePage from "../pages/genre-page/GenrePage.tsx";

export const router = createBrowserRouter([
    {path: '/', element:<MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: 'movies', element: <MoviesPage/>},
            {path: 'tvshows', element: <TvShowsPage/>},
            {path: 'genre', element: <GenrePage/>}
        ]}
])