import { FC } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import _ from "lodash";
import { classNames, wrapClick } from "../../utils/ui";
import { useFormik } from "formik";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import { Icon } from "@iconify/react";

interface TagsInputProps {
  id: string;
  label?: string | JSX.Element;
  placeholder?: string;
  disabled?: boolean;
  values: any;
  handleChange: any;
  handleBlur: any;
  required?: boolean;
  errors?: any;
  touched?: any;
  min?: number | string;
  max?: number | string;
  labelHidden?: boolean;
  tooltip?: string;
}

const TagsInput: FC<TagsInputProps> = ({
  id,
  values,
  handleChange,
  handleBlur,
  placeholder,
  label,
  required,
  touched,
  disabled,

  min,
  errors,
  max,
  labelHidden,
  tooltip,
}) => {
  {
    tooltip && (
      <Tooltip anchorSelect={`#tooltip-${id}`} place='right-start'>
        {tooltip}
      </Tooltip>
    );
  }
  const removeItem = (itemId: number) => {
    handleChange(
      {
        target: {
          name: id,
          value: _.get(values,id )?.filter((_, idx) => idx !== itemId),
        },
      },
      true
    );
  };
  const form = useFormik<any>({
    initialValues: {
      tag: "",
    },
    onSubmit: async (localValues) => {
      if (
        !_.find(_.get(values, id), (val) => val === _.get(localValues, "tag"))
      ) {
        handleChange(
          {
            target: {
              name: id,
              value: [..._.get(values, id), _.get(localValues, "tag")],
            },
          },
          true
        );
        form.handleReset(true);
      }
    },
    onReset: () => {},
  });
  return (
    <div >
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
      <div className={classNames(labelHidden ? "" : "mt-3", "relative mb-4")}>
        <input
          type={"text"}
          name={"tag"}
          id={"tag"}
          value={_.get(form.values, "tag")}
          onChange={form.handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder ?? ""}
          style={{
            paddingRight: 0,
            paddingLeft: 20,
          }}
          className={classNames(
            _.get(errors, id) && _.get(touched, id)
              ? "focus:ring-red-500 focus:border-red-500 border-red-600  !outline-red-500"
              : " border-gray-300 focus:!ring-primary-500 focus:!border-primary-500  outline-primary-500",
            disabled ? "cursor-not-allowed bg-gray-100" : "",
            "shadow-sm block w-full sm:text-base rounded placeholder:font-medium placeholder:text-sm h-[48px] border  "
          )}
        />

        {_.get(errors, id) && _.get(touched, id) ? (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none '>
            <ExclamationCircleIcon
              className='h-5 w-5 text-red-500'
              aria-hidden='true'
            />
          </div>
        ) : null}
        <div className=' absolute inset-y-0 right-0 flex items-center pr-2'>
          <button
            type='button'
            onClick={wrapClick(form.handleSubmit)} 
            className=' p-2 bg-primary-500 hover:bg-primary-400  z-10 rounded flex justify-center items-center  cursor-pointer'
          >
            <PlusIcon className='h-5 w-5 text-white' />
          </button>
        </div>
        {_.get(errors, id) && _.get(touched, id) ? (
          <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
            {_.get(errors, id)}
          </p>
        ) : null}
      </div>
      <div className='flex items-center gap-1.5 flex-wrap'>
        {_.isArray(_.get(values, id)) &&
          _.get(values, id).map((val, idx) => (
            <button
              onClick={() => removeItem(idx)}
              className='bg-primary-100 rounded px-3 py-2 flex gap-x-1 items-center hover:bg-gray-100 text-primary-500 text-sm'
              type='button'
            >
              <XMarkIcon className='w-4 h-4' />
              <span>{val}</span>
            </button>
          ))}
      </div>

      <div></div>
    </div>
  );
};

export default TagsInput;
