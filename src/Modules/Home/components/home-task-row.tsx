import { Icon } from "@iconify/react";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { classNames } from "Shared/utils/ui";
import AppConfig from "config";
import moment from "moment";
import { title } from "process";
import React, { FC } from "react";
import { Link } from "react-router-dom";

type HomeTaskRowProps = {
  date: string;
  title: string;
  tags: string[];
  price: number;
  idx: number;
    _id: string;
};

const HomeTaskRow: FC<HomeTaskRowProps> = ({
  date,
  title,
  tags,
  price,
  idx,
  _id,
}) => {
  return (
    <Link
      to={"/tasks/" + _id}
      className={classNames(
        "pl-[35px] pt-[27px] pb-[30px] border-l-transparent border-l-2 hover:border-l-primary-500 flex items-center justify-between",
        idx % 2 === 0 ? "bg-white" : "bg-neutral-50"
      )}
    >
      <div className='flex flex-col'>
        <p className=' text-zinc-800 text-lg font-semibold  leading-7 mb-1'>
          {title}
        </p>
        <div className='flex gap-x-4 mb-4 items-center'>
          <div className='flex items-center gap-1 '>
            <Icon
              icon={"ic:outline-calendar-month"}
              className='w-5 h-5 text-neutral-400'
            />
            <p className=' text-zinc-500 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
              <span>Date: {moment(date).format(AppConfig.date.format)}</span>
            </p>
          </div>
          <div className='flex items-center gap-1 '>
            <Icon
              icon={"ic:baseline-access-time"}
              className='w-5 h-5 text-neutral-400'
            />
            <p className=' text-zinc-500 text-base font-normal  leading-relaxed flex items-center gap-x-5'>
              <span>{moment(date).fromNow()}</span>
            </p>
          </div>
        </div>

        <div className='flex mt-0.5 w-full items-center gap-1 flex-wrap'>
          {tags?.map((val, idx) => (
            <div className=' bg-blue-700/5 rounded px-[15px] py-1.5 flex gap-x-1 items-center hover:bg-gray-100 text-primary-500 text-sm'>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className=''>
        <p className='w-[170px] text-zinc-800 text-base font-semibold  leading-normal'>
          GHC {price}
        </p>
        <p className='] text-zinc-500 text-base font-normal  leading-normal mb-[15px]'>
          Fixed Price
        </p>
        <PrimaryButton text='Bid Now ' size="sm"/>
      </div>
    </Link>
  );
};

export default HomeTaskRow;
