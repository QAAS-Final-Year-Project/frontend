import { FormikProps, useFormik } from "formik";
import { FC, useEffect } from "react";
import { IVerifyUserFormSchema, AccountTypeSchema } from "./schema";
import moment from "moment";
import lodash from "lodash";
import { classNames, wrapClick } from "Shared/utils/ui";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { TesterUserAccountTypes } from "data";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";

interface AccountTypeProps {
  handleNext: (values: IVerifyUserFormSchema["accountType"]) => void;
  handlePrevious: () => void;
  initialValues: IVerifyUserFormSchema["accountType"];
  values: IVerifyUserFormSchema;
  handleCancel: () => void;
  parentForm: FormikProps<IVerifyUserFormSchema>;
  step: number;
  lastStep: number;
}

const AccountTypeForm: FC<AccountTypeProps> = ({
  initialValues,
  handleNext,
  handleCancel,
  parentForm,
  step,
  lastStep,
}) => {
  const AccountTypeIconMapping = {
    Starter: <UserIcon className='w-6 h-6 text-gray-500 my-2.5' />,
    Professional: <UsersIcon className='w-6 h-6 text-gray-500 my-2.5' />,
  };
  const form = useFormik<IVerifyUserFormSchema["accountType"]>({
    initialValues,
    validationSchema: AccountTypeSchema,
    onSubmit: (values) => {
      handleNext(values);
    },
    onReset: () => {
      handleCancel?.();
    },
  });

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      <div className='flex-1 flex flex-col overflow-hidden'>
        <div className='space-y-6 divide-y divide-gray-200 p-6 flex-1 overflow-y-auto'>
          <div>
            <span className='text-xs font-light'>...</span>
            <div className='grid grid-cols-3 gap-6 mt-2'>
              <div className='col-span-3'>
                <RadioGroup
                  value={form.values.accountType}
                  onChange={form.handleChange("accountType")}
                >
                  <RadioGroup.Label className='text-sm font-medium text-gray-700'>
                    Select Account
                  </RadioGroup.Label>
                  <div className='mt-1 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                    {TesterUserAccountTypes.map((testerUserAccountType) => (
                      <RadioGroup.Option
                        key={testerUserAccountType.value}
                        value={testerUserAccountType.value}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active
                              ? "border-primary-500 ring-2 ring-primary-500"
                              : "",
                            "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className='flex flex-1'>
                              <span className='flex flex-col'>
                                {
                                  AccountTypeIconMapping[
                                    testerUserAccountType.value
                                  ]
                                }
                                <RadioGroup.Label
                                  as='span'
                                  className='block text-sm font-medium text-gray-900'
                                >
                                  {testerUserAccountType.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-1 flex items-center text-sm text-gray-500'
                                >
                                  {testerUserAccountType.description}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            <CheckCircleIcon
                              className={classNames(
                                !checked ? "invisible" : "",
                                "h-5 w-5 text-primary-600"
                              )}
                              aria-hidden='true'
                            />
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-primary-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden='true'
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:py-4 sm:px-6 flex flex-row-reverse border-t border-gray-200'>
          <button
            type='button'
            onClick={wrapClick(form.handleSubmit)}
            disabled={!form.isValid}
            className={classNames(
              form.isValid ? "hover:bg-primary-700" : "cursor-not-allowed",
              "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ml-3 sm:text-sm disabled:bg-gray-400 sm:w-auto disabled:cursor-not-allowed"
            )}
          >
            Next
          </button>
          <button
            type='button'
            className='w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            onClick={wrapClick(form.resetForm)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeForm;
