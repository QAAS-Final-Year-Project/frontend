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

const TabList: FC<TabListProps> = ({ tabs, value, onChange }) => {
  return (
    <div>
      <div className='hidden sm:block'>
        <div className=''>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {tabs.map((tab) => (
              <button
                onClick={wrapClick(() => onChange(tab.href))}
                key={tab.label}
                className={classNames(
                  value === tab.href
                    ? "border-primary-500 text-primary-500"
                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                  "flex whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
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
        </div>
      </div>
    </div>
  );
};

export default TabList;
