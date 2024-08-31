import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import StatusChip from "Shared/components/chips/status-chip";
import Avatar from "Shared/components/media/avatar";
import RatingComponent from "Shared/components/status/rating";
import { classNames } from "Shared/utils/ui";
import { Nationalities } from "data";
import { FC } from "react";

interface BidderRowProps {
  fullName: string;
  profileImageUrl: string;
  email: string;
  phoneNumber: string;
  rating: number;
  fixedPrice: string;
  idx: number;
  country: string;
  // deliveryTime: string;
}

const TaskDetailsBidderRow: FC<BidderRowProps> = ({
  fullName,
  profileImageUrl,
  email,
  idx,
  phoneNumber,
  rating,
  fixedPrice,
  // deliveryTime,
  country,
}) => {
  return (
    <div
      className={classNames(
        "p-[35px] flex items-center justify-between  ",
        idx % 2 === 0 ? "bg-white" : "bg-neutral-50 rounded"
      )}
    >
      <div className='flex items-center gap-x-[30px]'>
        <Avatar alt={fullName} size='lg' src={profileImageUrl} />
        <div className=''>
          <div className='flex gap-x-1 mb-0.5 items-center'>
            <p className=" text-center  text-zinc-800 text-lg font-semibold  leading-[27px]">
              {fullName}{" "}
              {
                Nationalities.find((nat) => nat.en_short_name === country)
                  ?.emoji
              }
            </p>
          </div>

          <div className=''>
            {rating ? (
              <RatingComponent rating={rating} />
            ) : (
              <div className=' text-stone-500 bg-zinc-200 px-[9px] py-[5px] mt-2 mb-5 !text-xs inline-flex rounded items-center justify-center'>
                Not Rated
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=' py-2 px-6 bg-zinc-100 rounded flex items-center gap-x-[22px]'>
        <div>
          <p className="text-center text-zinc-800 text-base font-semibold  leading-snug">
            GHC{fixedPrice}
          </p>
          {/* <span className="text-center text-zinc-500 text-sm font-normal  leading-tight">
            in {deliveryTime}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsBidderRow;
