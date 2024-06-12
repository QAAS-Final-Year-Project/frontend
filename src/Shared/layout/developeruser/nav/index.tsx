import { FC } from "react";
import { Icon } from "@iconify/react";
import VerticalDivider from "Shared/components/seperators/VerticlaDivider";
import IconButton from "Shared/components/buttons/icon-button";
import Avatar from "Shared/components/media/avatar";
import useCookies from "Shared/hooks/cookies";
import { setMe } from "Shared/utils/auth";
const DeveloperUserNavBar: FC = () => {
  const [user] = useCookies("user");
  const parsedUser = JSON.parse(user);
  return (
    <div className='flex justify-end  w-full h-20   px-4 items-center bg-white'>
      <VerticalDivider />
      <div className='flex px-8 items-center gap-x-5'>
        <IconButton
          icon={"lucide:bell"}
          notificationCount={4}
          notificationType='info'
        />
        <IconButton
          icon={"lucide:mail"}
          notificationType='info'
          notificationCount={3}
        />
      </div>
      <VerticalDivider />
      <div className='px-6'>
        <Avatar alt={parsedUser?.fullName} src={parsedUser?.profileImageUrl} />
      </div>
    </div>
  );
};

export default DeveloperUserNavBar;
