import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { Tooltip } from "react-tooltip";
import { classNames } from "Shared/utils/ui";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  step: number;
  minValue: number;
  maxValue: number;
  label?: string;

  labelHidden?: boolean;

  id: string;
  renderMinValue?: (minValue: any) => string;
  renderMaxValue?: (maxValue: any) => string;

  onInput: (e: { minValue: number; maxValue: number }) => void;
}

const CustomMultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  step,
  minValue,
  maxValue,
  renderMinValue,
  renderMaxValue,
  onInput,
  label,
  labelHidden,

  id,
}) => {
  return (
    <>
      <Tooltip
        className='text-xs px-0'
        anchorSelect={`#${id}`}
        place='top'
        isOpen={true}
      >
        {`${renderMinValue?.(minValue) || minValue} - ${
          renderMaxValue?.(maxValue) || maxValue
        }`}
      </Tooltip>
      {!labelHidden && (
        <label
          htmlFor={id}
          id={`tooltip-${id}`}
          className='text-zinc-800 text-base flex items-center gap-x-1  leading-[27px]  w-max'
        >
          {label}
        </label>
      )}
      <div className={classNames(labelHidden ? "" : "mt-3", "relative mt-12")}>
        <MultiRangeSlider
          id={id}
          min={min}
          max={max}
          step={step}
          minValue={minValue}
          maxValue={maxValue}
          onInput={onInput}
          
          ruler={false}
          barInnerColor={"#2A41E8"}
          maxCaption=''
          minCaption=''
          baseClassName=''
          label=''
          className='multi-range-slider !py-2.5 !border-none !shadow-none [&_*]:!border-none [&_*]:!shadow-none [&_*::before]:!shadow-none [&_.thumb-left::before]:!border-primary-500 [&_.thumb-right::before]:!border-primary-500 [&_.thumb-right::before]:!border-2 [&_.thumb-left::before]:!border-2 [&_.thumb-left::before]:!ring-4 [&_.thumb-right::before]:!ring-4 [&_.thumb]:bg-white'
          barLeftColor='#d7d7d7'
          barRightColor='#d7d7d7'
          thumbLeftColor='#fff'
          thumbRightColor='#fff'
        />
      </div>
    </>
  );
};

export default CustomMultiRangeSlider;
