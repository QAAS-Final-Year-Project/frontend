import { FC } from "react";
import { Icon } from "@iconify/react";
import VerticalDivider from "Shared/components/seperators/VerticlaDivider";
import IconButton from "Shared/components/buttons/icon-button";
import Avatar from "Shared/components/media/avatar";
import useCookies from "Shared/hooks/cookies";
import { setMe } from "Shared/utils/auth";
import Logo from "Shared/components/brand/logo";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { isValidJSON } from "Shared/utils/data-structures";
import { DeveloperNavLinks, NoAuthNavLinks, TesterNavLinks } from "../data";
import { classNames, wrapClick } from "Shared/utils/ui";
import { Menu } from "@headlessui/react";
import { wrap } from "module";
import AllNavToolBar from "Shared/layout/navtoolbar";
import UnverifiedBanner from "./components/unverified-banner";
import UnapprovedBanner from "./components/unverified-approved-banner";
import _ from "lodash";
const HomeNavBar: FC = () => {
  const [user] = useCookies("user");
  const [token] = useCookies("token");
  const currentUser = isValidJSON(user) ? JSON.parse(user) : undefined;
  const NavLinks: typeof TesterNavLinks | typeof DeveloperNavLinks = !!!token
    ? NoAuthNavLinks
    : currentUser?.accountType == "DeveloperUser"
    ? DeveloperNavLinks
    : TesterNavLinks;
  const location = useLocation();

  const navigate = useNavigate();

  const parsedUser = !!token ? JSON.parse(user) : {};
  console.log(parsedUser);
  return (
    <div className='w-full h-20  sticky top-0' id='header'>
      <div className='flex items-center w-full  h-20 justify-between bg-white'>
        <div className='relative flex'>
          <Link
            to={"/"}
            className='border-r block px-8 py-5 cursor-pointer h-full border-neutral-200'
          >
            <Logo />
          </Link>

          <ul className='flex items-center gap-x-2.5'>
            {NavLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                location.pathname.startsWith(link.href);

              if (!parsedUser?.meta?.isApproved && link?.disableUnverified)
                return <></>;
              return (
                <Menu
                  as='li'
                  className='relative ml-8 inline-block'
                  key={link.href}
                >
                  <Menu.Button
                    className='flex item-center gap-2 0'
                    onClick={() => navigate(link.href)}
                  >
                    <span
                      className={classNames(
                        " text-stone-500 text-base font-normal leading-none hover:text-primary-400",
                        isActive ? "text-primary-400" : ""
                      )}
                    >
                      {link.name}
                    </span>
                    {link.children && (
                      <div
                        className={classNames(
                          "h-4 w-4 rounded bg-neutral-200 flex hover:bg-primary-100 items-center justify-center",
                          isActive ? "bg-primary-100" : ""
                        )}
                      >
                        <ChevronDownIcon
                          className={classNames(
                            "h-3 w-3 ",
                            isActive ? "text-stone-500" : ""
                          )}
                        />
                      </div>
                    )}
                  </Menu.Button>
                  {link.children && (
                    <Menu.Items className='absolute z-[1000000000] mt-6  origin-top-right     rounded bg-zinc-800 shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none py-3.5 px-1.5'>
                      {link.children.map((item) => (
                        <Menu.Item>
                          {({ active, close }) => (
                            <button
                              onClick={wrapClick(() => navigate(item.href))}
                              className={`${
                                active ? "bg-primary-600  " : "text-gray-900"
                              } group flex items-center w-full  text-stone-200 pl-[15px]  py-1 pr-[100px] `}
                            >
                              {item.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  )}
                </Menu>
              );
            })}
          </ul>
        </div>
        <div className='flex justify-end px-4 items-center h-full'>
          <VerticalDivider />
          {!!token ? (
            <AllNavToolBar />
          ) : (
            <>
              {![
                "/account-type",
                "/login",
                "/register",
                "/verify-email",
                "/account-type",
              ].includes(location.pathname) && (
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
      {!_.isEmpty(parsedUser) && (
        <>
          {parsedUser?.meta?.isVerified ? (
            parsedUser?.meta?.isApproved ? (
              <></>
            ) : (
              <UnapprovedBanner />
            )
          ) : (
            <UnverifiedBanner />
          )}
        </>
      )}
    </div>
  );
};

export default HomeNavBar;
