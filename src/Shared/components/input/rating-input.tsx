import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import _ from "lodash";

type StarRatingProps = {
  totalStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  id: string;
  errors?: any;
  touched?: any;
};

const StarRatingInput: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
  errors,
  touched,
  id,
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
    <>
      <div className='flex space-x-1 mb-1'>
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
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {_.get(errors, id)}
        </p>
      ) : null}
    </>
  );
};

export default StarRatingInput;
