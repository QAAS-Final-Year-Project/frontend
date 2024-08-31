import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function UnverifiedBanner() {
  return (
    <div className='flex items-center gap-x-6 sticky top-0 bg-gray-900 px-6 py-4 sm:px-3.5 sm:before:flex-1'>
      <p className='text-lg leading-6 text-white'>
        <Link to={"/dashboard"}>
          <strong className='font-semibold  text-red-500'>Action needed</strong>
          <svg
            viewBox='0 0 2 2'
            aria-hidden='true'
            className='mx-2 inline h-0.5 w-0.5 fill-current'
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          Your account has not been verified yet , you need to submit the
          required details&nbsp;
          <span aria-hidden='true' className='text-[22px]'>
            {" "}
            &rarr;
          </span>
          <span className='font-bold'> Click here to begin</span>
        </Link>
      </p>
      <div className='flex flex-1 justify-end'></div>
    </div>
  );
}
