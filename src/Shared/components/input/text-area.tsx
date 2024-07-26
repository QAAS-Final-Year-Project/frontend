import { FC } from "react";
import _ from "lodash";
import { classNames } from "Shared/utils/ui";

interface TextAreaProps {
  id: string;
  label: string;
  rows?: number;
  placeholder?: string;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any;
  required?: boolean;
  disabled?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  rows,
  values,
  handleChange,
  handleBlur,
  placeholder,
  disabled,
  label,
  errors,
  touched,
  required,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className='block  font-medium text-zinc-800 text-base   leading-[27px]'
      >
        {label} {required ? <span className='text-red-500'>*</span> : ""}
      </label>
      <div className='mt-3'>
        <textarea
          name={id}
          id={id}
          value={_.get(values, id)}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder ?? ""}
          rows={rows ?? 3}
          required={required}
          className={classNames(
            _.get(errors, id) && _.get(touched, id)
              ? "focus:ring-red-500 focus:border-red-500 border-red-600  !outline-red-500"
              : " border-gray-300 focus:!ring-primary-500 focus:!border-primary-500  outline-primary-500",
            "shadow-sm block w-full sm:text-base rounded placeholder:font-medium placeholder:text-zinc-500 placeholder:text-sm border p-5"
          )}
        />
      </div>
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {errors[id]}
        </p>
      ) : null}
    </>
  );
};

export default TextArea;
