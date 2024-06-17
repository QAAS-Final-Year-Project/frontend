import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

type StarRatingProps = {
  totalStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
};

const StarRatingInput: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (rating: number) => {
    setRating(rating);
    if (onRatingChange) {
      onRatingChange(rating);
    }
  };

  return (
    <div className='flex space-x-1'>
      {Array.from({ length: totalStars }, (_, index) => index + 1).map(
        (star) => (
          <button
            key={star}
            type='button'
            className='focus:outline-none'
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            {star <= (hover || rating) ? (
              <StarIcon className='w-6 h-6 text-yellow-400' />
            ) : (
              <StarOutlineIcon className='w-6 h-6 text-yellow-400' />
            )}
          </button>
        )
      )}
    </div>
  );
};

export default StarRatingInput;
