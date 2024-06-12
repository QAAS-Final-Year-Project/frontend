import { FC, useEffect, useState } from "react";
import { classNames } from "Shared/utils/ui";
import useUrlState from "Shared/hooks/use-url-state";
import { Link, useNavigate } from "react-router-dom";
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
import Container from "Shared/components/layout/container";
import PrimaryButton from "Shared/components/buttons/primary-button";
import Header from "Shared/components/layout/header";

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
          <div className='  '>
            <h3 className=' text-center text-zinc-800 text-[26px] font-bold leading-[27px] mb-1'>
              Verify Email
            </h3>
            <div className=' flex items-center justify-center gap-1 mb-[42px] '>
              <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                An OTP has been sent to your email address
              </span>
              <span className='text-center text-blue-700 text-base font-medium  leading-[27px]  '>
                {emailQuery}{" "}
              </span>
            </div>
            <form onSubmit={form.handleSubmit} className='space-y-6'>
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
              <div>
                <PrimaryButton
                  text='Login'
                  size='md'
                  className='w-full'
                  loading={mutation.isPending}
                  type='submit'
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VerifyEmailPage;
