import { CheckIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import { FC } from "react";

interface StatTile {
  title: string;
  icon: string;
  value: any;
}

const StatTile: FC<StatTile> = ({ title, icon, value }) => {
  return (
    <div className='p-[25px] pb-0 flex flex-col  items-center relative mx-[15px]'>
        <Icon className='w-16 h-16 text-[#CCCCCC] ' icon={icon} />
        
      <span className=' text-center text-blue-700 text-4xl font-semibold mt-5 mb-2  leading-[27px]'>
        {value}
      </span>
      <span className='text-center text-zinc-500 text-lg font-normal  leading-[27px]'>
       {title}
      </span>
      <div className='w-0.5 bg-neutral-200 h-[62px] absolute right-0 bottom-0'></div>

    </div>
  );
};

export default StatTile;
