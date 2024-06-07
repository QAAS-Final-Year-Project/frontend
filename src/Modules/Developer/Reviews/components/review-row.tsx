import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import RatingComponent from "Shared/components/status/rating";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ReviewRowProps {
  taskName: string;
  isRated: boolean;
  review?: string;
  rating?: number;
  date?: string;
}

const ReviewRow: FC<ReviewRowProps> = ({
  taskName,
  isRated,
  review,
  rating,
  date,
}) => {
  return (
    <div className='py-[22px] px-[30px]  border-b border-neutral-200 hover:bg-[#fcfcfc]'>
        <div className='flex gap-x-1 mb-1 items-center '>
          <div className="text-zinc-800 text-lg font-semibold font-['Nunito'] leading-[30px]">
            {taskName}
          </div>
        </div>
        {!isRated ? (
          <>
            <div className=' text-stone-500 bg-zinc-100 px-[9px] py-[7px] mt-2 mb-5 !text-sm inline-flex rounded items-center justify-center'>
              Not Rated
            </div>
            <PrimaryButton
              size='sm'
              icon={"ic:outline-thumb-up-alt"}
              text='Leave Review'
              iconPosition='left'
            />
          </>
        ) : (
          <>
            <div className='flex items-center gap-2.5 mb-2'>
              <RatingComponent rating={rating} />
              <div className='flex gap-x-1 text-neutral-500'>
                <Icon icon={"ic:outline-calendar-month"} className='w-5 h-5 ' />
                <p className='text-base font-normal leading-relaxed'>{date}</p>
              </div>
            </div>
            <p className='text-stone-500'>{review}</p>
          </>
        )}
        {/* <div className='flex gap-x-1 mb-3'>
          <Icon
            icon={"ic:baseline-access-time"}
            className='w-5 h-5 text-neutral-500'
          />
        </div> */}
      </div>
  );
};

export default ReviewRow;
