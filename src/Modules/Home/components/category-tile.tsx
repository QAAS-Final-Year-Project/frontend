import { Icon } from "@iconify/react";
import { FC } from "react";

interface CategoryTileProps {
  title: string;
  icon: string;
  value: any;
  description: string;
}

const CategoryTile: FC<CategoryTileProps> = ({
  title,
  value,
  icon,
  description,
}) => {
  return (
    <div className='p-[25px] flex flex-col  items-center'>
      <Icon className='w-[42px] h-[42px] text-primary-500 ' icon={icon} />
      <div className=' bg-zinc-100 px-[8px] text-neutral-400 mt-3   font-semibold leading-[25px]  !text-sm inline-flex rounded items-center justify-center mb-[18px]'>
        {value}
      </div>
      <p className='text-center mb-[5px] text-zinc-800 text-base font-semibold  leading-[27px]'>
        {title}
      </p>
      <div className='text-center text-zinc-500 text-base font-normal leading-normal'>
        {description}
      </div>
    </div>
  );
};

export default CategoryTile;
