import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";
import { FC, PropsWithChildren } from "react";

interface CardSectionWrapperProps {
  icon?: any;
  title: JSX.Element | string;
  className?: string;
  extraElement?: JSX.Element;
}
const CardSectionWrapper: FC<PropsWithChildren<CardSectionWrapperProps>> = ({
  children,
  title,
  icon,
  className,
  extraElement,
}) => {
  return (
    <div
      className={classNames(
        " bg-white rounded shadow border-b border-neutral-200",
        className
      )}
    >
      <div className='px-[30px] py-5 border-b border-neutral-200 flex items-center justify-between'>
        <h4 className='flex gap-3 items-center text-zinc-800 text-base font-medium  leading-relaxed'>
          {icon && <Icon icon={icon} className='w-6 h-6 text-primary-500' />}
          {title}
        </h4>
        {extraElement}
      </div>
      {children}
    </div>
  );
};

export default CardSectionWrapper;
