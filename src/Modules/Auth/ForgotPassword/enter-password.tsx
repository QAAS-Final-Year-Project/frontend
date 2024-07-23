import { FC, useEffect } from "react";
import { wrapClick } from "Shared/utils/ui";
import { useNavigate } from "react-router-dom";
import TextInput from "Shared/components/input/text-input";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "Shared/utils/alert";
import { doResetPassword } from "../duck/fetch";
import PrimaryButton from "Shared/components/buttons/primary-button";

import Header from "Shared/components/layout/header";
import Container from "Shared/components/layout/container";
import useUrlState from "Shared/hooks/use-url-state";
import {
  EnterNewPasswordSchema,
  IEnterNewPasswordSchema,
} from "../Register/forms/schema";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { setMe, setToken } from "Shared/utils/auth";

const EnterNewPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [accountType] = useUrlState<string>("accountType");
  const [emailQuery] = useUrlState<string>("email");

  const mutation = useMutation({
    mutationFn: doResetPassword,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Password Reset Successfully",
      });
      setMe(response.data?.user);
      setToken(response.data?.token);
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const form = useFormik<IEnterNewPasswordSchema>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: EnterNewPasswordSchema,
    onSubmit: async (values) => {
        console.log("sdfsd")
      mutation.mutate({
        ...values,
        emailAddress: emailQuery,
        accountType:
          accountType === "Developer" ? "DeveloperUser" : "TesterUser",
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
              Update your password
            </h3>
            <div className=' flex items-center justify-center gap-1 mb-[42px]  '>
              <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                Kindly enter a new password to use with your account
                <br />
                <span className='text-center text-blue-700 text-base font-medium  leading-[27px]  '>
                  {emailQuery}{" "}
                </span>
              </span>
            </div>
            <form onSubmit={form.handleSubmit} className=''>
              <div className='mb-4'>
                <TextInput
                  id='password'
                  label=''
                  labelHidden
                  type='password'
                  placeholder='New Password'
                  icon='ic:outline-lock'
                  required
                  {...form}
                />
              </div>
              <div className='mb-4'>
                <TextInput
                  id='confirmPassword'
                  label=''
                  labelHidden
                  type='password'
                  placeholder='Repeat Password'
                  icon='ic:outline-lock'
                  required
                  {...form}
                />
              </div>

              <PrimaryButton
                text='Reset Password'
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

export default EnterNewPasswordPage;
