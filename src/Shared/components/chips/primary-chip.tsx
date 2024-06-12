import { classNames } from "Shared/utils/ui";
import React, { FC } from "react";

type PrimaryChipProps = {
  text: string;
  hasShadow?: boolean;
};

const PrimaryChip: FC<PrimaryChipProps> = ({ text , hasShadow=false}) => {
  return (
    <div
      className={classNames(
        "px-[10px] py-[5px] rounded  justify-start items-start inline-flex bg-primary-500  text-white",
        hasShadow ? "shadow" : ""
      )}
    >
      <span className='text-white text-sm font-normal  capitalize leading-tight'>
        {text}
      </span>
    </div>
  );
};

export default PrimaryChip;
