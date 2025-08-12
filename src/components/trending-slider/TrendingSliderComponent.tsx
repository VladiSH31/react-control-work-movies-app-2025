import {type FC} from 'react';
import type {IMovie} from "../../models/IMovie.ts";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import styles from './TrendingSliderComponent.module.css';
import {Link} from "react-router-dom";


type TrendingMoviesProps = {
    trendingMovies: IMovie[];
}


const TrendingSliderComponent: FC<TrendingMoviesProps> = ({trendingMovies}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{clickable: true}}
            loop={true}>
            {
                trendingMovies.map(movie =>
                    <SwiperSlide key={movie.id} className={styles.slide}>
                        <Link to={`/movie/${movie.id}`} className={styles.slideLink}>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                alt={`${movie.title}`}
                                className={styles.slideImage}
                            />

                            <div className={styles.slideContent}>
                                <h2 className={styles.slideTitle}>{movie.title}</h2>
                            </div>
                        </Link>
                    </SwiperSlide>)
            }
        </Swiper>
    );
};

export default TrendingSliderComponent;