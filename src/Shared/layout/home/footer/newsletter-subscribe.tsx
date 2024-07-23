import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import TextInput from "Shared/components/input/text-input";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { classNames } from "Shared/utils/ui";
import { useFormik } from "formik";
import React from "react";
import { doSubscribeNewsletter } from "./duck/fetch";
import LoadingIcon from "Shared/components/icons/loading-icon";

type Props = {};

const NewsLetterSubscribe = (props: Props) => {
  const mutation = useMutation({
    mutationFn: doSubscribeNewsletter,
    onSuccess: (response) => {
      console.log(response);
      showToast({
        type: "success",
        title: "You have successfully subscribed to our newsletter",
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  const form = useFormik<any>({
    initialValues: {
      emailAddress: "",
    },
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    onReset: () => {
      form.resetForm();
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit}
      className='col-span-2 flex items-start flex-col'
    >
      <p className='flex items-center  text-white gap-1 text-lg font-medium  leading-[27px] mb-[15px]'>
        <Icon icon={"ic:baseline-mail-outline"} className='w-5 h-5' />
        Sign Up For a Newsletter
      </p>{" "}
      <p className=' text-stone-300 text-base font-normal  leading-relaxed mb-5'>
        Weekly breaking news, analysis and cutting edge advices on job
        searching.
      </p>
      <div className='flex items-stretch w-full gap-x-2.5'>
        <div className='flex-1'>
          <TextInput
            id='emailAddress'
            inputClassName='border-transparent bg-neutral-800 text-white '
            type='text'
            labelHidden
            label=''
            placeholder='Enter your email address'
            {...form}
          />
        </div>
        <button
          type='submit'
          className={classNames(
            " text-white my-auto bg-primary-500 flex items-center justify-center  cursor-pointer",
            "w-11 h-11  rounded  "
          )}
        >
          {mutation.isPending ? (
            <LoadingIcon className='animate-spin h-3 w-3  fill-white' />
          ) : (
            <Icon icon='formkit:arrowright' className='w-5 h-5' />
          )}
        </button>
      </div>
    </form>
  );
};

export default NewsLetterSubscribe;
