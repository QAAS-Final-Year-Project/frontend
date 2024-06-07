import { FC, useState } from "react";
import { classNames, wrapClick } from "Shared/utils/ui";
import { RadioGroup } from "@headlessui/react";

import useUrlState from "Shared/hooks/use-url-state";
import { useNavigate } from "react-router-dom";
import AuthLogo from "../components/auth-logo";

const Questions = [
  {
    name: "Developer",
    href: "Developer",
    description: "Clients posting QA project requirements",
  },
  {
    name: "QA Tester",
    href: "Tester",
    description: "Skilled testers applying for QA projects",
  },
];
const AccountType: FC = () => {
  const [accountType, setAccountType] = useUrlState<string>(
    "accountType",
    Questions[0].href
  );
  const navigate = useNavigate();
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html className="h-full bg-gray-50">
          <body className="h-full">
          ```
        */}
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-center w-full'>
          <AuthLogo title={"Create a new account"} />
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full  sm:max-w-[480px]'>
          <div className='bg-white  shadow sm:rounded-lg'>
            <div className='px-6 py-12  sm:px-12'>
              <form className='space-y-6' action='#' method='POST'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  I'm signing up as a
                </h2>
                <RadioGroup value={accountType} onChange={setAccountType}>
                  <RadioGroup.Label className='sr-only'>
                    Questions
                  </RadioGroup.Label>
                  <div className='-space-y-px rounded-md bg-white'>
                    {Questions.map((question, settingIdx) => (
                      <RadioGroup.Option
                        key={question.name}
                        value={question.href}
                        className={({ checked }) =>
                          classNames(
                            settingIdx === 0
                              ? "rounded-tl-md rounded-tr-md"
                              : "",
                            settingIdx === Questions.length - 1
                              ? "rounded-bl-md rounded-br-md"
                              : "",
                            checked
                              ? "z-10 border-primary-200 bg-primary-100"
                              : "border-gray-200",
                            "relative flex cursor-pointer border p-4 focus:outline-none"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <span
                              className={classNames(
                                checked
                                  ? "bg-primary-600 border-transparent"
                                  : "bg-white border-gray-300",
                                active
                                  ? "ring-2 ring-offset-2 ring-primary-600"
                                  : "",
                                "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                              )}
                              aria-hidden='true'
                            >
                              <span className='rounded-full bg-white w-1.5 h-1.5' />
                            </span>
                            <span className='ml-3 flex flex-col'>
                              <RadioGroup.Label
                                as='span'
                                className={classNames(
                                  checked
                                    ? "text-primary-900"
                                    : "text-gray-900",
                                  "block text-sm font-medium"
                                )}
                              >
                                {question.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as='span'
                                className={classNames(
                                  checked
                                    ? "text-primary-700"
                                    : "text-gray-500",
                                  "block text-sm"
                                )}
                              >
                                {question.description}
                              </RadioGroup.Description>
                            </span>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div>
                  <button
                    type='submit'
                    onClick={wrapClick(() =>
                      navigate(`/register?accountType=${accountType}`)
                    )}
                    className='flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountType;
