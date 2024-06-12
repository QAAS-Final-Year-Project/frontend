import { FC } from "react";
import { Icon } from "@iconify/react";
import VerticalDivider from "Shared/components/seperators/VerticlaDivider";
import IconButton from "Shared/components/buttons/icon-button";
import Avatar from "Shared/components/media/avatar";
import useCookies from "Shared/hooks/cookies";
import { setMe } from "Shared/utils/auth";
import Logo from "Shared/components/brand/logo";
import { Link, useLocation } from "react-router-dom";
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
const HomeNavBar: FC = () => {
  const [user] = useCookies("user");
  const [token] = useCookies("token");
  const NavLinks = ["Home", "Find Work", "For Employers", "Dashboard", "Pages"];
  const location = useLocation();

  const parsedUser = !!token ? JSON.parse(user) : {};
  return (
    <div
      className='w-full h-20 flex items-center justify-between bg-white sticky top-0'
      id='header'
    >
      <div className='relative flex '>
        <Link
          to={"/"}
          className='border-r block px-8 py-5 cursor-pointer h-full border-neutral-200'
        >
          <Logo />
        </Link>
        <ul className='flex items-center gap-x-5'>
          {NavLinks.map((link) => (
            <li key={link} className='ml-8'>
              <Link to='#' className=' flex item-center gap-2 0'>
                <span className=' text-stone-500 text-base font-normal leading-none hover:text-primary-400'>
                  {link}
                </span>
                <div className='h-4 w-4 rounded bg-neutral-200 flex hover:bg-primary-400 items-center justify-center'>
                  <ChevronDownIcon className='h-3 w-3 text-stone-500' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-end px-4 items-center h-full'>
        <VerticalDivider />
        {!!token ? (
          <>
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
              <Avatar
                alt={parsedUser?.fullName}
                src={parsedUser?.profileImageUrl}
              />
            </div>
          </>
        ) : (
          <>
            {!["/account-type", "/login", "/register", "/verify-email",  "/account-type"].includes(
              location.pathname
            ) && (
              <Link
              to={"/login"}
                className='flex gap-1 px-5 text-stone-500 item-center hover:text-primary-500'
              >
                <Icon icon='material-symbols:login' className='w-6 h-5' />
                <span className=' text-base font-normal  leading-tight'>
                  Log In / Register
                </span>{" "}
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeNavBar;
