import _ from "lodash";
import { CSSProperties, FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface RichInputProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  values: any;
  handleChange: any;
  handleBlur: any;
  errors?: any;
  touched?: any;
}

const RichInput: FC<RichInputProps> = ({
  id,
  disabled,
  required,
  values,
  handleChange,
  placeholder,
  label,
  errors,
  touched,
}) => {
  return (
    <div className='mb-4'>
      <label className='text-zinc-800 text-base flex items-center gap-x-1  leading-[27px]  w-max'>
        {label}
        {required && <span className={`text-red-700`}>*</span>}
      </label>
      <div className='mt-3'>
        <ReactQuill
          className={`block w-full quill-rounded h-32 border-gray-300 focus:outline-none focus:ring-secondary focus:border-secondary text-base`}
          onChange={(event) => {
            handleChange({
              target: {
                name: id,
                value: event,
              },
            });
          }}
          id={id}
          style={{ borderRadius: "30px" }}
          placeholder={placeholder}
          onBlur={() => {}}
          value={_.get(values, id, "")}
          theme='snow'
        />
      </div>
      {_.get(errors, id) && _.get(touched, id) ? (
        <p className='mt-2 text-sm text-red-600' id={`${id}-error`}>
          {_.get(errors, id)}
        </p>
      ) : null}
    </div>
  );
};

export default RichInput;
