import { Icon } from "@iconify/react";
import { classNames, wrapClick } from "Shared/utils/ui";
import { FC } from "react";

interface TabItem {
  icon: string;
  label: string;
  href: string;
  notificationsCount?: number;
  notificationType?: "info" | "danger";
}

interface TabListProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
}

const TabListAlt: FC<TabListProps> = ({ tabs, value, onChange }) => {
  const setNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.href === value);
    if (currentIndex === tabs.length - 1) {
      return;
    }
    onChange(tabs[currentIndex + 1].href);
  };

  const setPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.href === value);
    if (currentIndex === 0) {
      return;
    }
    onChange(tabs[currentIndex - 1].href);
  };
  return (
    <div className='w-full rounded bg-primary-500 -mb-px flex justify-between items-center'>
      <nav className=' flex space-x-8  ' aria-label='Tabs'>
        {tabs.map((tab) => (
          <button
            onClick={wrapClick(() => onChange(tab.href))}
            key={tab.label}
            className={classNames(
              value === tab.href
                ? "bg-opacity-[0.10]"
                : "border-transparent  hover:border-gray-200 hover:text-gray-300 ",
              "flex bg-white bg-opacity-0 hover:bg-opacity-[0.01] text-white whitespace-nowrap border-b-2 py-4 px-6 text-base font-medium"
            )}
            aria-current={value == tab.href ? "page" : undefined}
          >
            {tab.label}
            {tab.notificationsCount ? (
              <span
                className={classNames(
                  value == tab.href
                    ? "bg-primary-100 text-primary-500"
                    : "bg-gray-100 text-gray-900",
                  "ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
                )}
              >
                {tab.notificationsCount}
              </span>
            ) : null}
          </button>
        ))}
      </nav>
      <div className='flex items-center justify-center px-4 py-3 gap-x-2.5'>
        <button
          type='button'
          onClick={wrapClick(setPreviousTab)}
          className={classNames(
            "bg-white text-white hover:bg-opacity-25  bg-opacity-[0.10] h-[30px] w-[30px]" ,
            "w-11 h-11 px-2.5 rounded  flex items-center justify-center "
          )}
        >
          <Icon icon='akar-icons:chevron-left' className='w-5 h-5 ' />
        </button>
        <button
          type='button'
          onClick={wrapClick(setNextTab)}
          className={classNames(
            "bg-white text-white hover:bg-opacity-25  bg-opacity-[0.10] h-[30px] w-[30px]" ,
            "w-11 h-11 px-2.5 rounded  flex items-center justify-center "
          )}
        >
          <Icon icon='akar-icons:chevron-right' className='w-5 h-5 ' />
        </button>
      </div>
    </div>
  );
};

export default TabListAlt;
