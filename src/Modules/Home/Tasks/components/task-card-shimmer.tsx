import { Icon } from "@iconify/react";
import ActionButton from "Shared/components/buttons/action-button";
import PrimaryButton from "Shared/components/buttons/primary-button";
import RatingComponent from "Shared/components/status/rating";
import Shimmers from "Shared/components/suspense/shimmers";
import { FC } from "react";
import { Link } from "react-router-dom";

const TaskGridCardShimmer: FC = ({}) => {
  return (
    <div className=' bg-white rounded shadow flex-col justify-center items-start inline-flex'>
      <div className='py-7 px-8 '>
        <div className='w-[260px]'>
          <Shimmers.SingleShimmer />
        </div>
        <div className='flex items-center gap-2.5 mb-2'>
          <div className='w-[120px]'>
            <Shimmers.SingleShimmer />
          </div>{" "}
          <div className='w-[120px]'>
            <Shimmers.SingleShimmer />
          </div>
        </div>
      </div>

      <div className='py-7 px-8  bg-neutral-50 rounded-bl rounded-br w-full space-y-4'>
        <div className='flex items-center justify-between '>
          <div>
            <div className='w-[60px]'>
              <Shimmers.SingleShimmer />
            </div>
            <div className='w-[80px]'>
              <Shimmers.SingleShimmer />
            </div>
          </div>
          <div className='flex items-center gap-x-2.5'>
            <div className='w-[130px]'>
              <Shimmers.SingleShimmer innerHeight='h-9' outerHeight='h-9' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskGridCardShimmer;
