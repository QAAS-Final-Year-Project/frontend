import { Icon } from "@iconify/react";
import Shimmers from "Shared/components/suspense/shimmers";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";

const OverviewShimmerCard: FC = ({}) => {
  return (
    <div className='p-[25px] bg-white rounded shadow flex items-center justify-between'>
      <div className='flex flex-col gap-y-2.5'>
        <div className='w-[120px]'>
          <Shimmers.SingleShimmer innerHeight={"h-6"} outerHeight={"h-6"} />
        </div>
        <div className='w-[40px]'>
          <Shimmers.SingleShimmer innerHeight={"h-9"} outerHeight={"h-9"} />
        </div>{" "}
      </div>
      <div className='w-[100px]'>
        <Shimmers.SingleShimmer
          innerHeight={"h-[100px]"}
          outerHeight={"h-[100px]"}
        />
      </div>{" "}
    </div>
  );
};

export default OverviewShimmerCard;
