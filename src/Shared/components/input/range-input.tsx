import { R } from "@tanstack/react-query-devtools/build/legacy/devtools-9h89nHJX";
import { classNames } from "Shared/utils/ui";
import _ from "lodash";
import { FC, useEffect, useState } from "react";

interface RangeInputProps {
  id: string;
  label?: string;
  disabled?: boolean;
  step?: number;
  required?: boolean;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any;
  min?: number;
  labelHidden?: boolean;
  max?: number;
}
const RangeInput: FC<RangeInputProps> = ({
  id,
  values,
  handleChange,
  handleBlur,
  label,
  errors,
  touched,
  step,
  required,
  labelHidden,
  disabled,
  max,
  min,
}) => {
  const [centWidth, setCentWidth] = useState(0);

  useEffect(() => {
    const value = _.get(values, id);
    const cent = ((value - min) / (max - min)) * 100;
    setCentWidth(cent);
  }, [_.get(values, id)]);
  return (
    <>
      {!labelHidden && (
        <label
          htmlFor={id}
          className='text-zinc-800 text-base   leading-[27px]'
        >
          {label} {required ? "*" : ""}
        </label>
      )}
      <div className={classNames(labelHidden ? "" : "mt-3", "relative")}>
        <input
          type='range'
          min={min}
          onChange={handleChange}
          onBlur={handleBlur}
          name={id}
          id={id}
          max={max}
          disabled={disabled}
          required={required}
          step={step}
          className='w-full custom-slider'
        />
        <div
          className='h-1 bg-primary-500 top-3 absolute left-0 rounded-[5px]'
          style={{
            width: `${centWidth}%`,
          }}
        ></div>
      </div>
    </>
  );
};

export default RangeInput;
