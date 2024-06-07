import { FC } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import _ from "lodash";
import { classNames } from "../../utils/ui";
import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";

interface TextInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "number" | "text" | "email" | "date" | "password";
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any;
  step?: number;
  min?: number | string;
  max?: number | string;
  labelHidden?: boolean;
  maxLength?: number;
  minLength?: number;
  postText?: string;
  preText?: string;
  tooltip?: string;
}

const TextInput: FC<TextInputProps> = ({
  id,
  type,
  step,
  values,
  handleChange,
  handleBlur,
  placeholder,
  label,
  errors,
  touched,
  required,
  maxLength,
  minLength,
  disabled,
  min,
  max,
  labelHidden,
  postText,
  preText,
  tooltip,
}) => {
  return (
    <>
      {tooltip && (
        <Tooltip anchorSelect={`#tooltip-${id}`} place='right-start'>
          {tooltip}
        </Tooltip>
      )}
      {!labelHidden && (
        <label
          htmlFor={id}
          id={`tooltip-${id}`}

          className='text-zinc-800 text-base flex items-center gap-x-1  leading-[27px]'
        >
          {label} {required ? "*" : ""}
          {tooltip && (
            <Icon
              icon={"clarity:exclamation-circle-line"}
              className='w-5 h-5 text-primary-500 leading-[27px]'
            />
          )}
        </label>
      )}
      <div className={classNames(labelHidden ? "" : "mt-3", "relative")}>
        <input
          type={type ?? "text"}
          name={id}
          id={id}
          value={_.get(values, id)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder ?? ""}
          step={step}
          min={min}
          max={max}
          maxLength={maxLength}
          minLength={minLength}
          style={{
            paddingRight: (postText?.length || 0) * 10 + 20,
            paddingLeft: (preText?.length || 0) * 10 + 20,
          }}
          className={classNames(
            _.get(errors, id) && _.get(touched, id)
              ? "focus:ring-red-500 focus:border-red-500 border-red-600  !outline-red-500"
              : " border-gray-300 focus:!ring-primary-500 focus:!border-primary-500  outline-primary-500",
            disabled ? "cursor-not-allowed bg-gray-100" : "",
            "shadow-sm block w-full sm:text-base rounded placeholder:font-medium placeholder:text-zinc-500 placeholder:text-sm h-[48px] border "
          )}
        />
        {_.get(errors, id) && _.get(touched, id) ? (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <ExclamationCircleIcon
              className='h-5 w-5 text-red-500'
              aria-hidden='true'
            />
          </div>
        ) : null}
        {postText && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <span className='text-gray-500 sm:text-sm' id='price-currency'>
              {postText}
            </span>
          </div>
        )}
        {preText && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className='text-gray-500 sm:text-sm' id='price-currency'>
              {preText}
            </span>
          </div>
        )}
      </div>
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {_.get(errors, id)}
        </p>
      ) : null}
    </>
  );
};

export default TextInput;