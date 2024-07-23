import { Icon } from "@iconify/react";
import Shimmers from "Shared/components/suspense/shimmers";
import { FC } from "react";

const DeveloperTaskRowShimmer: FC = ({}) => {
  return (
    <div
      // to={"/dashboard/tasks/" + _id}
      className='py-[22px] px-[30px] flex items-center justify-between border-b border-neutral-200 hover:bg-[#fcfcfc]'
    >
      <div className=''>
        <div className='flex gap-x-1 mb-1 items-center'>
          <div className='w-[280px]'>
            <Shimmers.SingleShimmer />
          </div>
        </div>

        <div className='flex items-center gap-2 mb-3'>
          <div className='w-[120px]'>
            <Shimmers.SingleShimmer />
          </div>{" "}
          <div className='w-[120px]'>
            <Shimmers.SingleShimmer />
          </div>
        </div>
        <div className='flex gap-x-2.5 items-stretch'>
          <div className='w-[145px]'>
            <Shimmers.SingleShimmer innerHeight='h-[35px]' />
          </div>
        </div>
      </div>
      <div className='flex items-center gap-5 '>
        <div className='w-[100px] '>
          <Shimmers.SingleShimmer
            outerHeight='h-[70px]'
            innerHeight='h-[70px]'
          />
        </div>
        <div className='w-[100px] '>
          <Shimmers.SingleShimmer
            outerHeight='h-[70px]'
            innerHeight='h-[70px]'
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperTaskRowShimmer;
