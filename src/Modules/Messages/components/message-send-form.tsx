import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { doSendMessage } from "../duck/firestore";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { useFormik } from "formik";
import { ISendMessageSchema, SendMessageSchema } from "../schema";
import PrimaryButton from "Shared/components/buttons/primary-button";
import TextInput from "Shared/components/input/text-input";
import { classNames } from "Shared/utils/ui";
import _ from "lodash";

type Props = {
  userId: any;
  roomId: any;
  
};

const SendMessageForm = (props: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/send-message.ogg");
    audioRef.current.load();
  }, []);
  const mutation = useMutation({
    mutationFn: doSendMessage,
    onSuccess: (response) => {
      if (audioRef.current) {
        audioRef.current.play();
      }
      form.setFieldValue("message", "");
    },
    onError: (error) => formatAndShowAxiosError(error),
  });
  const form = useFormik<ISendMessageSchema>({
    initialValues: {
      message: "",
    },
    // validationSchema: SendMessageSchema,
    onSubmit: async (values) => {
      mutation.mutate({
        message: values.message,
        userId: props.userId,
        roomId: props.roomId,
      });
    },
    onReset: () => {
      form.resetForm();
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit}
      className='px-[30px] sticky bottom-0 bg-white z-[999] gap-x-5 p-[30px] border-t w-full border-neutral-200 flex items-center justify-between  '
    >
      <div className='flex-1'>
        <TextInput
          id='message'
          label=''
          placeholder='Type your message'
          inputClassName='!bg-none !border-none !w-full !outline-none !focus:outline-none !leading-relaxed !placeholder:text-zinc-500 !placeholder:text-[15px] !placeholder:font-normal'
          labelHidden
          disabled={mutation.isPending}
          required={true}
          {...form}
        />
      </div>
      <div className={classNames(!_.isEmpty(form.errors) ? "mb-6" : "")}>
        <PrimaryButton
          type='submit'
          text='Send'
          disabled={mutation.isPending}
          size='md'
          loading={mutation.isPending}
        />
      </div>
    </form>
  );
};

export default SendMessageForm;
