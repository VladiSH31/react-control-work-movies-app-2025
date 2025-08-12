import {type FC} from 'react';
import type {ITvShow} from "../../models/ITvShow.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import TvShowsCardComponent from "../tv-shows-card-component/TvShowsCardComponent.tsx";
import styles from './TvShowsCarouselComponent.module.css'


type TvShowsCarouselProps = {
    title: string,
    tvShows: ITvShow[]

}

const TvShowsCarouselComponent:FC<TvShowsCarouselProps> = ({title, tvShows}) => {
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
                    tvShows.map(tvShow => (
                        <SwiperSlide key={tvShow.id} className={styles.slide}>
                            {/* Просто використовуємо ваш готовий компонент! */}
                            <TvShowsCardComponent tvShow={tvShow}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default TvShowsCarouselComponent;