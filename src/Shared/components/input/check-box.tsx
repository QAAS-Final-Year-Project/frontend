import { FC } from "react";

interface CheckBoxProps {
  id: string;
  label?: string;
  checked: boolean;
  handleChange: any;
  disabled?: boolean;
  required?: boolean;
  errors?: any;
  touched?: any;
  labelHidden?: boolean;
}

const CheckBox: FC<CheckBoxProps> = ({
  id,
  label,
  checked,
  handleChange,
  errors,
  touched,
  required,
  disabled,
  labelHidden,
}) => {
  return (
    <>
      <div className={labelHidden ? "" : "mt-1 flex gap-x-2 items-center"}>
        <input
          type='checkbox'
          checked={checked}
          onChange={handleChange}
          name={id}
          id={id}
          disabled={disabled}
          className='h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-600'
        />
        <label
          htmlFor={id}
          className='text-stone-500 text-base font-normal '
        >
          {label} {required ? "*" : ""}
        </label>
      </div>
    </>
  );
};

export default CheckBox;
