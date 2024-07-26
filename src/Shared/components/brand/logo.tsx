import { FC } from "react";
import AuthLogo from "Modules/Auth/components/auth-logo";
import LoadingIcon from "../icons/loading-icon";
import { classNames } from "Shared/utils/ui";
interface LogoProps {
  className?: string;
  color?: string;
  isCollapsed?: boolean;
  [key: string]: any;
}

const Logo: FC<LogoProps> = ({ className, isCollapsed, color, ...props }) => {
  return (
    <div className='flex gap-x-2'>
      <svg
        width={46}
        height={60}
        className='h-15 w-auto'
        viewBox='0 0 46 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <path
          d='M40.0273 14.0352C40.0547 13.6992 40.0859 13.3711 40.0859 13.0352C40.0859 5.83203 34.1914 0 26.9297 0C21.625 0 17.0625 3.125 14.9844 7.60156C13.8906 6.83203 12.5508 6.375 11.1016 6.375C7.39063 6.375 4.39062 9.35547 4.39062 13.0352C4.39062 13.5859 4.46094 14.1211 4.58984 14.6328C1.85547 16.1094 0 18.9844 0 22.2852C0 27.0977 3.9375 31 8.79297 31H37.2031C42.0625 31 46 27.0977 46 22.2852C46 18.4492 43.5039 15.2031 40.0273 14.0352ZM39.5156 21.4648C39.2148 24.625 37.0039 27.9922 31.6992 27.9922C27.6914 27.9922 23.8789 23.7773 22.2148 21.4297C22.2109 21.4219 19.1055 16.6719 15.668 16.793C12.3047 16.9141 11.4219 18.668 11.2695 20.2383C11.1172 21.8086 12.0234 23.4219 13.4727 24.1602C15.2852 25.0898 17.5508 24.5156 19.8398 22.5508L22.0859 25.1211C19.875 27.0273 17.5156 28 15.2773 28.0039C14.1055 28.0039 12.9609 27.7344 11.8945 27.1914C9.1875 25.8086 7.5625 22.8867 7.85156 19.918C8.15234 16.7656 10.3633 13.3945 15.668 13.3945C20.4023 13.3945 23.7266 17.6562 24.8047 19.1484C26.5977 21.6211 29.7266 24.5898 31.6992 24.5898C35.0625 24.5898 35.9453 22.7148 36.0977 21.1445C36.25 19.5742 35.3438 17.9648 33.8945 17.2227C32.082 16.3008 29.8242 16.8672 27.5273 18.8359L25.2812 16.2578C28.6562 13.3633 32.3672 12.6133 35.4727 14.1992C38.1797 15.582 39.8047 18.4961 39.5156 21.4648Z'
          fill='#2A41E8'
        />
      </svg>
      {!isCollapsed && (
        <h4 className={classNames("text-[#222222] text-2xl", color)}>
          Test Universal
        </h4>
      )}
    </div>
  );
};

export default Logo;
