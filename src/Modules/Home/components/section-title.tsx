import { title } from "process";
import React, { FC } from "react";

type SectionTitleProps = {
  text;
};

const SectionTitle: FC<SectionTitleProps> = ({ text }) => {
  return (
    <h3 className='text-center text-zinc-800 text-[26px] font-medium  leading-9'>
      {text}
    </h3>
  );
};

export default SectionTitle;
