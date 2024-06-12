import { CheckIcon } from "@heroicons/react/24/solid";
import _ from "lodash";
import { FC } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface StepWizardProps {
  steps: any[];
  step: number;
  setStep: (step: number) => void;
  lastStep: number;
}

const StepWizard: FC<StepWizardProps> = ({
  steps,
  step: currentStep,
  setStep,
  lastStep,
}) => {
  return (
    <nav className=''>
      <ol className='flex-1 flex space-x-2  border-gray-300 border bg-white md:space-x-8'>
        {steps.map((step, stepIdx) => (
          <li key={step.href} className='relative flex-1 flex'>
            {step.href === currentStep ? (
              <button
                onClick={() => setStep(step.href)}
                disabled={step.href > lastStep}
                className={classNames(
                  step.href > lastStep
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
                  "flex items-center px-6 py-4 text-sm font-medium"
                )}
                aria-current='step'
              >
                <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary-600'>
                  <span className='text-primary-600'>{step.href + 1}</span>{" "}
                </span>{" "}
                <span className='ml-4 text-sm font-medium text-primary-600'>
                  {step.name}
                </span>
              </button>
            ) : step.href < lastStep ? (
              <button
                onClick={() => setStep(step.href)}
                disabled={step.href > lastStep}
                className={classNames(
                  step.href > lastStep
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
                  "group flex w-full items-center"
                )}
              >
                <span className='flex items-center px-6 py-4 text-sm font-medium'>
                  <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 group-hover:bg-primary-800'>
                    <CheckIcon
                      className='h-6 w-6 text-white'
                      aria-hidden='true'
                    />
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-900'>
                    {step.name}
                  </span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => setStep(step.href)}
                disabled={step.href > lastStep}
                className={classNames(
                  step.href > lastStep
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
                  "group flex items-center"
                )}
              >
                <span className='flex items-center px-6 py-4 text-sm font-medium'>
                  <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400'>
                    <span className='text-gray-500 group-hover:text-gray-900'>
                      {step.href + 1}
                    </span>
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900'>
                    {step.name}
                  </span>
                </span>
              </button>
            )}
            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className='absolute right-0 top-0 hidden h-full w-5 md:block'
                  aria-hidden='true'
                >
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 22 80'
                    fill='none'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0 -2L20 40L0 82'
                      vectorEffect='non-scaling-stroke'
                      stroke='currentcolor'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepWizard;
