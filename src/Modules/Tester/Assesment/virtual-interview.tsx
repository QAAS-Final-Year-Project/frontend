import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { Link } from "react-router-dom";

const VirtualInterview: FC<{ data: any; refetch: () => void }> = ({
  data,
  refetch,
}) => {
  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {data?.status == "BasicTestTaken" ? (
        <div className='space-y-6 divide-y divide-gray-200 p-6 overflow-y-auto flex-1'>
          <div className='p-4'>
            <div className='min-h-[600px]  rounded-lg border-2 mt-8 border-dashed items-center justify-center flex'>
              <div className='text-center'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    vectorEffect='non-scaling-stroke'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                  />
                </svg>
                <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                  No Interview Taken
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  You have not taken your virtual interview yet
                </p>
                <div className='mt-6'>
                  <Link
                    to='/new-shep-regularization'
                    className='inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                  >
                    <PlusSmallIcon
                      className='-ml-0.5 mr-1.5 h-5 w-5'
                      aria-hidden='true'
                    />
                    Begin Interview
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4'>
          <div className='min-h-[600px]  rounded-lg border-2 mt-8 border-dashed items-center justify-center flex'>
            <div className='text-center'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  vectorEffect='non-scaling-stroke'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                />
              </svg>
              <h3 className='mt-2 text-sm font-semibold text-gray-900'>
                You have taken the interview
              </h3>
              <p className='mt-1 text-sm text-gray-500'></p>
              <p className=' text-sm '>
                <a
                  href={data?.interview?.uploadUrl}
                  target='_blank'
                  // download
                  rel='noreferrer'
                  className='whitespace-nowrap  text-primary-500 hover:text-primary-600'
                >
                  Click Here to View
                  <span aria-hidden='true'> &rarr;</span>
                </a>
              </p>{" "}
            </div>
          </div>
        </div>
      )}
      {/* <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:py-4 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200'>
        <button
          type='button'
          className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm'
        >
          {"Resolve Ticket"}
        </button>
        <button
          type='button'
          className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm'
        >
          {"Escalate Ticket"}
        </button>
      </div>{" "} */}
    </div>
  );
};

export default VirtualInterview;
