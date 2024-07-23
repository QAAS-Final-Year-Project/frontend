import { FC } from "react";

import { Popover } from "@headlessui/react";
import Avatar from "Shared/components/media/avatar";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";
const UserNavAvatar: FC<{ user: any }> = ({ user }) => {
  const links = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "ic:outline-dashboard",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "ic:outline-settings",
    },
    {
      title: "Logout",
      href: "?modal=logout",
      icon: "ic:baseline-power-settings-new",
    },
  ];
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          {open && (
            <div className='w-0 h-0 border-l-8 border-r-8  absolute border-b-8 border-b-zinc-300 top-[52px] right-3 z-[10000000] border-r-transparent border-l-transparent'></div>
          )}

          <Popover.Button className=''>
            <div className='relative'>
              <Avatar
                disabled
                alt={user?.fullName}
                src={user?.profileImageUrl}
              />
              <div className='w-3 h-3 bg-green-500 rounded-md absolute bottom-0 right-0 shadow border-2 border-white' />
            </div>
          </Popover.Button>
          <Popover.Panel
            // transition
            className='absolute -right-8 z-10   flex top-[60px]   px-4 transition data-[closed]:translate-y-10 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
          >
            <div className='w-screen max-w-72  flex-auto overflow-hidden rounded  bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 relative'>
              <div className='p-[25px] border-b border-neutral-200'>
                <div className='flex items-center gap-x-[15px]'>
                  <div className='relative'>
                    <Avatar
                      size='sm'
                      alt={user?.fullName}
                      src={user?.profileImageUrl}
                    />
                    <div className='w-3 h-3 bg-green-500 absolute bottom-0 right-0 rounded-md shadow border-2 border-white' />
                  </div>
                  <div>
                    <p className='text-zinc-800 text-base font-medium leading-tight'>
                      {user?.fullName}
                    </p>
                    <div className='text-zinc-500 text-sm font-medium  leading-tight'>
                      Tester
                    </div>
                  </div>
                </div>
              </div>
              <div className='py-5 px-[25px] space-y-1'>
                {links.map((link) => (
                  <Link
                    to={link.href}
                    className='flex group items-center gap-x-1.5'
                  >
                    <Icon
                      icon={link.icon}
                      strokeWidth={5}
                      className={classNames(
                        "w-4 h-4 text-neutral-400 group-hover:text-primary-500  stroke-1"
                      )}
                    />
                    <div className=' text-stone-500 group-hover:text-primary-500 text-base font-normal leading-[27px]'>
                      {" "}
                      {link.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default UserNavAvatar;
