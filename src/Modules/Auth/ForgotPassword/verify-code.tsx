import { FC, useEffect } from "react";
import { wrapClick } from "Shared/utils/ui";
import { useNavigate } from "react-router-dom";
import TextInput from "Shared/components/input/text-input";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "Shared/utils/alert";
import { isAxiosError } from "axios";
import { doSendResetCode, doVerifyResetCode } from "../duck/fetch";
import { IVerifyEnterEmailSchema, VerifyEnterEmailSchema } from "../schema";
import PrimaryButton from "Shared/components/buttons/primary-button";

import Header from "Shared/components/layout/header";
import Container from "Shared/components/layout/container";
import useUrlState from "Shared/hooks/use-url-state";
import { IVerifyEmail, VerifyEmailSchema } from "../Register/forms/schema";
import { formatAndShowAxiosError } from "Shared/utils/errors";

const VerifyCodePage: FC = () => {
  const navigate = useNavigate();
  const [accountType] = useUrlState<string>("accountType");
  const [emailQuery] = useUrlState<string>("email");

  const resendCodeMutation = useMutation({
    mutationFn: doSendResetCode,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "A verification code has been sent to your email address.",
      });
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  const verifyCodeMutation = useMutation({
    mutationFn: doVerifyResetCode,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Verification code verified successfully.",
      });
      navigate(
        `/reset-password?accountType=${accountType}&email=${emailQuery}`
      );
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const form = useFormik<IVerifyEmail>({
    initialValues: {
      code: "",
    },
    validationSchema: VerifyEmailSchema,
    onSubmit: async (values) => {
      verifyCodeMutation.mutate({
        ...values,
        accountType:
          accountType == "Developer" ? "DeveloperUser" : "TesterUser",
        emailAddress: emailQuery,
      });
    },
    onReset: () => {},
  });

  useEffect(() => {
    if (!accountType && !emailQuery) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [accountType, emailQuery]);
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
                Enter the 6 digit code sent to your email address
                <br />
                <span className='text-center text-blue-700 text-base font-medium  leading-[27px]  '>
                  {emailQuery}{" "}
                </span>
              </span>
            </div>
            <form onSubmit={form.handleSubmit} className=''>
              <div>
                <TextInput
                  id='code'
                  icon='ic:outline-lock'
                  placeholder='Verification Code'
                  type='text'
                  required
                  label=''
                  labelHidden
                  {...form}
                />
              </div>
              <div className=' flex  items-center gap-2.5 mb-2.5 '>
                <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                  Didn't receive the code?
                </span>
                <button
                  type={"button"}
                  onClick={wrapClick(() => {
                    resendCodeMutation.mutate({
                      emailAddress: emailQuery,
                      accountType:
                        accountType === "Tester"
                          ? "TesterUser"
                          : "DeveloperUser",
                    });
                  })}
                  className=' text-blue-700 text-base font-medium  leading-[27px] block'
                >
                  Resend
                </button>
              </div>

              <PrimaryButton
                text='Verify Reset Code'
                size='md'
                className='w-full'
                loading={verifyCodeMutation.isPending}
                type='submit'
              />
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VerifyCodePage;
