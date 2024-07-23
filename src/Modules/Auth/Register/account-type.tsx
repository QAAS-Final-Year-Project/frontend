import { FC, useState } from "react";
import { classNames, wrapClick } from "Shared/utils/ui";
import { RadioGroup } from "@headlessui/react";

import useUrlState from "Shared/hooks/use-url-state";
import { Link, useNavigate } from "react-router-dom";
import AuthLogo from "../components/auth-logo";
import Container from "Shared/components/layout/container";
import Header from "Shared/components/layout/header";
import PrimaryButton from "Shared/components/buttons/primary-button";

const Questions = [
  {
    name: "Developer",
    href: "Developer",
    description: "Clients posting QA project requirements",
  },
  {
    name: "QA Tester",
    href: "Tester",
    description: "Testers applying for QA projects",
  },
];
const AccountType: FC = () => {
  const [accountType, setAccountType] = useUrlState<string>(
    "accountType",
    Questions[0].href
  );
  const navigate = useNavigate();
  return (
    <section className='my-[70px]'>
      <Container>
        <Header
          title={`Register`}
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Register",
              to: "#",
            },
          ]}
        />
        <div className='mt-16 w-[480px] mx-auto'>
          <h3 className=' text-center text-zinc-800 text-[26px] font-bold leading-[27px] mb-1'>
            I am signing up as a
          </h3>
          <div className=' flex items-center justify-center gap-1 mb-[42px] '>
            <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
              Already have an account?{" "}
            </span>
            <Link
              to='/login'
              className='text-center text-blue-700 text-base font-medium  leading-[27px]  '
            >
              Log In!{" "}
            </Link>
          </div>
          <form className='space-y-6' action='#' method='POST'>
            <RadioGroup value={accountType} onChange={setAccountType}>
              <RadioGroup.Label className='sr-only'>Questions</RadioGroup.Label>
              <div className='-space-y-px rounded bg-white'>
                {Questions.map((question, settingIdx) => (
                  <RadioGroup.Option
                    key={question.name}
                    value={question.href}
                    className={({ checked }) =>
                      classNames(
                        settingIdx === 0 ? "rounded-tl rounded-tr" : "",
                        settingIdx === Questions.length - 1
                          ? "rounded-bl rounded-br"
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
                        <div className="flex items-center gap-x-5">
                          <span className='ml-3 flex flex-col'>
                            <RadioGroup.Label
                              as='span'
                              className={classNames(
                                checked ? "text-primary-900" : "text-gray-900",
                                "block  font-medium"
                              )}
                            >
                              {question.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as='span'
                              className={classNames(
                                checked ? "text-primary-700" : "text-gray-500",
                                "block text-sm"
                              )}
                            >
                              {question.description}
                            </RadioGroup.Description>
                          </span>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <PrimaryButton
              onClick={wrapClick(() =>
                navigate(`/register?accountType=${accountType}`)
              )}
              text='Sign Up'
              size='md'
              className='w-full'
              // loading={mutation.isPending}
              type='submit'
            />
          </form>
        </div>
      </Container>
    </section>
  );
};

export default AccountType;
