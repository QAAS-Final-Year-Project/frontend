import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import RatingComponent from "Shared/components/status/rating";
import Shimmers from "Shared/components/suspense/shimmers";
import { FC } from "react";
import { Link } from "react-router-dom";

const ShimmerReviewRow: FC = ({}) => {
  return (
    <div className='py-[22px] px-[30px]  border-b border-neutral-200 hover:bg-[#fcfcfc]'>
      <div className='w-[280px]'>
        <Shimmers.SingleShimmer />
      </div>

      <>
        <div className='flex items-center gap-2.5 mb-2'>
          <div className='w-[120px]'>
            <Shimmers.SingleShimmer />
          </div>{" "}
          <div className='w-[120px]'>
            <Shimmers.SingleShimmer />
          </div>
        </div>
        <div className='w-[400px]'>
          <Shimmers.SingleShimmer />
        </div>{" "}
      </>
    </div>
  );
};

export default ShimmerReviewRow;
