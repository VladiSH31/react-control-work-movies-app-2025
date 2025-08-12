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
                navigation // Вмикаємо стрілки
                spaceBetween={30} // Відстань між картками

                // Ось головна магія! Показуємо кілька слайдів.
                slidesPerView={5}

                // Робимо його адаптивним для різних екранів
                breakpoints={{
                    // для мобільних телефонів
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    480: { slidesPerView: 2, spaceBetween: 20 },
                    // для планшетів
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    // для десктопів
                    1024: { slidesPerView: 5, spaceBetween: 30 },
                }}
            >
                {
                    movies.map(movie => (
                        <SwiperSlide key={movie.id} className={styles.slide}>
                            {/* Просто використовуємо ваш готовий компонент! */}
                            <MovieCardComponent movie={movie}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default MoviesCarouselComponent;