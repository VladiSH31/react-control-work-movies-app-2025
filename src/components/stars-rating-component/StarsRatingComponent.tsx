import {type FC} from 'react';
import StarRatings from 'react-star-ratings';

type StarRatingProps = {
    rating: number
}

const StarsRatingComponent:FC<StarRatingProps> = ({ rating }) => {

    const ratingStars = rating / 2


    return (
        <div>
            <StarRatings
                rating={ratingStars}
                starRatedColor="gold" // Колір заповнених зірок
                starEmptyColor="grey" // Колір порожніх зірок
                numberOfStars={5} // Загальна кількість зірок
                name='rating'
                starDimension="20px" // Розмір кожної зірки
                starSpacing="2px" // Відстань між зірками
            />
        </div>
    );
};

export default StarsRatingComponent;