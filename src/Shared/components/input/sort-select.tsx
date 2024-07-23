import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames, wrapClick } from "Shared/utils/ui";
import _ from "lodash";
import { FC } from "react";

interface Option {
  name: string;
  href: string;
}
interface SortSelectProps {
  id: string;
  setFieldValue: any;
  options: Option[];
  values: any;
}
const SortSelect: FC<SortSelectProps> = ({
  setFieldValue,
  values,
  id,
  options,
}) => {
  return (
    <div className='col-start-1 row-start-1 '>
      <div className='mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8'>
        <Menu as='div' className='relative inline-block'>
          <div className='flex'>
            <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 items-center'>
              <span className='text-stone-500 text-base font-normal mr-2.5 block leading-7'>
                Sort by:
              </span>
              <span className="text-zinc-800 text-base font-semibold  leading-tight">
                {options.find((option) => option.href == _.get(values, id, ""))
                  ?.name || ""}
              </span>{" "}
              <ChevronDownIcon
                className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-600 group-hover:text-gray-500'
                aria-hidden='true'
              />
            </Menu.Button>
          </div>

          <Menu.Items
            // transition
            className='absolute right-0 z-10 mt-2 min-w-max origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
          >
            <div className='py-1 w-full'>
              {options.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <button
                      onClick={wrapClick(() => setFieldValue(id, option.href))}
                      className={classNames(
                        _.get(values, id, null) == option.href
                          ? "font-medium text-gray-900 "
                          : "text-gray-500",
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm w-full text-start"
                      )}
                    >
                      {option.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default SortSelect;
