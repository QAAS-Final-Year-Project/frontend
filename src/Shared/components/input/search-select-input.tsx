import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";
import _ from "lodash";
import { FC, useMemo, useState } from "react";

interface Option {
  label: {
    title: string;
    imageUrl?: string;
  };
  value: string | object;
}

interface SearchSelectInputProps {
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
  icon?: string;
}

const SearchSelectInput: FC<SearchSelectInputProps> = ({
  id,
  options: __options,
  values,
  setFieldValue,
  placeholder,
  label,
  errors,
  touched,
  required,
  labelHidden,
  disabled,
  position = "bottom",
  className = "",
  icon,
}) => {
  const [query, setQuery] = useState("");
  const options = useMemo(
    () =>
      __options.map(({ label, value }) => ({
        label,
        value: _.isObject(value) ? _.omit(value, "__typename") : value,
      })),
    [__options]
  );

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as='div'
      disabled={disabled}
      value={_.get(values, id, null)}
      onChange={(val) => setFieldValue(id, val)}
    >
      {!labelHidden && (
        <Combobox.Label className='block font-medium text-zinc-800 text-base   leading-[27px] '>
          {label}
          {/* {required ? "*" : ""} */}
        </Combobox.Label>
      )}
      <div className={classNames(labelHidden ? "" : "mt-3", "relative")}>
        <Combobox.Input
          style={{
            paddingLeft: icon ? 66 : 12,
          }}
          className={classNames(
            disabled ? "cursor-not-allowed bg-gray-100" : "bg-white",
            "w-full rounded border border-gray-300 py-2.5 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-base placeholder:font-medium placeholder:text-zinc-500 placeholder:text-sm",

            className
          )}
          placeholder={placeholder}
          autoComplete='none'
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: any) =>
            options.find((o) => _.isEqual(o.value, option))?.label?.title ?? ""
          }
        />
        {icon && (
          <div
            className={classNames(
              "pointer-events-none absolute text-neutral-400 inset-y-0 left-0 flex items-center h-full bg-stone-50 rounded-tl border rounded-bl px-[14.5px]",
              _.get(errors, id) && _.get(touched, id)
                ? "focus:ring-red-500 focus:border-red-500 border-red-600  !outline-red-500"
                : " border-gray-300 focus:!ring-primary-500 focus:!border-primary-500  outline-primary-500"
            )}
          >
            <Icon icon={icon} className='w-[19px] h-[19px]' />
          </div>
        )}
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r px-2 focus:outline-none'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options
            className={classNames(
              position === "top" ? "mb-1 bottom-10" : "mt-1",
              "absolute z-10 max-h-56 w-full overflow-auto rounded bg-white py-1 text-sm shadow-lg text-zinc-500  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            )}
          >
            {position === "bottom" && (
              <Combobox.Option
                value={""}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9 font-medium text-sm",
                    active ? "bg-primary-600 text-white" : "text-zinc-500 "
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <span className={""}>Select One</span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-primary-600"
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            )}
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={JSON.stringify(option.value)}
                value={option.value}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-primary-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      {option.label.imageUrl && (
                        <img
                          src={option.label.imageUrl}
                          alt=''
                          className='h-6 w-6 flex-shrink-0 rounded-full object-cover'
                        />
                      )}
                      <span
                        className={classNames(
                          option.label.imageUrl ? "ml-3" : "",
                          "truncate",
                          selected ? "font-semibold" : ""
                        )}
                      >
                        {option.label.title}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-primary-600"
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
            {position === "top" && (
              <Combobox.Option
                value={""}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9 font-light",
                    active ? "bg-primary-600 text-white" : "text-gray-500"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <span className={""}>Select One</span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-primary-600"
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            )}
          </Combobox.Options>
        )}
      </div>
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {_.get(errors, id)}
        </p>
      ) : null}
    </Combobox>
  );
};

export default SearchSelectInput;
