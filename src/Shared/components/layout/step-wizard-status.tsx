import { CheckIcon } from "@heroicons/react/24/solid";
import { classNames } from "Shared/utils/ui";
import { FC } from "react";

interface StepWizardStatusProps {
  steps: any[];
  step: number;
  setStep: (step: number) => void;
  lastStep: number;
  status?: string;
}

const StepWizardStatus: FC<StepWizardStatusProps> = ({
  steps,
  step: currentStep,
  setStep,
  lastStep,
}) => {
  return (
    <nav aria-label='Progress' className='sticky top-0 h-full'>
      <ol role='list' className='overflow-hidden py-6 flex h-[65%] flex-col'>
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pb-10" : "",
              "relative flex justify-between flex-1"
            )}
          >
            {step.href === currentStep ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className={classNames(
                      step.href === lastStep ? "bg-gray-300" : "bg-primary-600",
                      "-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full"
                    )}
                    aria-hidden='true'
                  />
                ) : null}
                <button
                  onClick={() => setStep(step.href)}
                  disabled={step.href > lastStep || step?.status == "Skipped"}
                  className={classNames(
                    step.href > lastStep || step?.status == "Skipped"
                      ? "cursor-not-allowed"
                      : "cursor-pointer",
                    "relative flex items-start group"
                  )}
                  aria-current='step'
                >
                  <span className='h-9 flex items-center' aria-hidden='true'>
                    <span className='relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-primary-600 rounded-full'>
                      <span className='h-2.5 w-2.5 bg-primary-600 rounded-full' />
                    </span>
                  </span>
                  <span className='ml-4 min-w-0 flex flex-col'>
                    <span className=' text-left font-semibold tracking-wide uppercase text-primary-600'>
                      {step.name}
                    </span>
                    <span className='text-sm text-left text-gray-500'>
                      {step.description}
                    </span>
                  </span>
                </button>
              </>
            ) : step.href < lastStep && step?.status !== "Skipped" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className='-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-primary-600'
                    aria-hidden='true'
                  />
                ) : null}
                <button
                  onClick={() => setStep(step.href)}
                  disabled={step.href > lastStep || step?.status == "Skipped"}
                  className={classNames(
                    step.href > lastStep || step?.status == "Skipped"
                      ? "cursor-not-allowed"
                      : "cursor-pointer",
                    "relative flex items-start group"
                  )}
                >
                  <span className='h-9 flex items-center'>
                    <span className='relative z-10 w-8 h-8 flex items-center justify-center bg-primary-600 rounded-full group-hover:bg-primary-800'>
                      <CheckIcon
                        className='w-5 h-5 text-white'
                        aria-hidden='true'
                      />
                    </span>
                  </span>
                  <span className='ml-4 min-w-0 flex flex-col'>
                    <span className=' text-left font-semibold tracking-wide uppercase'>
                      {step.name}
                    </span>
                    <span className='text-sm text-left text-gray-500'>
                      {step.description}
                    </span>
                  </span>
                </button>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className='-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300'
                    aria-hidden='true'
                  />
                ) : null}
                <button
                  onClick={() => setStep(step.href)}
                  disabled={step.href > lastStep || step?.status == "Skipped"}
                  className={classNames(
                    step.href > lastStep || step?.status == "Skipped"
                      ? "cursor-not-allowed"
                      : "cursor-pointer",
                    "relative flex items-start group"
                  )}
                >
                  <span className='h-9 flex items-center' aria-hidden='true'>
                    <span className='relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400'>
                      <span
                        className={classNames(
                          step.href === lastStep
                            ? "bg-gray-300 group-hover:bg-gray-400"
                            : "group-hover:bg-gray-300",
                          "h-2.5 w-2.5 rounded-full"
                        )}
                      />
                    </span>
                  </span>
                  <span className='ml-4 min-w-0 flex flex-col'>
                    <span className=' text-left font-semibold tracking-wide uppercase text-gray-500'>
                      {step.name}
                    </span>
                    <span className='text-sm text-left text-gray-500'>
                      {step.description}
                    </span>
                  </span>
                </button>
              </>
            )}
            <div
              className={classNames(
                step.href === currentStep ? "bg-white" : "bg-transparent",
                "h-10 w-10 rotate-45 transform origin-bottom-right"
              )}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepWizardStatus;
