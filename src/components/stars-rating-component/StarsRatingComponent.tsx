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
                starRatedColor="gold"
                starEmptyColor="grey"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="2px"
            />
        </div>
    );
};

export default StarsRatingComponent;