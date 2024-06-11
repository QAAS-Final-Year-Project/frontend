import { Icon } from "@iconify/react";
import { FC } from "react";

interface FeatureTileProps {
  title: string;
  icon: string;
  description: string;
}

const FeatureTile: FC<FeatureTileProps> = ({ title, icon, description }) => {
  return (
    <div className='p-[25px] flex flex-col  items-center'>
      <Icon className='w-[72px] h-[72px] text-[#f0f0f0] ' icon={icon} />
      <p className='text-center mb-[5px] text-zinc-800 text-base font-semibold  leading-[27px]'>
        {title}
      </p>
      <div className='text-center text-zinc-500 text-base font-normal leading-normal'>
        {description}
      </div>
    </div>
  );
};

export default FeatureTile;
