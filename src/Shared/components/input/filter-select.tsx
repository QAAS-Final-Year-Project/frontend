import { FC } from "react";
import { upperFirst } from "lodash";
import _ from "lodash";
import { classNames } from "../../utils/ui";

interface Option {
  label: string | React.ReactNode;
  value: string | number;
}

interface SelectInputProps {
  id: string;
  label: string;
  placeholder?: string;
  isFilter?: boolean;
  required?: boolean;
  disabled?: boolean;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any;
  defaultValue?: string;
  options: (string | Option)[];
}

const SelectInput: FC<SelectInputProps> = ({
  id,
  disabled,
  required,
  options,
  values,
  handleChange,
  handleBlur,
  isFilter,
  placeholder,
  label,
  errors,
  touched,
  defaultValue,
}) => {
  return (
    <div className={classNames(isFilter ? "flex items-center " : "flex-col")}>
      <label
        htmlFor={id}
        className={classNames(
          isFilter ? "text-stone-500 " : "text-gray-700",
          "block  text-base font-normal"
        )}
      >
        {label} {required ? "*" : ""} {isFilter && <span>:</span>}
      </label>
      <div className='mt-1'>
        <select
          name={id}
          id={id}
          value={_.get(values, id, "")}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          defaultValue={defaultValue}
          required={required}
          // placeholder={placeholder ?? ""}
          className={classNames(
            _.get(values, id, "") === "" ? "font-light text-xs" : "text-sm",
            _.get(errors, id) && _.get(touched, id)
              ? "focus:ring-red-500 focus:border-red-500 border-red-600 outline-red-500"
              : " focus:border-primary-500 border-gray-300 focus:outline-primary-500 ",
            disabled ? "cursor-not-allowed bg-gray-100" : "",
            isFilter
              ? "border-none outline-none pr-8 pt-w  bg-transparent focus:!ring-0 focus:ring-transparent focus:outline-transparent"
              : "border shadow-sm ",
            "block w-full sm:text-base rounded placeholder:font-medium placeholder:text-zinc-500 placeholder:text-sm h-[48px] text-zinc-800 text-base font-semibold "
          )}
        >
          {options?.map((option, idx) => (
            <option key={idx} value={(option as Option)?.value}>
              {(option as Option)?.label}
            </option>
          ))}
        </select>
      </div>
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {_.get(errors, id)}
        </p>
      ) : null}
    </div>
  );
};

export default SelectInput;
