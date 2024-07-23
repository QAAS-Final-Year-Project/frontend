import { FC, useState } from "react";
import { classNames } from "Shared/utils/ui";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "Shared/components/input/text-input";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "Shared/utils/alert";
import { isAxiosError } from "axios";
import { doLogin } from "../duck/fetch";
import { ILoginTesterUserSchema, LoginTesterUserSchema } from "../schema";
import { setMe, setToken } from "Shared/utils/auth";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { RadioGroup } from "@headlessui/react";
import { AccountTypes } from "data";
import { Icon } from "@iconify/react";
import Header from "Shared/components/layout/header";
import Container from "Shared/components/layout/container";
import IconButton from "Shared/components/buttons/icon-button";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: doLogin,
    onSuccess: (response) => {
      if (response.data?.user?.isEmailVerified) {
        navigate(
          "/verify-email?accountType=Developer&email=" +
            form.values.emailAddress
        );
      } else {
        showToast({
          type: "success",
          title: "Login Successful",
        });
        setMe(response.data?.user);
        setToken(response.data?.token);
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      }
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
          title: error?.message || "Error logging in",
        });
      }
    },
  });
  const form = useFormik<ILoginTesterUserSchema>({
    initialValues: {
      emailAddress: "",
      password: "",
      accountType: "Tester",
    },
    validationSchema: LoginTesterUserSchema,
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    onReset: () => {
      // setOpen(false);
    },
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
            <h3 className=' text-center text-zinc-800 text-[26px] font-bold leading-[27px] mb-1'>
              We're glad to see you again!
            </h3>
            <div className=' flex items-center justify-center gap-1 mb-[42px] '>
              <span className='text-center text-zinc-500 text-base font-normal  leading-[27px]'>
                Already have an account?
              </span>
              <Link
                to='/register'
                className='text-center text-blue-700 text-base font-medium  leading-[27px]  '
              >
                Sign Up!{" "}
              </Link>
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
              <div className='mb-4'>
                <TextInput
                  id='password'
                  label=''
                  labelHidden
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder='Password'
                  icon='ic:outline-lock'
                  required
                  postText={
                    <IconButton
                      iconClassName='!text-neutral-400'
                      size='sm'
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      icon={
                        isPasswordVisible
                          ? "ic:outline-visibility"
                          : "ic:outline-visibility-off"
                      }
                    />
                  }
                  {...form}
                />
              </div>
              <Link
                to='/forgot-password'
                className=' text-blue-700 text-base font-medium  leading-[27px] block mb-2.5'
              >
                Forgot Password?
              </Link>

              <PrimaryButton
                text='Login'
                size='md'
                className='w-full'
                loading={mutation.isPending}
                type='submit'
              />
            </form>
            <div>
              <div className='relative mt-8'>
                <div
                  className='absolute inset-0 flex items-center'
                  aria-hidden='true'
                >
                  <div className='w-full border-t border-gray-200' />
                </div>
                <div className='relative flex justify-center text-sm font-medium leading-6'>
                  <span className='bg-white px-2.5 text-center text-zinc-500 text-base'>
                    or
                  </span>
                </div>
              </div>

              <div className='mt-4 grid grid-cols-2 gap-4'>
                <a
                  href='#'
                  className='flex w-full items-center justify-center gap-3 rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
                >
                  <svg
                    className='h-5 w-5'
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z'
                      fill='#EA4335'
                    />
                    <path
                      d='M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z'
                      fill='#4285F4'
                    />
                    <path
                      d='M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z'
                      fill='#FBBC05'
                    />
                    <path
                      d='M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z'
                      fill='#34A853'
                    />
                  </svg>
                  <span className='text-sm font-semibold '>
                    Log In via Google
                  </span>
                </a>

                <a
                  href='#'
                  className='flex w-full items-center justify-center gap-3 rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
                >
                  <svg
                    className='h-5 w-5 fill-[#24292F]'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-sm font-semibold leading-6'>
                    Log In GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
