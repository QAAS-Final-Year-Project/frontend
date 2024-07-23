import { FC } from "react";
import VerticalDivider from "Shared/components/seperators/VerticlaDivider";
import AllNavToolBar from "Shared/layout/navtoolbar";

const TesterUserNavbar: FC = () => {
  return (
    <div className='flex justify-end  w-full h-20   px-4 items-center bg-white'>
      <VerticalDivider />
      <AllNavToolBar />
    </div>
  );
};

export default TesterUserNavbar;
