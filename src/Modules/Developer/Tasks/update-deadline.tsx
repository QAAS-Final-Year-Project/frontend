import { useMutation } from "@tanstack/react-query";
import YesNoDialog from "Shared/components/overlays/yes-no-dialog";
import useUrlState from "Shared/hooks/use-url-state";
import { showToast } from "Shared/utils/alert";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import TextArea from "Shared/components/input/text-area";
import { useEffect } from "react";
import Modal from "Shared/components/overlays/modal";
import PrimaryButton from "Shared/components/buttons/primary-button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import RangeInput from "Shared/components/input/range-input";
import { ITaskDeadlineSchema, TaskDeadlineSchema } from "./schema";
import { doUpdateDeadline } from "./duck/fetch";
import TextInput from "Shared/components/input/text-input";
import moment from "moment";
import AppConfig from "config";

export default function UpdateTaskDeadlineContainer({
  open,
  setOpen,
  values,
  refetch,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => void;
  values: any;
}) {
  const { id } = useParams();
  const mutation = useMutation({
    mutationFn: doUpdateDeadline,
    onSuccess: () => {
      showToast({
        type: "success",
        title: "Deadline updated successfully",
      });
      setOpen(false);
      refetch?.();
    },
    onError: (error) => formatAndShowAxiosError(error),
  });

  const form = useFormik<ITaskDeadlineSchema>({
    initialValues: {
      ...values,
    },
    validationSchema: TaskDeadlineSchema,
    onSubmit: async (values) => {
      console.log(values);
      mutation.mutate({
        values: {
          ...values,
          deadlineDate: values.deadlineDate,
        },
        id: id,
      });
    },
    onReset: () => {
      form.resetForm();
      setOpen(false);
    },
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={"Update Deadline"}
      // onYesClicked={form.handleSubmit}
      // yesLoading={mutation.isPending}
      // onNoTapped={() => setOpen(false)}
    >
      <form onSubmit={form.handleSubmit}>
        <div className='flex flex-col'>
          <p className='mb-[5px]'>
            <span className='text-zinc-500 text-base font-normal  leading-[27px]'>
              Provide new task{" :"}
            </span>
            <span className='text-zinc-800 text-base font-bold  leading-[27px]'>
              deadline
            </span>
          </p>

          <div className='w-full mb-8 text-start'>
            <TextInput
              id='deadlineDate'
              label=''
              type='date'
              min={moment().format(AppConfig.date.inputDateFormat)}
              placeholder='Deadline Date'
              required={false}
              {...form}
            />
          </div>
          <PrimaryButton
            text='Update'
            className='w-full'
            loading={mutation.isPending}
            type='submit'
          />
        </div>
      </form>
    </Modal>
  );
}
