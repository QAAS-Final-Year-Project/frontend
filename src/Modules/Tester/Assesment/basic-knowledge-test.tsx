import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { Icon } from "@iconify/react";
import { FailStampImage, PassesStampImage } from "assets";
import AppConfig from "config";
import { FC } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "Shared/components/buttons/primary-button";

const BasicKnowledgeTest: FC<{ data: any; refetch: () => void }> = ({
  data,
  refetch,
}) => {
  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {data?.status == "Pending" ? (
        <div className='space-y-6 divide-y divide-gray-200 p-6 overflow-y-auto flex-1'>
          <div className='p-4'>
            <div className='min-h-[600px]  rounded-lg border-2 mt-8 border-dashed items-center justify-center flex'>
              <div className='text-center'>
                <div className='flex items-center justify-center mb-4'>
                  <Icon
                    icon={"lucide:clipboard-list"}
                    className='text-[#333333]  text-center w-12 h-12'
                  />
                </div>
                <h3 className='mt-2  font-semibold text-gray-900'>
                  Basic Knowledge test not yet taken
                </h3>
                <p className='mt-1  text-zinc-500'>
                  You have not taken the basic knowledge test yet.
                </p>
                <div className='mt-6'>
                  <Link
                    to={AppConfig.typeForm.basicTestUri + data?.createdBy}
                    target='_blank'
                    // download
                    rel='noreferrer'
                  >
                    <PrimaryButton
                      icon={"ic:baseline-arrow-right-alt"}
                      iconPosition='right'
                      className='w-full '
                      text='Take Test '
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-4'>
          <div className='min-h-[600px] relative  rounded-lg border-2 mt-8 border-dashed items-center justify-center flex'>
            <div className='flex justify-start absolute top-10 left-10'>
              <img
                src={
                  data?.basicTest?.testScore <
                  AppConfig.typeForm.basicTestPassMark
                    ? FailStampImage
                    : PassesStampImage
                }
                className='h-32 '
                alt=''
              />
            </div>
            <div className='text-center'>
              <div className='flex items-center justify-center mb-4'>
                <Icon
                  icon={"lucide:clipboard-check"}
                  className='text-[#333333]  text-center w-12 h-12'
                />
              </div>
              <h3 className='mt-2  font-semibold text-gray-900'>
                You have taken the test
              </h3>
              <p className='mt-1  text-gray-500'>Your test score is</p>
              <div className='mt-4 text-4xl font-semibold'>
                {data?.basicTest?.testScore}
              </div>

              {data?.basicTest?.testScore <
                AppConfig.typeForm.basicTestPassMark && (
                <div className='mt-6'>
                  <Link
                    to={AppConfig.typeForm.basicTestUri + data?.createdBy}
                    target='_blank'
                    // download
                    rel='noreferrer'
                  >
                    <PrimaryButton
                      icon={"ic:baseline-arrow-right-alt"}
                      iconPosition='right'
                      className='w-full '
                      text='Retake '
                    />
                  </Link>
                </div>
              )}
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

export default BasicKnowledgeTest;
