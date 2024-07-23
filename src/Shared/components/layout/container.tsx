import { classNames } from "Shared/utils/ui";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  fluid = false,
}) => {
  return (
    <div
      className={classNames(
        fluid ? "w-full" : "w-full max-w-full px-4 mx-auto",
        "sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-x/l 2xl:max-w-[1210px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
