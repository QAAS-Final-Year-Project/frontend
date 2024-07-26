import { FC, MouseEventHandler } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import { classNames, wrapClick } from "Shared/utils/ui";

interface SidebarNavItemProps {
  icon: string;
  label: string;
  to: string;
  isCollapsed?: boolean;
  notificationsCount?: number;
  notificationType?: "info" | "danger";
  activeRoutes?: string[];
  onClick?: () => void;
}
const SidebarNavItem: FC<SidebarNavItemProps> = ({
  icon,
  label,
  to,
  notificationsCount,
  notificationType,
  onClick,
  isCollapsed,
  activeRoutes = [],
}) => {
  const currentRoute = useLocation().pathname;
  const isActive = currentRoute === to || activeRoutes.includes(currentRoute);
  return (
    <li title={label} onClick={wrapClick(() => onClick?.())}>
      <Link
        to={to}
        className={classNames(
          "py-3 hover:bg-gray-50 text-base flex gap-x-2 items-center w-full",
          "mr-4 pl-8 justify-between",
          isActive
            ? "bg-gray-50  border-l-4 text-primary-500  font-semibold  border-primary-500"
            : "text-neutral-500"
        )}
      >
        <>
          <div className='flex gap-x-3 items-center stroke-1'>
            <Icon
              icon={icon}
              strokeWidth={5}
              className={classNames(
                // "[&>path]:stroke-[1.5] [&>g]:stroke-[1.5]",
                "w-5 h-5",
                isActive ? "text-primary-500" : "text-neutral-400"
              )}
            />
            <p className=''>{label} </p>
            {notificationsCount ? (
              <div
                className={classNames(
                  "rounded-full px-1 flex items-center justify-center  w-[20px] h-[20px] text-center text-white text-xs font-bold ",
                  notificationsCount && notificationType === "info"
                    ? "bg-primary-500  "
                    : "bg-red-500 "
                )}
              >
                {notificationsCount}
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      </Link>
    </li>
  );
};

export default SidebarNavItem;
