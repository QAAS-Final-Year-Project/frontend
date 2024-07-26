import { FC } from "react";
import UserNotifications from "./components/user-notifications";
import UserMessages from "./components/user-messages";
import VerticalDivider from "Shared/components/seperators/VerticlaDivider";
import UserNavAvatar from "./components/user-avatar";
import useCookies from "Shared/hooks/cookies";
import { isValidJSON } from "Shared/utils/data-structures";
import { useLocation } from "react-router-dom";

const AllNavToolBar: FC = () => {
  const [user] = useCookies("user");
  const parsedUser = isValidJSON(user) ? JSON.parse(user) : {};
  const location = useLocation()
  return (
    <>
      <div className='flex px-8 items-center gap-x-5'>
        <UserNotifications user={parsedUser} />
        {!location.pathname.includes("/dashboard")  &&    <UserMessages user={parsedUser} /> }
      </div>
      <VerticalDivider />
      <div className='px-6'>
        <UserNavAvatar user={parsedUser} />
      </div>
    </>
  );
};


export default AllNavToolBar