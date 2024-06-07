import { FC, useEffect, useState } from "react";
import { classNames } from "Shared/utils/ui";
import useUrlState from "Shared/hooks/use-url-state";
import { useNavigate } from "react-router-dom";
import TextInput from "Shared/components/input/text-input";
import { useFormik } from "formik";
import * as yup from "yup";
import { Countries, Country } from "data/index.types";
import SelectInput from "Shared/components/input/select-input";
import lodash from "lodash";
import SearchSelectInput from "Shared/components/input/search-select-input";
import LoadingIcon from "Shared/components/icons/loading-icon";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "Shared/utils/alert";
import { isAxiosError } from "axios";
import { doRegisterTesterUser, doVerifyEmail } from "../../duck/fetch";
import { IVerifyEmail, VerifyEmailSchema } from "./schema";
import AuthLogo from "../../components/auth-logo";
import { setMe, setToken } from "Shared/utils/auth";

const VerifyEmailPage: FC = () => {
  const navigate = useNavigate();

  const [accountType] = useUrlState<string>("accountType");
  const [emailQuery, setEmailQuery] = useUrlState<string>("email");

  const mutation = useMutation({
    mutationFn: doVerifyEmail,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Email Verified Successfully",
      });
      setMe(response.data?.user);
      setToken(response.data?.token);
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    },
    onError: (error) => {
      if (
        isAxiosError(error) &&
        error?.response?.data &&
        error.response?.data?.message
      ) {
        showToast({
          type: "error",
          title: error.response?.data?.message,
        });
        if (error.response?.data?.errors) {
          form.setErrors(error.response?.data?.errors);
        }
      } else {
        showToast({
          type: "error",
          title: error?.message,
        });
      }
    },
  });
  const form = useFormik<IVerifyEmail>({
    initialValues: {
      code: "",
    },
    validationSchema: VerifyEmailSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      mutation.mutate({
        ...values,
        type: accountType == "Developer" ? "DeveloperUser" : "TesterUser",
        emailAddress: emailQuery,
      });
    },
    onReset: () => {
      // setOpen(false);
    },
  });

  useEffect(() => {
    if (!accountType && !emailQuery) {
      navigate("/account-type", {
        replace: true,
      });
    }
  }, [accountType, emailQuery]);

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <AuthLogo title={"Verify Email Address"} />
        <div className='mt-10 sm:mx-auto sm:w-full  sm:max-w-[480px]'>
          <div className='bg-white  shadow sm:rounded-lg'>
            <div className='px-6 py-12  sm:px-12'>
              <form onSubmit={form.handleSubmit} className='space-y-6'>
                <p className='mt-2 text-sm leading-6 text-gray-500'>
                  An OTP has been sent to your email{" "}
                  <span className='font-semibold text-primary-600 '>
                    {emailQuery}
                  </span>
                </p>
                <div>
                  <TextInput
                    id='code'
                    label='Verification Code'
                    type='text'
                    required
                    placeholder='Enter the verification code sent to your email'
                    {...form}
                  />
                </div>
                <div>
                  <button
                    type='submit'
                    disabled={!form.isValid}
                    className='flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {mutation.isPending ? (
                      <LoadingIcon
                        className={`animate-spin h-5 w-5 mx-2 fill-white ${
                          mutation.isPending ? "block" : "hidden"
                        }`}
                      />
                    ) : (
                      "Verify"
                    )}{" "}
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

export default VerifyEmailPage;
