import { FC } from "react";
import _ from "lodash";
import { classNames, wrapImage } from "Shared/utils/ui";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  disabled?: boolean;
  shape?: "circle" | "square";
}

const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  size = "sm",
  disabled,
  shape = "circle",
}) => {
  if (src?.length) {
    return !disabled ? (
      wrapImage(
        <img
          className={classNames(
            size === "sm" ? "h-10 w-10 " : "",
            size === "md" ? "h-14 w-14 " : "",
            size === "lg" ? "h-20 w-20 " : "",
            size === "xl" ? "h-28 w-28 " : "",
            size === "2xl" ? "h-36 w-36" : "",
            " object-cover z-0",
            shape === "circle" ? "rounded-full" : "rounded"
          )}
          src={src}
          alt={alt}
        />
      )
    ) : (
      <img
        className={classNames(
          size === "sm" ? "h-10 w-10 " : "",
          size === "md" ? "h-14 w-14 " : "",
          size === "lg" ? "h-20 w-20 " : "",
          size === "xl" ? "h-28 w-28 " : "",
          size === "2xl" ? "h-36 w-36" : "",
          "object-cover z-0",
          shape === "circle" ? "rounded-full" : "rounded"
        )}
        src={src}
        alt={alt}
      />
    );
  }

  if(!src?.length && shape === "square"){
    <img
    className={classNames(
      size === "sm" ? "h-10 w-10 " : "",
      size === "md" ? "h-14 w-14 " : "",
      size === "lg" ? "h-20 w-20 " : "",
      size === "xl" ? "h-28 w-28 " : "",
      size === "2xl" ? "h-36 w-36" : "",
      "object-cover z-0 rounded",
    )}
    src={"https://www.vasterad.com/themes/hireo_21/images/user-avatar-placeholder.png"}
    alt={alt}
  />
  }
  return (
    <div
      className={classNames(
        size === "sm" ? "h-10 w-10 " : "",
        size === "md" ? "h-14 w-14 " : "",
        size === "lg" ? "h-20 w-20 " : "",
        size === "xl" ? "h-28 w-28 " : "",
        size === "2xl" ? "h-36 w-36" : "",
        "flex items-center justify-center bg-gray-200",
        shape === "circle" ? "rounded-full" : "rounded"
      )}
    >
      <span className='text-sm'>
        {_.chain(alt)
          .split(" ")
          .slice(0, 2)
          .map((s) => s.charAt(0))
          .join("")
          .upperCase()
          .value()}
      </span>
    </div>
  );
};

export default Avatar;
