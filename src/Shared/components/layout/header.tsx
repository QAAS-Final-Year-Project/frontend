import { FC } from "react";
import BreadCrumps, { BreadCrump } from "../nav/bread-crumps";

interface HeaderProps {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  breadCrumps?: BreadCrump[];
}

const Header: FC<HeaderProps> = ({ breadCrumps, title, subtitle }) => {
  return (
    <div className='flex items-center justify-between w-full mb-10 '>
      <div className='flex flex-col gap-1.5'>
        <h1 className='text-2xl text-zinc-800 font-medium leading-none'>
          {title}
        </h1>
        {subtitle && (
          <h4 className=' text-zinc-500 text-lg font-normal  leading-[30px]'>
            {subtitle}
          </h4>
        )}
      </div>
      {breadCrumps && <BreadCrumps breadCrumps={breadCrumps} />}
    </div>
  );
};

export default Header;
