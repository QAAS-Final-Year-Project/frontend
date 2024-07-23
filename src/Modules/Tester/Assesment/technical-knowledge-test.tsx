import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusSmallIcon,
} from "@heroicons/react/20/solid";
import { Icon } from "@iconify/react";
import { FailStampImage, PassesStampImage } from "assets";
import AppConfig from "config";
import { FC } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "Shared/components/buttons/primary-button";

const TechnicalKnowledgeTest: FC<{ data: any; refetch: () => void }> = ({
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
                <div className='flex items-center justify-center mb-4'>
                  <Icon
                    icon={"lucide:clipboard-list"}
                    className='text-[#333333]  text-center w-12 h-12'
                  />
                </div>
                <h3 className='mt-2  font-semibold text-gray-900'>
                  Technical Knowledge test not yet taken
                </h3>
                <p className='mt-1  text-zinc-500'>
                  You have not taken the technical knowledge test yet.
                </p>
                <div className='mt-6'>
                  <Link
                    to={AppConfig.typeForm.technicalTestUri + data?.createdBy}
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
                  data?.technicalTest?.testScore <
                  AppConfig.typeForm.technicalTestPassMark
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
              <div className='mt-4 mb-4 text-4xl font-semibold'>
                {data?.technicalTest?.testScore}
              </div>
              {data?.technicalTest?.testScore >=
                AppConfig.typeForm.technicalTestPassMark && (
                <>
                  {data?.status == "Approved" ? (
                    <div className='rounded-md bg-green-50 p-4 w-full mt-1'>
                      <div className='flex justify-start'>
                        <div className='flex-shrink-0'>
                          <CheckCircleIcon
                            className='h-5 w-5 text-green-400'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='ml-3'>
                          <h3 className='font-medium text-green-800 text-start'>
                            Congratulations
                          </h3>
                          <div className='mt-2 text-start text-green-700'>
                            <p>
                              Your account has been successfully verified and
                              approved
                            </p>
                            <p>You can begin to take on projects</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='rounded-md bg-yellow-50 p-4 w-full mt-1'>
                      <div className='flex justify-start'>
                        <div className='flex-shrink-0'>
                          <ExclamationTriangleIcon
                            className='h-5 w-5 text-yellow-400'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='ml-3'>
                          <h3 className='text-sm font-medium text-yellow-800 text-start'>
                            Attention
                          </h3>
                          <div className='mt-2 text-sm text-yellow-700'>
                            <p>
                              Your assessment is completed we are reviewing your
                              profile and will get back to you soon.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              {data?.technicalTest?.testScore <
                AppConfig.typeForm.technicalTestPassMark && (
                <div className='mt-6'>
                  <Link
                    to={AppConfig.typeForm.technicalTestUri + data?.createdBy}
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

export default TechnicalKnowledgeTest;
