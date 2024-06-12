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
import { doRegisterTesterUser } from "../../duck/fetch";
import AuthLogo from "../../components/auth-logo";
import { ICreateTesterUser, TesterUserSchema } from "./schema";
import PrimaryButton from "Shared/components/buttons/primary-button";
import Header from "Shared/components/layout/header";
import Container from "Shared/components/layout/container";

const TesterForm: FC = () => {
  const navigate = useNavigate();
  const [accountType] = useUrlState<string>("accountType");

  const mutation = useMutation({
    mutationFn: doRegisterTesterUser,
    onSuccess: (data) => {
      console.log(data);
      showToast({
        type: "success",
        title: "Account created successfully",
      });
      navigate(
        "/verify-email?accountType=Tester&email=" + form.values.emailAddress
      );
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
  const form = useFormik<ICreateTesterUser>({
    initialValues: {
      emailAddress: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      country: "",
      termsAndConditions: false,
    },
    validationSchema: TesterUserSchema,
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    onReset: () => {
      // setOpen(false);
    },
  });

  useEffect(() => {
    console.log(accountType);
    if (!accountType) {
      navigate("/account-type", {
        replace: true,
      });
    }
  }, [accountType]);

  return (
    <>
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
                Let's create your tester account!
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
              <form onSubmit={form.handleSubmit} className=''>
                <div className='mb-4'>
                  <TextInput
                    id='fullName'
                    placeholder='Full Name'
                    label=''
                    type='text'
                    labelHidden
                    required
                    {...form}
                    icon='ic:baseline-person-outline'
                  />
                </div>

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
                  <SearchSelectInput
                    id='country'
                    label={``}
                    icon='ic:baseline-public'
                    placeholder='Select Country'
                    options={[
                      ...lodash.map(Countries).map((nationality) => ({
                        label: {
                          title: nationality,
                        },
                        value: nationality,
                      })),
                    ]}
                    required={true}
                    {...form}
                  />
                </div>
                <div className='mb-4'>
                  <TextInput
                    id='password'
                    label=''
                    labelHidden
                    type='password'
                    placeholder='Password'
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
                  text='Login'
                  size='md'
                  className='w-full'
                  // loading={mutation.isPending}
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
                      Register via Google
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
                      Register Via GitHub
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default TesterForm;
