import { FC } from "react";
import AuthLogo from "Modules/Auth/components/auth-logo";
import LoadingIcon from "../icons/loading-icon";
import { classNames } from "Shared/utils/ui";
import { LogoIconImage } from "assets";
interface LogoProps {
  className?: string;
  color?: string;
  isCollapsed?: boolean;
  [key: string]: any;
}

const LogoImage: FC<LogoProps> = ({
  className,
  isCollapsed,
  color,
  ...props
}) => {
  return (
    <div className='flex gap-x-2'>
      <img className={"h-20"} src={LogoIconImage} />
    </div>
  );
};

export default LogoImage;
