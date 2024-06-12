import { CheckIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import { FC } from "react";

interface FeatureTileProps {
  title: string;
  icon: string;
  description: string;
  showSeparator: boolean;
}

const FeatureTile: FC<FeatureTileProps> = ({
  title,
  icon,
  description,
  showSeparator,
}) => {
  return (
    <div className='p-[25px] flex flex-col  items-center relative mx-[15px]'>
      {showSeparator && (
        <div className='absolute h-px w-full left-1/2 top-[60px] bg-gray-200 z-10'></div>
      )}
      <div className='flex w-1/2 bg-white justify-center z-10'>
        <div className='relative mb-7 '>
          <Icon className='w-[72px] h-[72px] text-[#CCCCCC] ' icon={icon} />
          <div className='w-[30px] h-[30px] flex items-center justify-center bg-blue-700 check-animation rounded-full absolute -bottom-[3px] -right-1'>
            <CheckIcon className='w-4 h-4 text-white' />
          </div>
        </div>
      </div>

      <div className='text-center text-zinc-800 text-[22px] font-medium  leading-relaxed'>
        {title}
      </div>
      <div className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
        {description}
      </div>
    </div>
  );
};

export default FeatureTile;
