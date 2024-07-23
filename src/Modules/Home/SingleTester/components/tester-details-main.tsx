import React, { FC } from "react";
import TesterTaskHistory from "./tester-task-history";

const TesterDetailsMain: FC<{ data: any }> = ({ data }) => {
  return (
    <section className='space-y-[55px]'>
      <div className=' block'>
        <h3 className="text-zinc-800 text-xl font-medium  leading-[27px] mb-[25px]">
          About Me
        </h3>{" "}
        <p className="text-stone-500 text-base font-normal  leading-[27px] mb-4">
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews. Iterative approaches to
          <br />
          corporate strategy foster collaborative thinking to further the
          overall value proposition. Organically grow
          <br />
          the holistic world view of disruptive innovation via workplace
          diversity and empowerment.
        </p>
        <div className="text-stone-500 text-base font-normal  leading-[27px]">
          Capitalize on low hanging fruit to identify a ballpark value added
          activity to beta test. Override the digital
          <br />
          divide with additional clickthroughs from DevOps. Nanotechnology
          immersion along the information
          <br />
          highway will close the loop on focusing solely on the bottom line.
        </div>
      </div>
      <TesterTaskHistory />
    </section>
  );
};

export default TesterDetailsMain;
