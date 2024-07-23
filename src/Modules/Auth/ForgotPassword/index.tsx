import { FC, useEffect, useState } from "react";
import { classNames } from "Shared/utils/ui";
import useUrlState from "Shared/hooks/use-url-state";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "Shared/components/input/text-input";
import { useFormik } from "formik";
import * as yup from "yup";
import { Countries, Country } from "data/index.types";
import SelectInput from "Shared/components/input/select-input";
import lodash, { values } from "lodash";
import SearchSelectInput from "Shared/components/input/search-select-input";
import LoadingIcon from "Shared/components/icons/loading-icon";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "Shared/utils/alert";
import { isAxiosError } from "axios";
import { doLogin, doRegisterTesterUser, doSendResetCode } from "../duck/fetch";
import AuthLogo from "../components/auth-logo";
import {
  ILoginTesterUserSchema,
  IVerifyEnterEmailSchema,
  LoginTesterUserSchema,
  VerifyEnterEmailSchema,
} from "../schema";
import { setMe, setToken } from "Shared/utils/auth";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { RadioGroup } from "@headlessui/react";
import { AccountTypes } from "data";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Icon } from "@iconify/react";
import Header from "Shared/components/layout/header";
import Container from "Shared/components/layout/container";
import { formatAndShowAxiosError } from "Shared/utils/errors";

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: doSendResetCode,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "A verification code has been sent to your email address.",
      });
      navigate(
        `/verify-code?accountType=${form.values?.accountType}&email=${form.values.emailAddress}`
      );
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  const form = useFormik<IVerifyEnterEmailSchema>({
    initialValues: {
      emailAddress: "",
      accountType: "Tester",
    },
    validationSchema: VerifyEnterEmailSchema,
    onSubmit: async (values) => {
      mutation.mutate({
        ...values,
        accountType:
          values.accountType === "Tester" ? "TesterUser" : "DeveloperUser",
      });
    },
    onReset: () => {},
  });

  const AccountTypeIconMapping = {
    Tester: "ic:outline-account-circle",
    Developer: "ic:outline-business-center",
  };

  return (
    <section className='my-[70px]'>
      <Container>
        <Header
          title={`Login`}
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Login",
              to: "#",
            },
          ]}
        />
        <div className='mt-16 w-[480px] mx-auto'>
          <div className='  '>
            <h3 className=' text-center text-zinc-800 text-[26px] font-bold leading-[27px]'>
              Forgot your password?
            </h3>
            <div className=' flex items-center justify-center gap-1 mb-[42px]  '>
              <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                Enter your email address to receive an email with a verification
                code.
              </span>
            </div>
            <form onSubmit={form.handleSubmit} className=''>
              <RadioGroup
                value={form.values.accountType}
                onChange={form.handleChange("accountType")}
              >
                {/* <RadioGroup.Label className='text-sm font-medium text-gray-700'>
                    Select Account
                  </RadioGroup.Label> */}
                <div className='mt-1 mb-7 grid grid-cols-2 gap-x-5'>
                  {AccountTypes.map((accountType) => (
                    <RadioGroup.Option
                      key={accountType.value}
                      value={accountType.value}
                      className={({ checked, active }) =>
                        classNames(
                          checked
                            ? "bg-green-500 text-white"
                            : "bg-zinc-100 hover:bg-green-100 text-zinc-500 hover:text-green-500",
                          active ? " ring-2 " : "",
                          "relative flex cursor-pointer rounded gap-x-1 items-center justify-center   py-2.5  focus:outline-none  "
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <Icon
                            icon={AccountTypeIconMapping[accountType.value]}
                            className={classNames("w-[18px] h-[18px] ")}
                          />
                          <RadioGroup.Label
                            as='span'
                            className={classNames(
                              " text-center text-base font-normal  leading-7"
                            )}
                          >
                            {accountType.title}
                          </RadioGroup.Label>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <div className='mb-4'>
                <TextInput
                  id='emailAddress'
                  label=''
                  type='text'
                  required
                  labelHidden
                  placeholder='Email Address'
                  {...form}
                  icon='ic:outline-email'
                />
              </div>
              <div className=' flex  items-center gap-2.5 mb-2.5 '>
                <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                  Remember your password?
                </span>
                <Link
                  to='/login'
                  className=' text-blue-700 text-base font-medium  leading-[27px] block'
                >
                  Login
                </Link>
              </div>

              <PrimaryButton
                text='Send Reset Code'
                size='md'
                className='w-full'
                loading={mutation.isPending}
                type='submit'
              />
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ForgotPasswordPage;
