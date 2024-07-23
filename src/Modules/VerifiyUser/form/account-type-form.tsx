import { FormikProps, useFormik } from "formik";
import { FC } from "react";
import { IVerifyUserFormSchema, AccountTypeSchema } from "./schema";
import { classNames, wrapClick } from "Shared/utils/ui";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { TesterUserAccountTypes } from "data";
import { Icon } from "@iconify/react";
import OutlinedButton from "Shared/components/buttons/outline-button";
import PrimaryButton from "Shared/components/buttons/primary-button";

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
    Starter: "uil:user-circle",
    Professional: "uil:graduation-cap",
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
            <div className='grid grid-cols-3 gap-6 mt-2'>
              <div className='col-span-3'>
                <RadioGroup
                  value={form.values.accountType}
                  onChange={form.handleChange("accountType")}
                >
                  <RadioGroup.Label className=' text-zinc-800 text-base font-semibold leading-[27px] mb-[22px] block'>
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
                            "relative flex cursor-pointer rounded border bg-white p-4 shadow-sm focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className='flex flex-1'>
                              <span className='flex flex-col'>
                                {
                                  <Icon
                                    icon={
                                      AccountTypeIconMapping[
                                        testerUserAccountType.title
                                      ]
                                    }
                                    stroke={"0.5"}
                                    strokeWidth={0.5}
                                    className='w-8 h-8 text-zinc-500 my-2.5 stroke-none'
                                  />
                                }
                                <RadioGroup.Label
                                  as='span'
                                  className='block font-medium text-zinc-900'
                                >
                                  {testerUserAccountType.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-1 flex items-center text-sm text-zinc-500'
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
                                "pointer-events-none absolute -inset-px rounded"
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

        <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:py-4 sm:px-6 gap-x-4 flex flex-row-reverse border-t border-gray-200'>
          <PrimaryButton
            type='button'
            size='sm'
            onClick={wrapClick(form.handleSubmit)}
            disabled={!form.isValid}
            text='Next'
          />

          <OutlinedButton
            type='button'
            size='sm'
            text='Cancel'
            onClick={wrapClick(form.resetForm)}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountTypeForm;
