import Logo from "Shared/components/brand/logo";
import { FC, ReactNode } from "react";

const AuthLogo: FC<{ title: string | JSX.Element }> = ({ title }) => {
  return (
    <div className='sm:mx-auto  sm:max-w-md'>
      <Logo />

      <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
        {title}
      </h2>
    </div>
  );
};

export default AuthLogo;
