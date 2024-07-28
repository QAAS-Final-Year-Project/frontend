import { FC } from "react";
import Shimmers from "Shared/components/suspense/shimmers";

const PaymentShimmerRow: FC = ({}) => {
  return (
    <div className='py-[22px] px-[30px] flex items-center justify-between w-full  border-b border-neutral-200 hover:bg-[#fcfcfc]'>
      <div className='flex items-center gap-x-5 '>
        <div className='w-[40px]'>
          <Shimmers.SingleShimmer
            innerHeight={"h-[40px]"}
            outerHeight={"h-[40px]"}
          />
        </div>{" "}
        <div className='w-[180px]'>
          <Shimmers.SingleShimmer innerHeight={"h-6"} outerHeight={"h-6"} />
        </div>{" "}
      </div>
    </div>
  );
};

export default PaymentShimmerRow;
