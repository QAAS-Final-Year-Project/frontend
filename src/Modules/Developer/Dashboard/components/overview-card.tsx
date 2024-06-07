import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";
interface OverviewCardProps {
  bgColor: string;
  textColor: string;
  icon: string;
  value: any;
  title: string;
}
const OverviewCard: FC<OverviewCardProps> = ({
  bgColor,
  textColor,
  icon,
  value,
  title,
}) => {
  return (
    <div className='p-[25px] bg-white rounded shadow flex items-center justify-between'>
      <div className='flex flex-col gap-y-2.5'>
        <p className='text-zinc-500 text-lg font-normal  leading-snug'>
          {title}
        </p>
        <span className=' text-zinc-800 text-[38px] font-medium'>{value}</span>
      </div>

      <div
        className={classNames(
          "w-[100px] h-[100px] flex items-center justify-center  bg-opacity-5 rounded ",
          bgColor
        )}
      >
        <Icon icon={icon} className={classNames("h-12 w-12", textColor)} />
      </div>
    </div>
  );
};

export default OverviewCard;
