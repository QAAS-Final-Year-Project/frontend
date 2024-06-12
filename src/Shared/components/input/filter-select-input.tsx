import { Combobox, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";
import _ from "lodash";
import { FC, useMemo, useState } from "react";

interface Option {
  label: string;
  value: string | object;
}

interface FilterSelectInputProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  labelHidden?: boolean;
  values: any;
  errors?: any;
  touched?: any;
  options: Option[];
  optionsLoading?: boolean;
  setFieldValue: any;
  position?: "top" | "bottom";
  className?: string;
}

const FilterSelectInput: FC<FilterSelectInputProps> = ({
  id,
  options: __options,
  values,
  setFieldValue,
  placeholder,
  label,
  disabled,
  position = "bottom",
  className = "",
}) => {
  const options = useMemo(
    () =>
      __options.map(({ label, value }) => ({
        label,
        value: _.isObject(value) ? _.omit(value, "__typename") : value,
      })),
    [__options]
  );

  return (
    <Listbox
      as='div'
      disabled={disabled}
      value={_.get(values, id, null)}
      className={"flex items-center "}
      onChange={(val) => setFieldValue(id, val)}
    >
      {({ open, value }) => (
        <>
          <Listbox.Label className=' block text-stone-500 text-base font-normal leading-7'>
            {label}:
          </Listbox.Label>
          <div className='relative '>
            <Listbox.Button className='relative w-full cursor-pointer rounded  pl-1.5 pr-7 text-left   sm:text-sm sm:leading-6'>
              <span className='inline-flex w-full truncate text-zinc-800 text-base font-semibold leading-tight'>
                <span className='truncate'>
                  {options.find((o) =>
                    _.isEqual(o.value, _.get(values, id, ""))
                  )?.label ?? ""}
                </span>
                <span className='ml-2 truncate text-gray-500'></span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex mb-0.5 items-center pr-2'>
                <Icon
                  icon={"ic:baseline-arrow-drop-down"}
                  className=' w-6 h-6 text-neutral-400'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute  mt-1 max-h-60 w-max  overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm pt-[15px] pb-[10px] px-[5px]'>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value as any}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-primary-500 text-white" : "",
                        !active ? "text-gray-900" : "",
                        "relative cursor-default select-none py-[7px] pr-[35px] pl-[10px]"
                      )
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex'>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "truncate  text-base"
                            )}
                          >
                            {option.label}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default FilterSelectInput;
