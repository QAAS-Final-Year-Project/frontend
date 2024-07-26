import { FC } from "react";
import Shimmers from "Shared/components/suspense/shimmers";

const ChatRowShimmer: FC = ({}) => {
  return (
    <div className='flex items-center gap-x-4 pl-6 pr-2 py-6 border-b '>
      <div className='w-[40px] rounded-full'>
        <Shimmers.SingleShimmer
          innerHeight={"h-[40px]"}
          className="!rounded-full"
          outerHeight={"h-[40px]"}
        />
      </div>
      <div className='flex-1'>
        <div className='w-full flex justify-between mb-2'>
          <div className='w-[100px]'>
            <Shimmers.SingleShimmer innerHeight={"h-3"} outerHeight={"h-3"} />
          </div>{" "}
          <div className='w-[70px]'>
            <Shimmers.SingleShimmer innerHeight={"h-3"} outerHeight={"h-3"} />
          </div>{" "}
        </div>
        <div className='w-[205px]'>
          <Shimmers.SingleShimmer innerHeight={"h-3"} outerHeight={"h-3"} />
        </div>{" "}
      </div>
    </div>
  );
};

export default ChatRowShimmer;
