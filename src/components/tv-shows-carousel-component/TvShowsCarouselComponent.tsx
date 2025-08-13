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
                    tvShows.map(tvShow => (
                        <SwiperSlide key={tvShow.id} className={styles.slide}>
                            <TvShowsCardComponent tvShow={tvShow}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default TvShowsCarouselComponent;