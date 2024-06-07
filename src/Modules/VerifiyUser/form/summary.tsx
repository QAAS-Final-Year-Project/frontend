import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { IVerifyUserFormSchema } from "./schema";
import { classNames, wrapClick } from "Shared/utils/ui";

interface SummaryPageProps {
  handlePrevious: () => void;
  handleStep: (step: number) => void;
  handleSubmit: () => void;
  handleCancel: () => void;
  submitLoading: boolean;
  steps: any[];
  values: IVerifyUserFormSchema;
}

const SummaryPage: FC<SummaryPageProps> = ({
  values,
  handlePrevious,
  handleStep,
  submitLoading,
  steps,
  ...form
}) => {
  return (
    <form
      onSubmit={form.handleSubmit}
      className='flex-1 flex flex-col overflow-hidden'
    >
      <div className='space-y-6 divide-y divide-gray-200 p-4 md:p-6 overflow-y-auto flex-1'>
        {steps.map(({ SummaryComponent, ...summary }, idx) => (
          <Disclosure
            as='div'
            defaultOpen={true}
            key={idx}
            className={idx === 0 ? " py-4" : " py-4"}
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  as='div'
                  className='flex justify-between items-center cursor-pointer'
                >
                  <div>
                    <h3 className='text-md leading-6 font-normal text-gray-900 dark:text-gray-100'>
                      {summary.name}
                    </h3>
                    <p className='mt-1 text-xs text-gray-500'>
                      {summary.description}
                    </p>
                  </div>
                  <div>
                    {open ? (
                      <ChevronUpIcon className='h-6 w-6 text-gray-400 dark:text-gray-500' />
                    ) : (
                      <ChevronDownIcon className='h-6 w-6 text-gray-400 dark:text-gray-500' />
                    )}
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel as='div' className='mt-6'>
                  <SummaryComponent
                    data={(values as any)[summary.accessor]}
                    values={values}
                  />
                  <div className='pt-5'>
                    <div className='flex justify-end'>
                      <button
                        type='button'
                        onClick={() => handleStep(summary.href)}
                        className='ml-3 inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-gray-600 border-gray-600 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                      >
                        <PencilSquareIcon
                          className='-ml-0.5 mr-1.5 h-4 w-4'
                          aria-hidden='true'
                        />
                        Edit
                      </button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>

      <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:py-4 sm:px-6 flex flex-row-reverse border-t border-gray-200'>
        <button
          type='submit'
          disabled={submitLoading}
          className={classNames(
            submitLoading ? "cursor-not-allowed" : "cursor-pointer",
            "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ml-3 sm:w-auto sm:text-sm"
          )}
        >
          {submitLoading ? "Submitting..." : "Submit"}
        </button>
        <button
          type='button'
          className='w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={wrapClick(handlePrevious)}
        >
          Previous
        </button>
        <button
          type='button'
          className='w-full hidden md:inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={wrapClick(form.handleCancel)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SummaryPage;
