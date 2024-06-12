import { FC } from "react";
import { Link } from "react-router-dom";

export interface BreadCrump {
  to: string;
  title: string;
}

export interface BreadCrumpsProps {
  breadCrumps: BreadCrump[];
}

const BreadCrumps: FC<BreadCrumpsProps> = ({ breadCrumps }) => {
  return (
    <div className='bg-[#333333] rounded py-3 px-6 flex items-center justify-center gap-x-2.5 shadow'>
      {breadCrumps.map((breadCrump, index) => (
        <div className='text-white text-sm font-medium leading-[23px] flex items-center justify-center gap-x-3'>
          {index !== 0 && (
            <div className='w-0 h-0 border-l-4 border-t-4 border-b-4 border-l-white border-opacity-30  border-t-transparent border-b-transparent'></div>
          )}
          <Link to={breadCrump.to}>{breadCrump.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumps;
