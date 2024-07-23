import React from "react";
import CountUp from "react-countup";

type Props = {
  percentage: number;
  label: string;
};

const TesterJobStatistic = (props: Props) => {
  return (
    <div>
      <p className='mb-2.5'>
        <CountUp
          className='text-zinc-800 text-base font-semibold  leading-normal'
          end={props.percentage}
        />
        %
      </p>
      <div className=' h-1 relative bg-neutral-200 rounded-[10px] mb-2.5 w-full'>
        <div
          className=' h-1 left-0 top-0 absolute bg-primary-500 rounded-[10px]'
          style={{
            width: `${props.percentage}%`,
          }}
        >
          {" "}
        </div>
      </div>
      <div className='text-stone-500 text-base font-normal  leading-normal'>
        {props.label}
      </div>
    </div>
  );
};

export default TesterJobStatistic;
