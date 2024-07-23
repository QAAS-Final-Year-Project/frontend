import { FC } from "react";
import { ButtonProps } from "./index.types";
import { Icon } from "@iconify/react";
import LoadingIcon from "../icons/loading-icon";
import { classNames } from "Shared/utils/ui";

const sizesMap = {
  xs: "px-3 py-2 text-sm",
  sm: "px-4 py-2 text-sm",
  md: "py-2.5  px-4 text-base",
  lg: "py-3 px-5 text-lg",
};
const loaderSizesMap = {
  xs: 12.5,
  sm: 15,
  md: 30,
  lg: 40,
};
const PrimaryButton: FC<
  ButtonProps & {
    size?: "sm" | "md" | "lg" | "xs";
    iconPosition?: "left" | "right";
    className?: string;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: any;
    count?: number;
  }
> = ({
  text,
  onClick,
  className,
  icon,
  iconPosition,
  type = "button",
  loading,
  size = "md",
  hideTitle,
  // size = "md",
  disabled,
  count,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      title={text}
      disabled={loading || disabled}
      className={classNames(
        sizesMap[size],
        "bg-primary-500 text-white  rounded shadow flex  gap-x-2 items-center justify-center hover:bg-primary-600 disabled:bg-opacity-80 disabled:cursor-not-allowed ",
        iconPosition === "right" ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {loading ? (
        <LoadingIcon
          className={`animate-spin h-5 w-5 mx-2 fill-white ${
            loading ? "block" : "hidden"
          }`}
        />
      ) : (
        <>
          {icon && <Icon icon={icon} color='#fff' className='w-5 h-5' />}
          {!hideTitle && text}
          {count && (
            <div className='flex items-center w-5 h-5 justify-center bg-white/25 rounded-full '>
              <div className="text-center text-white text-[11px] font-bold  ">
                {count}
              </div>
            </div>
          )}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
