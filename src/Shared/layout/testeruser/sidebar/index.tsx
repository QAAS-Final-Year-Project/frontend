import { FC, Fragment, useCallback, useEffect } from "react";
import {
  INavSection,
  UnverifiedNavSections,
  ApprovedNavSections,
  VerifiedNavSections,
} from "../../testeruser/data/navItems";
import SidebarNavItem from "./components/SidebarNavItem";
// import Divider from "../../../components/seperators/divider";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import useCookies from "../../../hooks/cookies";
import { Menu, Transition } from "@headlessui/react";
import { wrapClick } from "../../../utils/ui";

import { showToast } from "../../../utils/alert";
import Logo from "Shared/components/brand/logo";
import useUrlState from "Shared/hooks/use-url-state";
import LogoutContainer from "./logout-dialog";
let NavSections: INavSection[] = UnverifiedNavSections;
const TesterUserSidebar: FC = () => {
  const [user, setUser] = useCookies("user");
  const currentRoute = useLocation().pathname;
  const parsedUser = JSON.parse(user as string);
  const [modal, setModal] = useUrlState("modal");
  const NavSections: INavSection[] = parsedUser?.meta?.isApproved
    ? ApprovedNavSections
    : parsedUser?.meta?.isVerified
    ? VerifiedNavSections
    : UnverifiedNavSections;
  return (
    <>
      <div className='w-full flex flex-col h-full overflow-scroll items-stretch'>
        {/* LOGO Area */}
        <Link to={"/"}>
          <div className='px-8 py-5 w-full max-h-20  relative shadow-md mb-8 cursor-pointer'>
            <Logo />
          </div>
        </Link>
        {/* NAV Area */}
        <ul className='space-y-6'>
          {NavSections.map((section, index) => (
            <li>
              <span className='text-primary-500 text-sm font-semibold leading-relaxed px-8'>
                {section.title}
              </span>{" "}
              <ul>
                <Fragment key={section.title}>
                  {section.items.map((item) => (
                    <SidebarNavItem
                      icon={item.icon}
                      label={item.label}
                      to={item.to}
                      activeRoutes={item?.activeRoutes}
                      notificationType={item.notificationType}
                      notificationsCount={item.notificationsCount}
                    />
                  ))}
                </Fragment>
              </ul>
            </li>
          ))}
        </ul>
        <div className='flex-1'></div>
      </div>
      <LogoutContainer
        open={modal === "logout"}
        setOpen={(val: boolean) => setModal(val ? "logout" : undefined)}
      />
    </>
  );
};

export default TesterUserSidebar;
