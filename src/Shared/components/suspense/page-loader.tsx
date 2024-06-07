import { FC } from "react";
import HashLoader from "react-spinners/HashLoader";

interface LoaderProps {
  text?: string;
}

const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <div className='h-screen w-screen flex-1 flex flex-col space-y-6 items-center justify-center'>
      {/* <span className='text-info-500 text-sm'>
        {text ?? "Loading details..."}
      </span> */}
      <HashLoader
        color={"#2A41E8"}
        className="h-60"
        loading={true}
        cssOverride={{ width: "50%" }}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Loader;
