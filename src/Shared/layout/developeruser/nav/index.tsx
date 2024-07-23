import { FC } from "react";
import { Icon } from "@iconify/react";
import VerticalDivider from "Shared/components/seperators/VerticlaDivider";
import IconButton from "Shared/components/buttons/icon-button";
import Avatar from "Shared/components/media/avatar";
import useCookies from "Shared/hooks/cookies";
import { setMe } from "Shared/utils/auth";
import AllNavToolBar from "Shared/layout/navtoolbar";
const DeveloperUserNavBar: FC = () => {
  const [user] = useCookies("user");
  const parsedUser = JSON.parse(user);
  return (
    <div className='flex justify-end  w-full h-20   px-4 items-center bg-white'>
      <VerticalDivider />
      <AllNavToolBar />
    </div>
  );
};

export default DeveloperUserNavBar;
