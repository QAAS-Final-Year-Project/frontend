import Header from "Shared/components/layout/header";
import Avatar from "Shared/components/media/avatar";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";

interface DateSectionHeaderProps {
  title: string;
}

const DateSectionHeader: FC<DateSectionHeaderProps> = ({ title }) => {
  return (
    <div className='flex items-center justify-center gap-x-2.5'>
      <div className='w-[130px] h-px bg-gray-200' />
      <p className='text-center text-zinc-500 text-sm font-normal  leading-[27px]'>
        {title}
      </p>
      <div className='w-[130px] h-px bg-gray-200' />
    </div>
  );
};

export default DateSectionHeader;
