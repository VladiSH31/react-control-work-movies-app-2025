import {type FC} from 'react';
import type {IMovie} from "../../models/IMovie.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import MovieCardComponent from "../movie-card-component/MovieCardComponent.tsx";
import {Navigation} from "swiper/modules";
import styles from './MoviesCarouselComponent.module.css';


type MovieCarouselProps = {
    title: string,
    movies: IMovie[]

}

const MoviesCarouselComponent:FC<MovieCarouselProps> = ({title, movies}) => {
    return (
        <div>
            <h2 className={styles.carouselTitle}>{title}</h2>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={30}
                slidesPerView={5}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    480: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 5, spaceBetween: 30 },
                }}
            >
                {
                    movies.map(movie => (
                        <SwiperSlide key={movie.id} className={styles.slide}>
                            <MovieCardComponent movie={movie}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default MoviesCarouselComponent;