import { FC } from "react";
import BarLoader from "react-spinners/BarLoader";


interface LoaderProps {
text?: string;
}

const Loader: FC<LoaderProps> = ({
text
}) => {

  return (
    <div className='flex-1 flex flex-col space-y-6 items-center justify-center'>
      <span className="text-gray-600 text-sm">{text ?? "Loading details..."}</span>
      <BarLoader
        color={"#3A6EA5"}
        loading={true}
        cssOverride={{width: "30%"}}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>)
}

export default Loader;